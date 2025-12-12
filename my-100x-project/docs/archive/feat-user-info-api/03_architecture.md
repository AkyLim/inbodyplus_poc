# Architecture Design: User Info API

## 1. Overview
Implement `GET /users/:id` to retrieve user profile data.
Follows Hexagonal Architecture.

## 2. API Contract
### Endpoint
`GET /users/:id`

### Request Config
- **Path Param**: `id` (string/BigInt)

### Response Schema (Zod Definition)
We will define `UserResponseSchema` in `packages/shared-schema`.

```typescript
import { z } from 'zod';

export const UserResponseSchema = z.object({
  id: z.string(), // serialized BigInt
  loginId: z.string(),
  email: z.string(),
  phoneNumber: z.string().nullable().optional(),
  countryCode: z.string(),
  profileType: z.string(),
  gender: z.string(),
  birthDay: z.string(), // ISO Date string
  height: z.number(),
  name: z.string(),
  profileImgUrl: z.string().nullable().optional(),
  createAccountDate: z.string(),
  recentMeasureDate: z.string().nullable().optional(),
  recentLoginDate: z.string().nullable().optional(),
});

export type UserResponse = z.infer<typeof UserResponseSchema>;
```

## 3. Domain Model Update
Update `User` class in `apps/backend/src/users/domain/user.model.ts`:
```typescript
export class User {
    id: string;
    loginId: string; // New
    email: string;
    phoneNumber?: string | null; // New
    countryCode: string; // New
    profileType: string; // New
    gender: string; // New
    birthDay: Date; // New
    height: number; // New
    name?: string | null;
    profileImgUrl?: string | null; // New
    createAccountDate: Date; // New
    recentMeasureDate?: Date | null; // New
    recentLoginDate?: Date | null; // New
    role: string;
    createdAt: Date;
    updatedAt: Date;
    password?: string;
}
```

## 4. Components
- **Controller**: `UsersController` -> calls Service.
- **Service**: `UsersService` -> calls Repository.
- **Repository**: `PrismaUserRepository` -> finds `Profile_UserInfo`, maps to `User` domain model.
