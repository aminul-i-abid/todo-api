import { v4 as uuidv4 } from "uuid";
import db from "../../database/connection";
import { AppError } from "../../middleware/error.middleware";
import { CreateTodoDTO, TodoResponseDTO, UpdateTodoDTO } from "./dto/todo.dto";

export const TodoService = {
  createTodo: async (
    userId: string,
    todoData: CreateTodoDTO
  ): Promise<TodoResponseDTO> => {
    const id = uuidv4();
    const now = new Date();

    const todo = {
      id,
      ...todoData,
      user_id: userId,
      completed: false,
      created_at: now,
      updated_at: now,
    };

    await db("todos").insert(todo);

    return todo as TodoResponseDTO;
  },

  getTodoById: async (
    userId: string,
    todoId: string
  ): Promise<TodoResponseDTO> => {
    const todo = await db("todos")
      .where({ id: todoId, user_id: userId })
      .first();

    if (!todo) {
      throw new AppError("Todo not found", 404);
    }

    return todo as TodoResponseDTO;
  },

  getAllTodos: async (userId: string): Promise<TodoResponseDTO[]> => {
    const todos = await db("todos").where("user_id", userId);
    return todos as TodoResponseDTO[];
  },

  updateTodo: async (
    userId: string,
    todoId: string,
    updateData: UpdateTodoDTO
  ): Promise<TodoResponseDTO> => {
    const todo = await db("todos")
      .where({ id: todoId, user_id: userId })
      .first();

    if (!todo) {
      throw new AppError("Todo not found", 404);
    }

    const updatedTodo = {
      ...updateData,
      updated_at: new Date(),
    };

    await db("todos").where({ id: todoId }).update(updatedTodo);

    return { ...todo, ...updatedTodo } as TodoResponseDTO;
  },

  deleteTodo: async (userId: string, todoId: string): Promise<void> => {
    const todo = await db("todos")
      .where({ id: todoId, user_id: userId })
      .first();

    if (!todo) {
      throw new AppError("Todo not found", 404);
    }

    await db("todos").where({ id: todoId }).delete();
  },

  toggleTodoStatus: async (
    userId: string,
    todoId: string
  ): Promise<TodoResponseDTO> => {
    const todo = await db("todos")
      .where({ id: todoId, user_id: userId })
      .first();

    if (!todo) {
      throw new AppError("Todo not found", 404);
    }

    const updatedTodo = {
      completed: !todo.completed,
      updated_at: new Date(),
    };

    await db("todos").where({ id: todoId }).update(updatedTodo);

    return { ...todo, ...updatedTodo } as TodoResponseDTO;
  },
};
