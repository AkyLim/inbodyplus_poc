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
