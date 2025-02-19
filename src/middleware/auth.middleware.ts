import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ErrorCode, StatusCode } from "../constants/code.constant";
import { createErrorResponse } from "../utils/response.util";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        username: string;
        email: string;
      };
    }
  }
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res
        .status(StatusCode.UNAUTHORIZED)
        .json(
          createErrorResponse(
            StatusCode.UNAUTHORIZED,
            "No token provided",
            ErrorCode.UNAUTHORIZED
          )
        );
      return;
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      res
        .status(StatusCode.UNAUTHORIZED)
        .json(
          createErrorResponse(
            StatusCode.UNAUTHORIZED,
            "Invalid token format",
            ErrorCode.UNAUTHORIZED
          )
        );
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
      username: string;
      email: string;
    };

    req.user = decoded;

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res
        .status(StatusCode.UNAUTHORIZED)
        .json(
          createErrorResponse(
            StatusCode.UNAUTHORIZED,
            "Invalid or expired token",
            ErrorCode.UNAUTHORIZED
          )
        );
      return;
    }

    next(error);
  }
};
