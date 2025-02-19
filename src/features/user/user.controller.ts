import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { ErrorCode, StatusCode } from "../../constants/code.constant";
import { AppError } from "../../middleware/error.middleware";
import {
  createErrorResponse,
  createSuccessResponse,
} from "../../utils/response.util";
import { UserLoginSchema } from "./dto/auth.dto";
import { RefreshTokenSchema } from "./dto/token.dto";
import { UserRegisterSchema } from "./dto/user.dto";
import { UserService } from "./user.service";

export const UserController = {
  refreshToken: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = RefreshTokenSchema.parse(req.body);
      const tokens = await UserService.refreshToken(refreshToken);

      res
        .status(StatusCode.OK)
        .json(
          createSuccessResponse(
            StatusCode.OK,
            "Token refreshed successfully",
            tokens
          )
        );
      return;
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(StatusCode.BAD_REQUEST).json(
          createErrorResponse(
            StatusCode.BAD_REQUEST,
            "Validation failed",
            ErrorCode.BAD_REQUEST,
            {
              field: error.issues[0].path[0],
              message: error.issues[0].message,
            }
          )
        );
        return;
      }
      if (
        error instanceof AppError &&
        error.statusCode === StatusCode.UNAUTHORIZED
      ) {
        res
          .status(StatusCode.UNAUTHORIZED)
          .json(
            createErrorResponse(
              StatusCode.UNAUTHORIZED,
              "Invalid refresh token",
              ErrorCode.UNAUTHORIZED
            )
          );
        return;
      }
      return next(error);
    }
  },

  logout: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = RefreshTokenSchema.parse(req.body);
      await UserService.logout(refreshToken);

      res
        .status(StatusCode.OK)
        .json(
          createSuccessResponse(StatusCode.OK, "Logged out successfully", null)
        );
      return;
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(StatusCode.BAD_REQUEST).json(
          createErrorResponse(
            StatusCode.BAD_REQUEST,
            "Validation failed",
            ErrorCode.BAD_REQUEST,
            {
              field: error.issues[0].path[0],
              message: error.issues[0].message,
            }
          )
        );
        return;
      }
      return next(error);
    }
  },

  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const credentials = UserLoginSchema.parse(req.body);
      const authData = await UserService.login(credentials);

      res
        .status(StatusCode.OK)
        .json(
          createSuccessResponse(StatusCode.OK, "Login successful", authData)
        );
      return;
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(StatusCode.BAD_REQUEST).json(
          createErrorResponse(
            StatusCode.BAD_REQUEST,
            "Validation failed",
            ErrorCode.BAD_REQUEST,
            {
              field: error.issues[0].path[0],
              message: error.issues[0].message,
            }
          )
        );
        return;
      }
      if (
        error instanceof AppError &&
        error.statusCode === StatusCode.UNAUTHORIZED
      ) {
        res.status(StatusCode.UNAUTHORIZED).json(
          createErrorResponse(
            StatusCode.UNAUTHORIZED,
            "Invalid credentials",
            ErrorCode.UNAUTHORIZED,
            {
              field: "credentials",
              message: "Invalid email or password",
            }
          )
        );
        return;
      }
      return next(error);
    }
  },
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData = UserRegisterSchema.parse(req.body);
      const user = await UserService.register(userData);

      res.status(StatusCode.CREATED).json(
        createSuccessResponse(
          StatusCode.CREATED,
          "Account created successfully",
          {
            userId: user.id,
            createdAt: user.created_at,
          }
        )
      );
      return;
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(StatusCode.BAD_REQUEST).json(
          createErrorResponse(
            StatusCode.BAD_REQUEST,
            "Validation failed",
            ErrorCode.BAD_REQUEST,
            {
              field: error.issues[0].path[0],
              message: error.issues[0].message,
            }
          )
        );
        return;
      }

      if (
        error instanceof AppError &&
        error.statusCode === StatusCode.CONFLICT
      ) {
        res.status(StatusCode.CONFLICT).json(
          createErrorResponse(
            StatusCode.CONFLICT,
            "Account already exist",
            ErrorCode.CONFLICT,
            {
              field: error.message.split(" ")[0],
              message: error.message,
            }
          )
        );
        return;
      }

      return next(error);
    }
  },
};
