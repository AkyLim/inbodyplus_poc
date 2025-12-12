---
description: "Initialize a new feature environment (worktree)"
---

# Action: Initialize Feature (Worktree)
# Role: Product Manager (PM)

## Goal
Create an isolated **Execution Environment** (Git Worktree) for a new feature.
This ensures that specs (`.agent/specs`) and code changes are isolated from other active tasks.

## Steps

### Step 1: Define Feature Name
Determine a kebab-case feature name (e.g., `user-profile-api` or `login-ui`).

### Step 2: Create Worktree
Run the following commands to create the environment:

```bash
# 1. Create worktree directory and branch
# Usage: git worktree add .worktrees/<feature-name> -b feat/<feature-name>
# Example:
git worktree add .worktrees/user-profile-api -b feat/user-profile-api

# 2. Setup internal spec directory
# Usage: mkdir -p .worktrees/<feature-name>/.agent/specs
# Example:
mkdir -p .worktrees/user-profile-api/.agent/specs
```

### Step 3: Verify Environment
Check if the folder exists and is ready for use.

```bash
ls -F .worktrees/user-profile-api/.agent/specs/
```

## Output
- A new folder `.worktrees/<feature-name>/`
- A new git branch `feat/<feature-name>`
- A writable spec directory `.worktrees/<feature-name>/.agent/specs/`

## Next Action
After initialization, **Change Directory** into the worktree:
`cd .worktrees/<feature-name>`

Then proceed to **Research** or **Define Task** *inside* that directory.
