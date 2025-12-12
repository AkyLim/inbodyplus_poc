---
description: "Analyze requests and define atomic tasks"
---

# Action: Define Task & Requirements
# Role: Product Manager

## Goal
Analyze the user's vague request and convert it into a **Structured Requirement Document** that triggers the Architect and Developer.

## Steps

### Step 0: Context Check (CRITICAL)
Before defining requirements, understand what already exists.

1. **Check Project Context**:
   - Read `.agent/docs/00_project_context.md`
   - Identify relevant existing: tables, schemas, APIs

2. **Check Database Schema**:
   ```bash
   # View existing Prisma schema
   cat prisma/schema.prisma
   ```
   - Note which tables can be reused

3. **Check Shared Schemas**:
   ```bash
   # View existing Zod schemas
   ls packages/shared-schema/src/
   ```
   - Note which types already exist

### Step 1: Interview
Ask clarifying questions if the request is ambiguous.
- *Check*: "What is the primary business value?"
- *Check*: "Are there any specific edge cases (e.g., offline, error states)?"

### Step 2: Constraint Check
Identify non-functional requirements.
- "Is this a new feature or a modification?"
- "Does it involve sensitive data?"
- **"Which existing tables/schemas can we reuse?" (from Step 0)**

### Step 3: Drafting
Write the `.agent/specs/01_requirements.md`.

### Step 4: Confirmation
Ask the user to approve the draft before stopping.

## Output Format (`active_specs/01_current_requirements.md`)

```markdown
# Requirement: [Feature Name]

## 1. User Story
> As a **[User Role]**, I want to **[Action]** so that **[Benefit]**.

## 2. Business Goal & Value
- Why are we doing this? (e.g., Reduce login time by 50%)
- Priority: [High/Medium/Low]

## 3. Detailed Scenarios (Acceptance Criteria)
*This is the source of truth for TDD.*

### Scenario A: Happy Path
- **Given**: User is on the login page.
- **When**: User enters valid credentials and clicks 'Login'.
- **Then**: Redirect to Dashboard and show "Welcome" toast.

### Scenario B: Edge Case (Error)
- **Given**: User enters invalid password.
- **When**: User clicks 'Login'.
- **Then**: Show error message "Invalid credentials" in red.

## 4. UI/UX Requirements (For Frontend)
- **Components**: [Input Field], [Primary Button], [Toast Message]
- **States**: Loading spinner must appear during API call.

## 5. Technical Constraints (For Architect)
- Platform: [Mobile / Web]
- Performance: Must respond within 200ms.

## 6. Existing Resources (From Context Check)
*What can be reused from the current codebase:*

### Reusable Tables
- `User` table (id, email, name, role) ✅
- `Order` table (id, userId, items, total) ✅

### Reusable Schemas
- `UserSchema` from `@repo/shared-schema` ✅
- `OrderSchema` from `@repo/shared-schema` ✅

### Reusable APIs
- `GET /api/users/:id` ✅
- `POST /api/orders` ✅

### New Resources Needed
- [ ] New table: [TableName]
- [ ] New schema: [SchemaName]
- [ ] New API: [Endpoint]
```

## Input
- **User Conversation**: The raw chat history.
- **Project Context**: `.agent/specs/00_research_summary.md`

## Completion Trigger
- You are DONE only when the user says "Approve" or when the file `.agent/specs/01_requirements.md` is successfully saved.