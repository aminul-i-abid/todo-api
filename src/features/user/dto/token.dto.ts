import { z } from "zod";

export const RefreshTokenSchema = z.object({
  refreshToken: z.string(),
});

export type RefreshTokenDTO = z.infer<typeof RefreshTokenSchema>;

export interface TokenResponseDTO {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
}