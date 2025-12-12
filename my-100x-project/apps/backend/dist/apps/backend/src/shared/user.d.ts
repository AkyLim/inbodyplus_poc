import { z } from 'zod';
export declare const GenderSchema: any;
export declare const UserSchema: any;
export type User = z.infer<typeof UserSchema>;
export declare const CreateUserDto: any;
export type CreateUserDto = z.infer<typeof CreateUserDto>;
