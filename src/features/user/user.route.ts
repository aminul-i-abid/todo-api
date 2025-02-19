import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import { UserController } from "./user.controller";

const userRouter = Router();

/**
 * @description Register a new user
 * @url {{BASE_URL}}/api/v1/users/register
 */
userRouter.post("/register", UserController.register);

/**
 * @description Login user
 * @url {{BASE_URL}}/api/v1/users/login
 */
userRouter.post("/login", UserController.login);

/**
 * @description Logout user
 * @url {{BASE_URL}}/api/v1/users/logout
 */
userRouter.post("/logout", UserController.logout);

/**
 * @description Refresh token
 * @url {{BASE_URL}}/api/v1/users/refresh
 */
userRouter.post("/refresh-token", authMiddleware, UserController.refreshToken); // logged in user can refresh token

export default userRouter;
