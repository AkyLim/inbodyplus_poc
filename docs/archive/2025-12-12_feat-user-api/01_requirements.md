# Requirement: User Profile API

## 1. User Story
> As a **System/User**, I want to **retrieve a user's profile by UID** so that **I can display or verify their identity**.

## 2. Business Goal & Value
- **Goal**: Enable profile retrieval for the frontend/mobile app.
- **Priority**: High (Core Feature).

## 3. Detailed Scenarios (Acceptance Criteria)

### Scenario A: Successful Retrieval
- **Given**: A valid UID exists in the database.
- **When**: `GET /users/:uid` is called.
- **Then**: Return 200 OK with JSON `{ id, email, name, role }`.

### Scenario B: User Not Found
- **Given**: A UID that does not exist.
- **When**: `GET /users/:uid` is called.
- **Then**: Return 404 Not Found.

### Scenario C: Invalid UID Format
- **Given**: An invalid UID format (if UUID/CUID enforced).
- **When**: `GET /users/:invalid` is called.
- **Then**: Return 400 Bad Request.

## 4. Technical Constraints (For Architect)
- **ORM**: Must use **Prisma**.
- **Schema**: Must define `User` model in `schema.prisma`.
- **Shared Schema**: Must define Zod schema in `packages/shared-schema`.
- **API**: NestJS (backend).

## 5. Existing Resources
- **Prisma**: Configured but empty schema.
- **Shared Schema**: `UserSchema` exists (minimal).

## 6. Resources Needed
- [ ] New Table: `User` (id, email, name)
- [ ] New API: `GET /users/:uid`
