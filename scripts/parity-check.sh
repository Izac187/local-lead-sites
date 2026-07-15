#!/usr/bin/env bash
# Rebuild Merced and diff rendered HTML against the captured baseline.
# Exit 0 = parity holds; non-zero = a page changed (printed).
set -euo pipefail
BASE="docs/superpowers/artifacts/merced-baseline/html"
NEXT_PUBLIC_SITE=merced npm run build > /tmp/parity-build.log 2>&1 || { echo "BUILD FAILED"; tail -20 /tmp/parity-build.log; exit 2; }
diffs=0
while IFS= read -r b; do
  rel="${b#$BASE/}"
  cur=".next/server/app/$rel"
  if [ ! -f "$cur" ]; then echo "MISSING in new build: $rel"; diffs=$((diffs+1)); continue; fi
  if ! diff -q "$b" "$cur" >/dev/null 2>&1; then echo "CHANGED: $rel"; diffs=$((diffs+1)); fi
done < <(find "$BASE" -name '*.html')
if [ "$diffs" -eq 0 ]; then echo "PARITY: PASS ($(find "$BASE" -name '*.html' | wc -l | tr -d ' ') pages identical)"; else echo "PARITY: FAIL ($diffs changed)"; exit 1; fi
