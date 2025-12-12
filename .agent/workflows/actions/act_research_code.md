---
description: "Research existing codebase before defining requirements"
---

# Action: Research Codebase (Context Refresh)
# Caller: Product Manager (PM)

## Goal
Conduct a **Deep Dive** into the current codebase to understand what can be reused.
This ensures that new requirements **leverage existing resources** instead of reinventing the wheel.

## Core Philosophy
- **Read Before Write**: Do not assume; verify via terminal commands.
- **Token Efficiency**: Do not dump huge files. Use `grep`, `ls`, or `head` to find specific info.
- **Formal Output**: Create `.agent/specs/00_research_summary.md` for the team.

---

## Steps

### Step 1: Project Anatomy (Structure)
**Get the big picture of the project.**

```bash
# Check directory tree (Depth 2 to save tokens)
tree -L 2 -I "node_modules|dist|.git|.worktrees"
# OR
ls -R apps/ packages/ | grep ":$" | head -20
```

**What to Note:**
- Project purpose and goals
- Main apps (backend, web, mobile?)
- Shared packages

---

### Step 2: Database & Schema (The Truth)
**Identify entities without reading the whole file.**

```bash
# Find models in Prisma
grep "model " prisma/schema.prisma 2>/dev/null

# Check Shared Schema exports
grep "export const .*Schema" packages/shared-schema/src/index.ts 2>/dev/null
```

**What to Note:**
- Existing tables/entities
- Relationships between entities
- Reusable Zod schemas

---

### Step 3: API & Routes (Backend Capabilities)
**List available endpoints.**

```bash
# For NestJS
grep -r "@Controller" apps/backend/src/ 2>/dev/null
grep -r "@Get\|@Post\|@Patch\|@Delete" apps/backend/src/ | head -20

# For Express
grep -r "router\." apps/backend/src/ 2>/dev/null | head -20
```

**What to Note:**
- Existing endpoints
- Authentication patterns
- Reusable controllers/services

---

### Step 4: UI Library (Frontend Capabilities)
**Check for reusable components.**

```bash
# List UI components
ls apps/web/src/components/ui/ 2>/dev/null
ls apps/web/src/components/ 2>/dev/null

# List features
ls apps/web/src/features/ 2>/dev/null
```

**What to Note:**
- Existing component patterns (Atomic Design?)
- UI library in use (shadcn, radix, etc.)
- Reusable components

---

### Step 5: History Check
**See what happened recently.**

```bash
# Recent commits
git log --oneline -10

# Active branches
git branch -a | head -10
```

**What to Note:**
- Recent features added
- Ongoing work in branches

---

## Output Format

**CRITICAL**: Save research findings to `.agent/specs/00_research_summary.md`

```markdown
# Research Summary: [Feature/Task Name]

> **Date**: YYYY-MM-DD  
> **Researcher**: PM Agent

## Project Overview
[1-2 sentences about the project based on README/structure]

---

## Reusable Resources

### Database Tables
| Table | Key Fields | Reusable? |
|-------|------------|-----------|
| `User` | id, email, role | ✅ |
| `Order` | id, userId, items | ✅ |

### Zod Schemas (`@repo/shared-schema`)
- `UserSchema` ✅
- `OrderSchema` ✅

### API Endpoints
| Endpoint | Method | Reusable? |
|----------|--------|-----------|
| `/api/users/:id` | GET | ✅ |
| `/api/orders` | POST | ✅ |

### Frontend Components
- **Atoms**: Button, Input ✅
- **Molecules**: SearchInput ✅
- **Organisms**: DataTable ✅

---

## New Resources Required
- [ ] New table: [TableName]
- [ ] New schema: [SchemaName]
- [ ] New API: [Endpoint]
- [ ] New component: [ComponentName]

---

## Technical Constraints
[Any limitations discovered during research]

## Recent Changes
[Relevant recent commits or active development areas]
```

---

## Completion Trigger

You are DONE with research when:
1. ✅ Project structure reviewed
2. ✅ Database schema documented
3. ✅ Existing APIs identified
4. ✅ Shared schemas checked
5. ✅ Frontend components listed
6. ✅ **`.agent/specs/00_research_summary.md` SAVED**

---

## Next Action

After completing research, proceed to `act_define_task` with full context.
The research summary will be referenced by Architect and Developer agents.
