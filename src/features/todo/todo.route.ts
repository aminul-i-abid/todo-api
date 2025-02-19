import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import { TodoController } from "./todo.controller";

const todoRouter = Router();

todoRouter.use(authMiddleware);

/**
 * @description Create a new todo
 * @url {{BASE_URL}}/api/v1/todos
 */
todoRouter.post("/", TodoController.createTodo);

/**
 * @description Get all todos for the authenticated user
 * @url {{BASE_URL}}/api/v1/todos
 */
todoRouter.get("/", TodoController.getAllTodos);

/**
 * @description Get a specific todo by ID
 * @url {{BASE_URL}}/api/v1/todos/:id
 */
todoRouter.get("/:id", TodoController.getTodoById);

/**
 * @description Update a todo
 * @url {{BASE_URL}}/api/v1/todos/:id
 */
todoRouter.patch("/:id", TodoController.updateTodo);

/**
 * @description Delete a todo
 * @url {{BASE_URL}}/api/v1/todos/:id
 */
todoRouter.delete("/:id", TodoController.deleteTodo);

/**
 * @description Toggle todo completion status
 * @url {{BASE_URL}}/api/v1/todos/:id/toggle
 */
todoRouter.patch("/:id/toggle", TodoController.toggleTodoStatus);

export default todoRouter;
