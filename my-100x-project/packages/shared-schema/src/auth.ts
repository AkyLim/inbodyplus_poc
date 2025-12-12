
import { z } from 'zod';

export const LoginDto = z.object({
    email: z.string().email(),
    password: z.string(),
});
export type LoginDto = z.infer<typeof LoginDto>;

export const AuthResponseDto = z.object({
    accessToken: z.string(),
    user: z.object({
        id: z.string(),
        email: z.string(),
        nickname: z.string(),
    }),
});
export type AuthResponseDto = z.infer<typeof AuthResponseDto>;
