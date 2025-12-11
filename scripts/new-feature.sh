#!/bin/bash
set -e

if [ -z "$1" ]; then
  echo "Usage: $0 <feature_name>"
  exit 1
fi

FEATURE_NAME="$1"
BRANCH_NAME="feat/$FEATURE_NAME"
WT_DIR=".worktrees/$FEATURE_NAME"

# 1. Safety Check: .gitignore
if ! grep -q ".worktrees/" .gitignore; then
  echo ".worktrees/" >> .gitignore
  echo "🔒 Added .worktrees/ to .gitignore"
fi

# 2. Create Worktree (Branch Check)
if [ -d "$WT_DIR" ]; then
  echo "⚠️  Worktree directory $WT_DIR already exists."
else
  if git show-ref --verify --quiet refs/heads/$BRANCH_NAME; then
    echo "🔄 Branch $BRANCH_NAME exists. Checking out..."
    git worktree add "$WT_DIR" "$BRANCH_NAME"
  else
    echo "✨ Creating new branch $BRANCH_NAME..."
    git worktree add "$WT_DIR" -b "$BRANCH_NAME"
  fi
fi

# 3. Env Sync
cp .env "$WT_DIR/.env" || echo "⚠️  Warning: Root .env not found."

# 4. Install Deps
cd "$WT_DIR"
pnpm install

# 5. Handover
echo "✅ Workspace Ready!"
echo "👉 Run: code $WT_DIR"
