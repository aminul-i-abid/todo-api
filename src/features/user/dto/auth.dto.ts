import { z } from "zod";

export const UserLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(50),
});

export type UserLoginDTO = z.infer<typeof UserLoginSchema>;

export interface AuthResponseDTO {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
}
