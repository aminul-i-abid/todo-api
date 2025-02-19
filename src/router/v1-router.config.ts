import express from "express";
import userRouter from "../features/user/user.route";

const v1Router = express.Router();

// routes
v1Router.use("/users", userRouter);

export default v1Router;
