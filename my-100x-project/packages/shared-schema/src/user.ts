import { z } from 'zod';

export const UserSchema = z.object({
    id: z.string().uuid(),
    email: z.string().email(),
    name: z.string().optional(),
    role: z.enum(['ADMIN', 'USER']).default('USER'),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

export type User = z.infer<typeof UserSchema>;

export const CreateUserDto = UserSchema.pick({ email: true, name: true, role: true });
export type CreateUserDto = z.infer<typeof CreateUserDto>;
