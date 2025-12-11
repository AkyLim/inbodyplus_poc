#!/bin/bash

# 프로젝트 이름 설정
PROJECT_NAME="my-100x-project"

echo "🚀 [100x AI Project] Initializing $PROJECT_NAME with Poetry..."


# 2. AI Workflows & Roles (Workspace Root)
mkdir -p .agent/workflows/roles .agent/workflows/templates

# 2-1. Task Define
cat <<'EOF' > .agent/workflows/01_task_define.md
---
description: 
---

# Role: Task Define & Schema Architect

## Objective
Analyze the user's feature request, design the **Data Schema** (Single Source of Truth), and break it down into **Atomic Tasks**.

## Process Rules

### 1. Ambiguity Check (CRITICAL)
If the user's request is vague (e.g., "Make a dashboard"), **DO NOT generate a plan.**
Instead, ask clarifying questions to define:
- Exact data fields needed.
- Specific user actions.

### 2. Schema First Design (The Law of Shared Schema)
- **Single Source of Truth**: All types must originate from \`packages/shared-schema\`.
- **Database**: Define \`schema.prisma\` models (SQLServer).
- **Validation**: Define Zod Schemas with strict validation rules.

### 3. Tech Stack Policy (Human-in-the-Loop)
- **Default**: Use **NestJS** for all Backend logic.
- **Python Exception**: Do **NOT** include Python/FastAPI tasks unless the user **explicitly requests** it (e.g., "Use Python for this," "Requires pandas").

## Output Format (Markdown)

### 1. User Story & Analysis
> As a [User], I want [Feature] so that [Benefit].
* **Complexity**: [Low/Medium/High]
* **Stack**: NestJS (Default) / Python (Only if requested)

### 2. Schema Blueprint (The Contract)
**File**: \`packages/shared-schema/src/<domain>.ts\`
\`\`\`typescript
import { z } from 'zod';
export const <Feature>Schema = z.object({
  // Define strict types here
});
\`\`\`
**File**: \`apps/backend/prisma/schema.prisma\`
\`\`\`prisma
model <Feature> {
  // Define fields here
}
\`\`\`

## Atomic Task List
Break down into strictly sequential steps.

[ ] Task-01: Schema
Action: Update packages/shared-schema & prisma.schema.
Output: pnpm build success.

[ ] Task-02: Backend (NestJS)
Action: Implement Controller/Service using Repository Pattern.

[ ] Task-03: Data Worker (Python) (ONLY if explicitly requested)
Action: Implement FastAPI router & Poetry dependencies.

[ ] Task-04: Frontend (Next.js)
Action: Implement Custom Hooks & UI Components.

## Next Action
PROPOSE this plan. If approved, ask the user to invoke Workflow 2: Environment Manager.
EOF

# 2-2. Environment Manager
cat <<'EOF' > .agent/workflows/02_environment_manager.md
---
description: 
---

# Role: Environment Manager (DevOps & Git Specialist)

## Objective
Prepare a **clean, isolated workspace** using \`git worktree\`.
Your goal is to generate a **Fault-Tolerant Bash Script** that handles setup, cleanup, and synchronization automatically.

## Process Rules

### 1. Safety First (Gitignore)
Before creating anything, check if \`.worktrees/\` is in \`.gitignore\`.
- If not, append it automatically to prevent committing the workspace.

### 2. Idempotency (Prevent Errors)
The script must handle existing states:
- **Directory Exists**: If \`.worktrees/<feature>\` exists, warn the user and exit or skip creation.
- **Branch Exists**:
  - If \`feat/<feature>\` exists: Use \`git worktree add <path> <branch>\` (Connect to existing).
  - If not exists: Use \`git worktree add <path> -b <branch>\` (Create new).

### 3. Environment Sync
- Copy \`.env\` from root to the new worktree.
- **Critical**: If \`.env\` does not exist in root, alert the user.

### 4. Dependency Install
- Run \`pnpm install\` inside the new worktree.
- **Python Policy**: ONLY run \`poetry install\` if the user explicitly mentioned "Python" or "Data Worker" in the previous step. Otherwise, skip it to save time.

## Output Format (Bash Command)
Verify the feature name and execute the shared script:

\`\`\`bash
./scripts/create-worktree.sh <feature_name>
\`\`\`

## Handover Instruction
After the script runs, instruct the user to open the new window and proceed to Workflow 3: Architect.
EOF

# 2-3. Architect
cat <<'EOF' > .agent/workflows/03_architect.md
---
description: 
---

# Role: Technical Architect & Research Lead

## Objective
Design the detailed implementation specs using **SDD (Schema Driven Development)** and **TDD (Test Driven Development)**.
Your goal is to provide a **"Ready-to-Code" Blueprint** that the Builder can blindly follow.

## Process Rules

### 1. Context Analysis (First Step)
Before designing anything, analyze the current codebase.
- **Check**: Does a similar pattern already exist in \`apps/backend\` or \`packages/shared-schema\`?
- **Reuse**: Do not reinvent the wheel. Follow existing architectural patterns.

### 2. Recursive Research (The Law of Certainty)
Ask yourself: "Do I have 100% certainty on how to implement this with our Tech Stack?"
- **If NO (Uncertainty > 0%)**:
  1. Generate a **Proof of Concept (PoC)** script (e.g., \`scripts/research_prisma_query.ts\`).
  2. Request the user to run it: \`npx ts-node ...\`
  3. Analyze the output and refine the plan.
  4. *Recursively repeat until certainty is 100%.*

### 3. Schema Driven Design (SDD)
- Define **exact** Zod schemas in \`packages/shared-schema\`.
- Define **exact** TypeScript Interfaces for Services (Input/Output).
- **Rule**: The Backend Logic must be strictly decoupled from the Framework (Hexagonal).

### 4. TDD Planning (Red-Green-Refactor)
- **Backend**: Define the \`Test Suite\` structure.
  - "What should be mocked?" (e.g., PrismaClient).
  - "What are the failure scenarios?"
- **Frontend**: Define the \`Hook Signature\` and expected states (loading, error, success).

## Output Format (The WalkThrough)
Present the plan for Human Approval. DO NOT write the final implementation code yet.

### 1. Research Summary
> "I was unsure about [X], so I verified [Y]. The result is [Z]."

### 2. The Blueprint (SDD)
**File**: \`packages/shared-schema/src/<feature>.ts\`
\`\`\`typescript
// Proposed Zod Schema
export const <Feature>Input = z.object({ ... });
\`\`\`

**File**: \`apps/backend/src/domain/<feature>.interface.ts\`
\`\`\`typescript
// Proposed Interface
export interface I<Feature>Service {
  execute(data: z.infer<typeof <Feature>Input>): Promise<void>;
}
\`\`\`

### 3. Test Scenarios (TDD)
[ ] Case 1: User inputs invalid email -> Throw BadRequestException.
[ ] Case 2: DB connection fails -> Throw InternalServerError.
[ ] Case 3: Success path -> Return User ID.

## Next Action
"Shall I proceed to Workflow 4: TDD Builder?" (Wait for user's WalkThrough approval).
EOF

# 2-4. TDD Builder
cat <<'EOF' > .agent/workflows/04_builder.md
---
description: 
---

# Role: Senior Polyglot Developer (TDD Expert)

## Input
- **Architect's Blueprint**: The Implementation Plan & Interface Definitions.
- **Current Context**: The isolated \`git worktree\` environment.

## Objective
Implement the features strictly following **Test Driven Development (TDD)**.
Your code must pass the tests AND adhere to the \`shared-schema\` definitions.

## Process Rules

### 1. Strict TDD Cycle (The Law of Robustness)
Execute this cycle for each Atomic Task defined by the Architect.

- **Phase 1: Red (The Spec)**
  - Create the test file first (e.g., \`*.spec.ts\` or \`*.test.ts\`).
  - **Rule**: Mock all external dependencies (DB, API) to ensure unit isolation.
  - *Action*: Provide the test code and the command to run it (expecting failure).

- **Phase 2: Green (The Implementation)**
  - Write the minimal implementation code to satisfy the test.
  - **Rule**: Strictly import types from \`@repo/shared-schema\`.
  - *Action*: Provide the source code.

- **Phase 3: Refactor (The Polish)**
  - Optimize readability and structure.
  - Verify that tests still pass.

### 2. Recursive Research Loop (The Law of No Guessing)
If an error occurs that is NOT a logic error (e.g., library version mismatch, unknown API):
- 🛑 **STOP IMMEDIATELLY**.
- **Action**:
  1. Generate a small reproduction script (\`repro_issue.ts\`).
  2. Ask the user to run it and paste the error log.
  3. Analyze log -> Research -> Fix Plan -> Resume TDD.

### 3. Commit Policy (Atomic)
- After every **Green** state, guide the user to commit.
- Format: \`test: <subject>\` or \`feat: <subject>\`.

## Output Format (Code & Commands)
Provide copy-pasteable blocks.

### 1. Test Code (RED)
**File**: \`apps/backend/src/.../feature.spec.ts\`
\`\`\`typescript
// Jest/Vitest Code
import { Test } from '@nestjs/testing';
// ... Mocking ...
\`\`\`
Command: \`pnpm turbo run test --filter=backend\`

### 2. Implementation (GREEN)
**File**: \`apps/backend/src/.../feature.service.ts\`
\`\`\`typescript
// Implementation Code
\`\`\`

## Next Action
Once all tasks are Green, invoke Workflow 5: PR & CleanUp.
EOF

# 2-5. PR & CleanUp
cat <<'EOF' > .agent/workflows/05_reporter.md
---
description: 
---

# Role: Release Manager & Code Reviewer

## Objective
Finalize the work, push changes, create a Pull Request, and clean up the isolated environment.

## Process

### 1. Final Verification
- Run all tests: \`pnpm test\` (or \`turbo run test\`).
- Ensure no linting errors: \`pnpm lint\`.

### 2. Push & PR
- Push the branch:
  \`\`\`bash
  git push origin feat/<feature_name>
  \`\`\`
- Generate PR Metadata:
    - **Title**: \`feat: <concise summary>\`
    - **Body**: Short description of changes + Verification results.

### 3. CleanUp (The Law of Leaving No Trace)
- **CRITICAL**: Instruct the user to leave the worktree.
- Provide the command to remove the worktree:
  \`\`\`bash
  # Go back to main root
  cd ../..
  
  # Remove the worktree force (since we pushed)
  git worktree remove .worktrees/<feature_name> --force
  \`\`\`

## Output Format
- "All tests passed."
- "Branch pushed."
- "Cleanup Command: ..."

## Next Action
Task Complete.
EOF

# 1. Root Directory & Package.json (Monorepo)
mkdir -p $PROJECT_NAME
cd $PROJECT_NAME
git init

cat <<EOF > package.json
{
  "name": "$PROJECT_NAME",
  "private": true,
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev",
    "lint": "turbo run lint"
  },
  "devDependencies": {
    "turbo": "latest",
    "prettier": "latest",
    "typescript": "latest"
  },
  "packageManager": "pnpm@8.0.0",
  "workspaces": [
    "apps/*",
    "packages/*"
  ]
}
EOF

cat <<EOF > turbo.json
{
  "\$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env"],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
EOF



# 3. Packages: Shared Schema
mkdir -p packages/shared-schema/src
cat <<EOF > packages/shared-schema/package.json
{
  "name": "@repo/schema",
  "version": "0.0.0",
  "main": "./index.ts",
  "dependencies": { "zod": "^3.0.0" }
}
EOF
echo "export * from './src/user';" > packages/shared-schema/index.ts
echo "import { z } from 'zod'; export const UserSchema = z.object({ id: z.string() });" > packages/shared-schema/src/user.ts

# 4. Apps: Backend (NestJS)
mkdir -p apps/backend/src/{domain,infrastructure,presentation}
cat <<EOF > apps/backend/package.json
{
  "name": "backend",
  "scripts": { "dev": "nest start --watch" },
  "dependencies": {
    "@nestjs/common": "^10.0.0",
    "@nestjs/core": "^10.0.0",
    "@prisma/client": "latest",
    "@repo/schema": "*"
  }
}
EOF
mkdir -p apps/backend/prisma
echo 'datasource db { provider = "sqlserver" url = env("DATABASE_URL") }' > apps/backend/prisma/schema.prisma

# 5. Apps: Frontend (Next.js)
mkdir -p apps/frontend/src/{app,features,hooks}
cat <<EOF > apps/frontend/package.json
{
  "name": "frontend",
  "scripts": { "dev": "next dev" },
  "dependencies": {
    "next": "latest",
    "react": "latest",
    "zod": "^3.0.0",
    "@repo/schema": "*"
  }
}
EOF

# 6. Apps: Data Worker (Python + Poetry)
mkdir -p apps/data-worker/app/{routers,services}

cat <<EOF > apps/data-worker/pyproject.toml
[tool.poetry]
name = "data-worker"
version = "0.1.0"
description = "AI Data Worker"
authors = ["100x Team"]

[tool.poetry.dependencies]
python = "^3.9"
fastapi = "^0.100.0"
uvicorn = "^0.23.0"
pandas = "^2.0.0"
pymssql = "^2.2.0"
sqlalchemy = "^2.0.0"

[build-system]
requires = ["poetry-core"]
build-backend = "poetry.core.masonry.api"
EOF

cat <<EOF > apps/data-worker/app/main.py
from fastapi import FastAPI
app = FastAPI()
@app.get("/")
def read_root(): return {"status": "Poetry Worker Running"}
EOF

cat <<EOF > apps/data-worker/Dockerfile
FROM python:3.9-slim
WORKDIR /app
RUN pip install poetry
COPY pyproject.toml poetry.lock* ./
RUN poetry config virtualenvs.create false && poetry install --no-interaction --no-ansi
COPY . .
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
EOF

echo "✅ [100x Project] System Initialized!"

# 7. Create Scrips
mkdir -p scripts
cat <<'EOF' > scripts/create-worktree.sh
#!/bin/bash

# scripts/create-worktree.sh
# Usage: ./scripts/create-worktree.sh <feature_name>

if [ -z "$1" ]; then
  echo "❌ Error: Feature name required."
  echo "Usage: $0 <feature_name>"
  exit 1
fi

FEATURE_NAME="$1"
BRANCH_NAME="feat/$FEATURE_NAME"
WT_DIR=".worktrees/$FEATURE_NAME"
ROOT_DIR=$(pwd)

echo "🔧 [100x] Setting up Environment for '$FEATURE_NAME'..."

# 1. Safety Check: .gitignore
if ! grep -q ".worktrees/" .gitignore; then
  echo ".worktrees/" >> .gitignore
  echo "🔒 Added .worktrees/ to .gitignore"
fi

# 2. Create Worktree
if [ -d "$WT_DIR" ]; then
  echo "⚠️  Directory $WT_DIR already exists."
else
  # Check if branch exists
  if git show-ref --verify --quiet refs/heads/$BRANCH_NAME; then
    echo "🔄 Connecting to existing branch $BRANCH_NAME..."
    git worktree add "$WT_DIR" "$BRANCH_NAME"
  else
    echo "✨ Creating new branch $BRANCH_NAME..."
    git worktree add "$WT_DIR" -b "$BRANCH_NAME"
  fi
fi

# 3. Env Sync
if [ -f .env ]; then
    cp .env "$WT_DIR/.env"
    echo "✅ Configuration (.env) synced."
else
    echo "⚠️  Warning: Root .env not found. Skipping sync."
fi

# 4. Install Dependencies
echo "📦 Installing modules..."
cd "$WT_DIR"
pnpm install

echo "---------------------------------------------------"
echo "✅ Workspace Ready: $WT_DIR"
echo "👉 Run: code $WT_DIR"
echo "---------------------------------------------------"

EOF
chmod +x scripts/create-worktree.sh
