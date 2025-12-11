#!/bin/bash
PROJECT_ROOT=$(pwd)
FEATURE_NAME="ping-pong"
BRANCH_NAME="feat/$FEATURE_NAME"
WT_DIR=".worktrees/$FEATURE_NAME"

echo "🔧 Starting Environment Setup for $FEATURE_NAME..."

# 0. Ensure .env exists (Mocking for Pilot)
if [ ! -f .env ]; then
    echo "DATABASE_URL='sqlserver://localhost:1433;database=mydb'" > .env
    echo "Created dummy .env"
fi

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
echo "📦 Installing dependencies in worktree..."
pnpm install

echo "✅ Workspace Ready at $WT_DIR"
echo "👉 You should now switch context to: $WT_DIR"
