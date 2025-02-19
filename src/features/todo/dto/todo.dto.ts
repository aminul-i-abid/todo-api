import { z } from "zod";

export const CreateTodoSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string(),
  completed: z.boolean().optional(),
});

export type CreateTodoDTO = z.infer<typeof CreateTodoSchema>;

export const UpdateTodoSchema = CreateTodoSchema.partial();

export type UpdateTodoDTO = z.infer<typeof UpdateTodoSchema>;

export interface TodoResponseDTO {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  created_at: Date;
  updated_at: Date;
  user_id: string;
}
