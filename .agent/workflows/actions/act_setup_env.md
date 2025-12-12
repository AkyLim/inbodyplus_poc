---
description: "Setup isolated git worktree environment"
---

# Action: Setup Environment (Workspace Manager)
# Caller: Developer (Phase 2, Step 1)

## Goal
Create a clean, isolated workspace (`git worktree`) and **transfer the current active specifications** to ensure seamless context continuity.

## Input
- **Requirements**: `.agent/specs/01_requirements.md` (from PM)
- **Design Data**: `.agent/specs/02_figma_design_data.md` OR `.agent/specs/02_visual_design.md` (from PM)
- **Architecture**: `.agent/specs/03_architecture.md` (from Architect)

## Steps

### 1. Pre-flight Check
- **Sanitize Name**: Ensure `<feature-name>` is kebab-case (e.g., `feat-user-login`).
- **Git Status**: Run `git status`. If not clean, **STOP** and ask user to stash/commit.

### 2. Isolation Execution (Create Worktree)
- **Execute Script**:
  ```bash
  # Check which script exists and run it
  if [ -f "./scripts/create-worktree.sh" ]; then
    ./scripts/create-worktree.sh <feature-name>
  else
    ./init-100x-poetry.sh create-worktree <feature-name>
  fi
  ```
- *Wait* for the script to finish.

### 3. Context Sync (CRITICAL)
- **Why**: The new folder is empty. The Agents inside the new window need to know the requirements.
- **Action**: Copy the `.agent/specs/` folder from the Root to the New Worktree.
  ```bash
  # Copy specs to the new worktree
  cp -r .agent/specs/ .worktrees/<feature-name>/.agent/
  ```

### 4. Dependency & Config
- **Install**: Run `pnpm install` inside the new folder.
- **Env Var**: Check if `.env` was copied correctly. If not, copy it from root.

## Output Format
- "Worktree created at: `.worktrees/<feature-name>`"
- "Context (Specs) Synced: ✅"
- "Dependencies Installed: ✅"

## Instruction for User
> **"Environment Ready. Please OPEN the folder `.worktrees/<feature-name>` in a New Window to start the Backend/Frontend implementation."**

## Completion Trigger
- You are DONE when:
  1. ✅ Worktree created at `.worktrees/<feature-name>`
  2. ✅ All spec files copied to worktree
  3. ✅ Dependencies installed
  4. ✅ User instructed to open new window