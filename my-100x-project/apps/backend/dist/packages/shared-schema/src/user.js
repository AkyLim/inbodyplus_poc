"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResponseSchema = exports.CreateUserDto = exports.UserSchema = exports.GenderSchema = void 0;
const zod_1 = require("zod");
exports.GenderSchema = zod_1.z.enum(['MALE', 'FEMALE']);
exports.UserSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8),
    nickname: zod_1.z.string().min(1),
    phoneNumber: zod_1.z.string().regex(/^\d{10,11}$/),
    birthdate: zod_1.z.string().regex(/^\d{8}$/),
    gender: exports.GenderSchema,
    height: zod_1.z.number().positive(),
    marketingConsent: zod_1.z.boolean().default(false),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
});
exports.CreateUserDto = exports.UserSchema.pick({
    email: true,
    password: true,
    nickname: true,
    phoneNumber: true,
    birthdate: true,
    gender: true,
    height: true,
    marketingConsent: true,
});
exports.UserResponseSchema = zod_1.z.object({
    id: zod_1.z.string(),
    loginId: zod_1.z.string(),
    email: zod_1.z.string(),
    phoneNumber: zod_1.z.string().nullable().optional(),
    countryCode: zod_1.z.string(),
    profileType: zod_1.z.string(),
    gender: zod_1.z.string(),
    birthDay: zod_1.z.string(),
    height: zod_1.z.number(),
    name: zod_1.z.string().nullable().optional(),
    profileImgUrl: zod_1.z.string().nullable().optional(),
    createAccountDate: zod_1.z.string(),
    recentMeasureDate: zod_1.z.string().nullable().optional(),
    recentLoginDate: zod_1.z.string().nullable().optional(),
});
//# sourceMappingURL=user.js.map