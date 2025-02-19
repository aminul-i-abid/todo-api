import express from "express";
import userRouter from "../features/user/user.route";
import todoRouter from "../features/todo/todo.route";

const v1Router = express.Router();

// routes
v1Router.use("/users", userRouter);
v1Router.use("/todos", todoRouter);

export default v1Router;
