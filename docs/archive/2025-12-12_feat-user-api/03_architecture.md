# Architecture: User Profile API

## 1. Directory Map (File Structure)
*Where files should be created:*
- Schema: `.worktrees/feat/user-api/my-100x-project/packages/shared-schema/src/user.ts` (Update)
- Backend: `.worktrees/feat/user-api/my-100x-project/apps/backend/src/users/...`

## 2. The Contract (Shared Schema)
*Copy this to `packages/shared-schema/src/user.ts`*
```typescript
import { z } from 'zod';

// 1. Zod Schema
export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().optional(),
  role: z.enum(['ADMIN', 'USER']).default('USER'),
  createdAt: z.date().optional(),
});

// 2. Export Type
export type User = z.infer<typeof UserSchema>;

// 3. DTOs
export const CreateUserDto = UserSchema.pick({ email: true, name: true, role: true });
export type CreateUserDto = z.infer<typeof CreateUserDto>;
```

## 3. Database Schema (Prisma)
*Update `apps/backend/prisma/schema.prisma`*
```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String?
  role      String   @default("USER") // Simplified for now, or match enum
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## 4. API Specification
- **Endpoint**: `GET /users/:uid`
- **Response**: `User` (JSON)
- **Error**: 404 if not found.

## 5. Atomic Task List (For TDD)
*Developer, follow this order:*
1.  [ ] **Schema (Prisma)**: Update `schema.prisma` and run `prisma generate`.
2.  [ ] **Schema (Zod)**: Update `packages/shared-schema/src/user.ts`.
3.  [ ] **Backend (Red)**: Create `users.service.spec.ts` testing `findOne`.
4.  [ ] **Backend (Green)**: Implement `UsersService` and `UsersController`.
5.  [ ] **Verification**: Manual Curl or HTTP test.
