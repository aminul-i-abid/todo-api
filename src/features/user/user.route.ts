import { Router } from "express";
import { UserController } from "./user.controller";

const userRouter = Router();

/**
 * @description Register a new user
 * @url {{BASE_URL}}/api/v1/users/register
 */
userRouter.post("/register", UserController.register);

export default userRouter;
