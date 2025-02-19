import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import db from "../../database/connection";
import { AppError } from "../../middleware/error.middleware";
import { AuthResponseDTO } from "./dto/auth.dto";
import { TokenResponseDTO } from "./dto/token.dto";
import { UserLoginDTO, UserRegisterDTO, UserResponseDTO } from "./dto/user.dto";

const generateTokens = async (user: any) => {
  const accessToken = jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
    },
    process.env.JWT_SECRET as string,
    { expiresIn: "1d" }
  );

  const refreshToken = jwt.sign(
    { id: user.id },
    process.env.JWT_REFRESH_SECRET as string,
    { expiresIn: "7d" }
  );

  // Store refresh token
  const tokenId = uuidv4();
  await db("refresh_tokens").insert({
    id: tokenId,
    user_id: user.id,
    token: refreshToken,
    expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
  });

  return { accessToken, refreshToken };
};

export const UserService = {
  login: async (credentials: UserLoginDTO): Promise<AuthResponseDTO> => {
    // Find user by email
    const user = await db("users").where("email", credentials.email).first();

    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(
      credentials.password,
      user.password
    );

    if (!isValidPassword) {
      throw new AppError("Invalid email or password", 401);
    }

    const { accessToken, refreshToken } = await generateTokens(user);

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    };
  },
  register: async (userData: UserRegisterDTO): Promise<UserResponseDTO> => {
    // Check if user already exists
    const existingUser = await db("users")
      .where("email", userData.email)
      .orWhere("username", userData.username)
      .first();

    if (existingUser) {
      if (existingUser.email === userData.email) {
        throw new AppError("Email already registered", 409);
      }
      throw new AppError("Username already registered", 409);
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    // Create user
    const id = uuidv4();
    const [userId] = await db("users").insert({
      ...userData,
      id,
      password: hashedPassword,
    });

    // Fetch created user
    const user = await db("users").where("id", userId).first();

    return user as UserResponseDTO;
  },

  refreshToken: async (refreshToken: string): Promise<TokenResponseDTO> => {
    try {
      // Verify refresh token
      const decoded = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET as string
      ) as { id: string };

      // Check if token exists and is not revoked
      const tokenRecord = await db("refresh_tokens")
        .where({
          token: refreshToken,
          is_revoked: false,
        })
        .first();

      if (!tokenRecord) {
        throw new AppError("Invalid refresh token", 401);
      }

      // Check if token is expired
      if (new Date(tokenRecord.expires_at) < new Date()) {
        await db("refresh_tokens")
          .where({ id: tokenRecord.id })
          .update({ is_revoked: true });
        throw new AppError("Refresh token expired", 401);
      }

      // Get user
      const user = await db("users").where({ id: decoded.id }).first();
      if (!user) {
        throw new AppError("User not found", 404);
      }

      // Revoke old refresh token
      await db("refresh_tokens")
        .where({ id: tokenRecord.id })
        .update({ is_revoked: true });

      // Generate new tokens
      const tokens = await generateTokens(user);

      return {
        ...tokens,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      };
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        throw new AppError("Invalid refresh token", 401);
      }
      throw error;
    }
  },

  logout: async (refreshToken: string): Promise<void> => {
    const tokenRecord = await db("refresh_tokens")
      .where({ token: refreshToken })
      .first();

    if (tokenRecord) {
      await db("refresh_tokens")
        .where({ id: tokenRecord.id })
        .update({ is_revoked: true });
    }
  },
};
