# Requirement Specification: Advanced Ping-Pong Agent

## 1. User Story & Analysis
> As a User, I want to verify the Agentic Monorepo architecture by implementing an "Advanced Ping-Pong" feature, so that I can validate the end-to-end flow from Frontend to Backend using a Shared Schema without a database.

- **Complexity**: Low (but structurally complete)
- **Stack**: 
  - **Frontend**: Next.js
  - **Backend**: NestJS
  - **Schema**: Zod (packages/shared-schema)
  - **Database**: None (In-memory/Random Generation)

## 2. Technical Constraints
- **Location**: New worktree `.worktrees/ping-pong-agent`
- **Strict Schema Enforcement**: All DTOs must be defined in `packages/shared-schema` first.
- **No Database**: Backend should simulate data persistence or generation.

## 3. Schema Blueprint (The Contract)

**File**: `packages/shared-schema/src/ping-pong.ts`

```typescript
import { z } from 'zod';

export const PingRequestSchema = z.object({
  timestamp: z.number(),
  message: z.string().min(1, "Message cannot be empty"),
});

export const ServerStatsSchema = z.object({
  cpuLoad: z.number().min(0).max(100),
  memoryUsage: z.number().min(0).max(100),
  activeConnections: z.number().int().min(0),
});

export const PongResponseSchema = z.object({
  timestamp: z.number(),
  receivedMessage: z.string(),
  stats: ServerStatsSchema,
  serverTime: z.string().datetime(),
});

export type PingRequest = z.infer<typeof PingRequestSchema>;
export type PongResponse = z.infer<typeof PongResponseSchema>;
```

## 4. Atomic Task List

- [ ] **Task-01: Environment Setup**
  - **Action**: Create clean worktree `.worktrees/ping-pong-agent` based on `main` (or clean state).
  - **Validation**: Directory exists and dependencies installed.

- [ ] **Task-02: Schema Implementation**
  - **Action**: Create `packages/shared-schema/src/ping-pong.ts`.
  - **Action**: Export in `packages/shared-schema/src/index.ts`.
  - **Validation**: `pnpm build` in shared-schema succeeds.

- [ ] **Task-03: Backend Implementation (NestJS)**
  - **Action**: Create `PingController` in `apps/backend`.
  - **Action**: Implement `POST /ping` endpoint using `PingRequest` and `PongResponse`.
  - **Logic**: Return random values for `cpuLoad`, `memoryUsage`, etc.
  - **Validation**: Curl request returns correct JSON structure.

- [ ] **Task-04: Frontend Implementation (Next.js)**
  - **Action**: Create a simple UI with a "Send Advanced Ping" button.
  - **Action**: Display the returned "Server Stats" in a nice card UI.
  - **Validation**: User can click and see data.

## 5. Next Steps
- Approve this spec.
- Invoke **Workflow: Environment Manager** to execute Task-01.
