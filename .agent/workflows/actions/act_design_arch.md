---
description: "Define Technical Architecture and Data Schema"
---

# Action: Technical Architecture (SDD)
# Role: Lead Architect

## Goal
Translate the Product Requirements (`01_current_requirements.md`) into a **Technical Blueprint** using **Schema Driven Design (SDD)**.

## Steps
1.  **Analyze Requirements & Design Data**:
    - Read `01_current_requirements.md`. Identify entities (Nouns) and actions (Verbs).
    - Read `02_figma_design_data.md` OR `02_visual_design.md`. Check "Data Requirements" section.
    - Identify all data objects needed to render the UI.
2.  **Schema Definition (The Contract)**:
    - Define Zod Schemas in `packages/shared-schema`.
    - **CRITICAL**: Export the TypeScript type using `z.infer`.
3.  **Interface Design (The Ports)**:
    - Define the Backend Service Interfaces (`IUserService`).
    - Define the API Endpoints (URL, Method, DTO).
4.  **Implementation Plan (Task Breakdown)**:
    - Create a checklist for the Developer agents.

## Output Format (`.agent/specs/03_architecture.md`)

```markdown
# Architecture: [Feature Name]

## 1. Directory Map (File Structure)
*Where files should be created:*
- Schema: `packages/shared-schema/src/user/...`
- Backend: `apps/backend/src/user/...`
- Frontend: `apps/web/src/features/user/...`

## 2. The Contract (Shared Schema)
*Copy this to `packages/shared-schema/src/index.ts`*
\`\`\`typescript
import { z } from 'zod';

// 1. Zod Schema
export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  role: z.enum(['ADMIN', 'USER']),
});

// 2. Export Type (CRITICAL for Devs)
export type User = z.infer<typeof UserSchema>;

// 3. DTOs
export const CreateUserDto = UserSchema.pick({ email: true });
export type CreateUserDto = z.infer<typeof CreateUserDto>;
\`\`\`

## Key Deliverables
1. **Database Schema**: ERD or Prisma Schema
2. **API Specification**: REST Endpoints (Zod)
3. **Ports & Adapters**: `domain/ports` (Interfaces) and `infrastructure/adapters` (Implementation plan)

## 3. API Specification
- **Endpoint**: `POST /api/users`
- **Request**: `CreateUserDto`
- **Response**: `User`

## 4. Atomic Task List (For TDD)
*Developer, follow this order:*
1.  [ ] **Schema**: Save the shared schema code above.
2.  [ ] **Backend (Red)**: Create `user.service.spec.ts` mocking `IUserRepository`.
3.  [ ] **Backend (Green)**: Implement `UserService` and `Controller`.
4.  [ ] **Frontend**: Create `useUser` hook using the API.
```

## Input
- **Research Summary**: `.agent/specs/00_research_summary.md`
- **Requirements**: `.agent/specs/01_requirements.md`
- **Design Data**: `.agent/specs/02_figma_design_data.md` OR `.agent/specs/02_visual_design.md`

## Completion Trigger
- You are DONE when `.agent/specs/03_architecture.md` is saved.
```