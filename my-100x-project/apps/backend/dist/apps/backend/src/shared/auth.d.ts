import { z } from 'zod';
export declare const LoginDto: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email?: string;
    password?: string;
}, {
    email?: string;
    password?: string;
}>;
export type LoginDto = z.infer<typeof LoginDto>;
export declare const AuthResponseDto: z.ZodObject<{
    accessToken: z.ZodString;
    user: z.ZodObject<{
        id: z.ZodString;
        email: z.ZodString;
        nickname: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id?: string;
        email?: string;
        nickname?: string;
    }, {
        id?: string;
        email?: string;
        nickname?: string;
    }>;
}, "strip", z.ZodTypeAny, {
    accessToken?: string;
    user?: {
        id?: string;
        email?: string;
        nickname?: string;
    };
}, {
    accessToken?: string;
    user?: {
        id?: string;
        email?: string;
        nickname?: string;
    };
}>;
export type AuthResponseDto = z.infer<typeof AuthResponseDto>;
