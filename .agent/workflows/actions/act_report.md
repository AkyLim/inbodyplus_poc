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
- **PR Generation (Automated)**:
  - You MUST use GitHub CLI (`gh`) to create the PR.
  - **Pre-requisite**: Check `gh auth status` first.
  - **Action**:
    1. Create `.pr_body.md` with PR title and description.
    2. Run `gh pr create --base main --head <feature-branch> --title "feat: [Title]" --body-file .pr_body.md`
    3. Remove `.pr_body.md` after success.
  - **Fallback**: If `gh` is missing or auth fails, fallback to Draft description suggestion.

### 4. Worktree Cleanup (Automated)
- **CRITICAL**: Only execute this AFTER a successful push.
- **Action**: Remove the worktree to clean up workspace.
- **Execution**:
  - Use `run_command` with `Cwd` set to the **Main Project Root** (absolute path or `../..`).
  - Command: `git worktree remove .worktrees/<feature-name> --force`
  - (Optional) Delete the branch if merged: `git branch -d feature/<feature-name>`

```bash
# Example
# Cwd: /Users/username/projects/my-project (NOT .worktrees/...)
git worktree remove .worktrees/orm-mssql2 --force
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