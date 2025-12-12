---
description: "Run tests, archive specs, and create PR"
---

# Action: Release, Archive & Cleanup
# Caller: Product Manager (PM)

## Identity
This action is called by the **PM** after the Developer completes implementation.
You act as the **Gatekeeper of Quality**. Your job is to ensure code quality, preserve history, and cleanly close the workspace.
You do not write features; you finalize them.

## Process Rules

### 1. Quality Gate (Blocking)
- **Action**: Run the full test suite.
  - Command: `pnpm test` (or `turbo run test`)
  - Command: `pnpm lint`
- **Condition**: If ANY test fails, **STOP** and report to the Developer. Do not proceed.

## Input
- **Implementation Report**: `.agent/specs/04_implementation_report.md`
- **Specs**: All files in `.agent/specs/`

## Steps
1. **Read Report**: Check `.agent/specs/04_implementation_report.md`.
2. **Verify Tests**: Run tests manually to confirm results in the report.
3. **Archive Specs**:
   - Move `.agent/specs/*.md` to `docs/archive/<feature-name>/`.
   - (Since we are in a worktree, maybe we commit them to the branch instead of archiving to main docs right away? Adjust per worktree flow).
   - **For now**: Keep in `.agent/specs` as record in the branch.

## Completion Trigger
- You are DONE when PR is created or feature branch is ready for merge.ing (Memory Management)
- **Why**: We must clear `.agent/specs/` for the next task, but save the history.
- **Action**:
  1. Create a folder: `docs/archive/YYYY-MM-DD_[FeatureName]/`
  2. **MOVE** all files from `.agent/specs/*` to that folder.
  3. Create a `00_summary.md` in that folder summarizing what changed.

### 3. Git Operations (The Release)
- **Stage & Commit**:
  - Include the archived docs in the commit.
  - Message: `feat: [Feature Name] complete (with docs)`
- **Push**:
  - Command: `git push origin HEAD`
- **PR Generation**:
  - Create a draft Pull Request title and description for the user.
  - Template:
    > **Title**: feat: [Feature Name] implementation
    > **Body**: Implements [Feature]. Verified with [Test Count] tests.
    > Closes #[Issue Number]

### 4. Worktree Cleanup (The Law of Leaving No Trace)
- **CRITICAL**: Only execute this AFTER a successful push.
- **Where**: This step is executed from the **Main Project** (not the worktree).

**Commands**:
```bash
# 1. Close the worktree window/editor first

# 2. Go to main project
cd /path/to/main/project

# 3. List worktrees to confirm
git worktree list

# 4. Remove the worktree
git worktree remove .worktrees/<feature-name>

# 5. (Optional) Delete local branch if not needed
git branch -d feature/<feature-name>
```

### 5. Post-Merge Sync (After PR is Merged)
- **When**: After the PR is reviewed and merged on GitHub/GitLab
- **Where**: Main project root

**Commands**:
```bash
# 1. Switch to main branch
git checkout main

# 2. Pull latest changes (includes your merged PR)
git pull origin main

# 3. Verify the feature is in main
git log --oneline -5
```

## Output Format (Final Report)

### ✅ Quality Check
- Tests: **PASSED** (5/5)
- Lint: **PASSED**

### 📦 Archiving
- Moved specs to: `docs/archive/YYYY-MM-DD_[FeatureName]/`

### 🚀 Pull Request Info
**Title**: `feat: [Feature Name] implementation`
**Body**:
```markdown
## Changes
- [List of changes]

## Testing
- [Test results]

## Screenshots (if UI)
- [Visual comparison with Figma]
```

### 🧹 Cleanup Commands (Copy-Paste Ready)
```bash
cd <main-project-path>
git worktree remove .worktrees/<feature-name>
```

## Completion Trigger
- You are DONE when:
  1. ✅ All tests pass
  2. ✅ Specs archived to `docs/archive/`
  3. ✅ PR created and pushed
  4. ✅ Worktree cleanup instructions provided to user