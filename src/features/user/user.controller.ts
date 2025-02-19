import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { UserRegisterSchema } from "./dto/user.dto";
import { UserService } from "./user.service";

export const UserController = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData = UserRegisterSchema.parse(req.body);
      const user = await UserService.register(userData);

      res.status(201).json({
        code: 201,
        message: "Account created successfully",
        data: {
          userId: user.id,
          createdAt: user.created_at,
        },
      });
      return;
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          code: 400,
          error: "Bad Request",
          data: {
            field: error.issues[0].path[0],
            message: error.issues[0].message,
          },
        });
        return;
      }

      return next(error);
    }
  },
};
