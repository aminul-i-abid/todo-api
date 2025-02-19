import { z } from "zod";

export const UserRegisterSchema = z.object({
  fullname: z.string().min(3).max(50),
  username: z.string().min(3).max(30),
  email: z.string().email(),
  password: z.string().min(8).max(50),
});

export type UserRegisterDTO = z.infer<typeof UserRegisterSchema>;

export interface UserResponseDTO {
  id: number;
  fullname: string;
  username: string;
  email: string;
  created_at: Date;
  updated_at: Date;
}

export interface UserLoginDTO {
  email: string;
  password: string;
}
