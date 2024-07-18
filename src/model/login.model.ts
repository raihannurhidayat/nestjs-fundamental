import { z } from 'zod';

export class LoginUserRequest {
  username: string;
  password: string;
}

export const LoginUserRequestValidation = z.object({
  username: z.string().max(50).min(3),
  password: z.string().max(50).min(3),
});