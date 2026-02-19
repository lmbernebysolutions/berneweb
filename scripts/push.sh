#!/usr/bin/env bash
# Add all, commit with message, push to origin main.
# Usage: pnpm push [-- "Commit message"]   or   ./scripts/push.sh ["Commit message"]
set -e
MSG="${1:-chore: update}"
git add -A
git status
git commit -m "$MSG"
git push origin main
