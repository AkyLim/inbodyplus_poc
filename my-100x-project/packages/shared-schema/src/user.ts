
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

export const UserResponseSchema = z.object({
    id: z.string(), // serialized BigInt
    loginId: z.string(),
    email: z.string(),
    phoneNumber: z.string().nullable().optional(),
    countryCode: z.string(),
    profileType: z.string(),
    gender: z.string(),
    birthDay: z.string(), // ISO Date string or similar
    height: z.number(),
    name: z.string().nullable().optional(),
    profileImgUrl: z.string().nullable().optional(),
    createAccountDate: z.string(),
    recentMeasureDate: z.string().nullable().optional(),
    recentLoginDate: z.string().nullable().optional(),
});

export type UserResponse = z.infer<typeof UserResponseSchema>;
