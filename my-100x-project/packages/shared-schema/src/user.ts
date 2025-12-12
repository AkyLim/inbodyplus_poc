
import { z } from 'zod';

export const GenderSchema = z.enum(['MALE', 'FEMALE']);

export const UserSchema = z.object({
    id: z.string().uuid(),
    email: z.string().email(),
    password: z.string().min(8), // Hashed in DB, but validated here
    nickname: z.string().min(1),
    phoneNumber: z.string().regex(/^\d{10,11}$/),
    birthdate: z.string().regex(/^\d{8}$/), // YYYYMMDD
    gender: GenderSchema,
    height: z.number().positive(),
    marketingConsent: z.boolean().default(false),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export type User = z.infer<typeof UserSchema>;

export const CreateUserDto = UserSchema.pick({
    email: true,
    password: true,
    nickname: true,
    phoneNumber: true,
    birthdate: true,
    gender: true,
    height: true,
    marketingConsent: true,
});
export type CreateUserDto = z.infer<typeof CreateUserDto>;
