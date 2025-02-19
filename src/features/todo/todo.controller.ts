import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { ErrorCode, StatusCode } from "../../constants/code.constant";
import { AppError } from "../../middleware/error.middleware";
import { createErrorResponse, createSuccessResponse } from "../../utils/response.util";
import { CreateTodoSchema, UpdateTodoSchema } from "./dto/todo.dto";
import { TodoService } from "./todo.service";

export const TodoController = {
  createTodo: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const todoData = CreateTodoSchema.parse(req.body);
      const todo = await TodoService.createTodo(req.user!.id, todoData);

      res
        .status(StatusCode.CREATED)
        .json(createSuccessResponse(StatusCode.CREATED, "Todo created successfully", todo));
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(StatusCode.BAD_REQUEST).json(
          createErrorResponse(StatusCode.BAD_REQUEST, "Validation failed", ErrorCode.BAD_REQUEST, {
            field: error.issues[0].path[0],
            message: error.issues[0].message,
          })
        );
        return;
      }
      next(error);
    }
  },

  getTodoById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const todo = await TodoService.getTodoById(req.user!.id, req.params.id);
      res
        .status(StatusCode.OK)
        .json(createSuccessResponse(StatusCode.OK, "Todo retrieved successfully", todo));
    } catch (error) {
      if (error instanceof AppError && error.statusCode === StatusCode.NOT_FOUND) {
        res
          .status(StatusCode.NOT_FOUND)
          .json(createErrorResponse(StatusCode.NOT_FOUND, "Todo not found", ErrorCode.NOT_FOUND));
        return;
      }
      next(error);
    }
  },

  getAllTodos: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const todos = await TodoService.getAllTodos(req.user!.id);
      res
        .status(StatusCode.OK)
        .json(createSuccessResponse(StatusCode.OK, "Todos retrieved successfully", todos));
    } catch (error) {
      next(error);
    }
  },

  updateTodo: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updateData = UpdateTodoSchema.parse(req.body);
      const todo = await TodoService.updateTodo(req.user!.id, req.params.id, updateData);

      res
        .status(StatusCode.OK)
        .json(createSuccessResponse(StatusCode.OK, "Todo updated successfully", todo));
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(StatusCode.BAD_REQUEST).json(
          createErrorResponse(StatusCode.BAD_REQUEST, "Validation failed", ErrorCode.BAD_REQUEST, {
            field: error.issues[0].path[0],
            message: error.issues[0].message,
          })
        );
        return;
      }
      if (error instanceof AppError && error.statusCode === StatusCode.NOT_FOUND) {
        res
          .status(StatusCode.NOT_FOUND)
          .json(createErrorResponse(StatusCode.NOT_FOUND, "Todo not found", ErrorCode.NOT_FOUND));
        return;
      }
      next(error);
    }
  },

  deleteTodo: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await TodoService.deleteTodo(req.user!.id, req.params.id);
      res
        .status(StatusCode.OK)
        .json(createSuccessResponse(StatusCode.OK, "Todo deleted successfully", null));
    } catch (error) {
      if (error instanceof AppError && error.statusCode === StatusCode.NOT_FOUND) {
        res
          .status(StatusCode.NOT_FOUND)
          .json(createErrorResponse(StatusCode.NOT_FOUND, "Todo not found", ErrorCode.NOT_FOUND));
        return;
      }
      next(error);
    }
  },

  toggleTodoStatus: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const todo = await TodoService.toggleTodoStatus(req.user!.id, req.params.id);
      res
        .status(StatusCode.OK)
        .json(createSuccessResponse(StatusCode.OK, "Todo status updated successfully", todo));
    } catch (error) {
      if (error instanceof AppError && error.statusCode === StatusCode.NOT_FOUND) {
        res
          .status(StatusCode.NOT_FOUND)
          .json(createErrorResponse(StatusCode.NOT_FOUND, "Todo not found", ErrorCode.NOT_FOUND));
        return;
      }
      next(error);
    }
  },
};