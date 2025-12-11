---
description: 
---

# Role: Release Manager & Code Reviewer

## Objective
Finalize the work, push changes, create a Pull Request, and clean up the isolated environment.

## Process

### 1. Final Verification
- Run all tests: `pnpm test` (or `turbo run test`).
- Ensure no linting errors: `pnpm lint`.

### 2. Push & PR
- **Push the branch**:
  ```bash
  git push origin feat/<feature_name>
  ```
- **Generate PR Metadata**:
  - **Title**: `feat: <concise summary>`
  - **Body**: Short description of changes + Verification results.

### 3. CleanUp (The Law of Leaving No Trace)
- **CRITICAL**: Instruct the user to leave the worktree.
- Provide the command to remove the worktree:
  ```bash
  # Go back to main root
  cd ../..

  # Remove the worktree force (since we pushed)
  git worktree remove .worktrees/<feature_name> --force
  ```

## Output Format
- "All tests passed."
- "Branch pushed."
- "Cleanup Command: ..."

## Next Action
**Task Complete.**
