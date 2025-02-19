import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import db from "../../database/connection";
import { UserRegisterDTO, UserResponseDTO } from "./dto/user.dto";

export const UserService = {
  register: async (userData: UserRegisterDTO): Promise<UserResponseDTO> => {
    // Check if user already exists
    const existingUser = await db("users")
      .where("email", userData.email)
      .orWhere("username", userData.username)
      .first();

    if (existingUser) {
      if (existingUser.email === userData.email) {
        throw new Error("Email already registered");
      }
      throw new Error("Username already taken");
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
};
