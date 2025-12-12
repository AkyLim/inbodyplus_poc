# Architecture Blueprint: Advanced Ping-Pong Agent

## 1. Context Analysis
- **Goal**: Implement "Advanced Ping-Pong" with random server stats.
- **Constraints**: 
  - Use `packages/shared-schema`.
  - Backend: NestJS (Port 8899).
  - Frontend: Next.js (Port 3005).

## 2. Shared Schema Design
**File**: `packages/shared-schema/src/ping-pong.ts`
- **PingRequest**: `{ timestamp: number, message: string }`
- **PongResponse**: `{ timestamp: number, receivedMessage: string, stats: ServerStats, serverTime: string }`
- **ServerStats**: `{ cpuLoad: number, memoryUsage: number, activeConnections: number }`

## 3. Backend Design (NestJS)
- **Controller**: `PingPongController` at `/ping`
- **Service**: `PingPongService`
  - Logic: Generate random numbers for stats.
  - Validation: Use Zod `safeParse`.

## 4. Frontend Design (Next.js)
- **UI**: 
  - Button "Send Ping".
  - Card/Region to display `PongResponse`.
- **State Management**:
  - `loading`: boolean
  - `response`: PongResponse | null
  - `error`: string | null
- **Integration**:
  - `fetch` to `http://localhost:8899/ping`.

## 5. Test Strategy
- **Manual Verification**: Since this is a pilot, we rely on running the servers and clicking the button (Walkthrough).
