#!/usr/bin/env bash
# Rebuild Merced and diff rendered HTML against the captured baseline.
# Normalizes per-build tokens (asset hashes, build IDs incl. escaped RSC payload,
# next/font class hashes) so only real content changes show. Exit 0 = parity holds.
set -euo pipefail
BASE="docs/superpowers/artifacts/merced-baseline/html"
NEXT_PUBLIC_SITE=merced npm run build > /tmp/parity-build.log 2>&1 || { echo "BUILD FAILED"; tail -20 /tmp/parity-build.log; exit 2; }

norm() {
  sed -E \
    -e 's#/_next/static/[A-Za-z0-9_./-]+#/_next/static/X#g' \
    -e 's#__variable_[A-Za-z0-9]+#__variable_X#g' \
    -e 's#"buildId":"[^"]*"#"buildId":"X"#g' \
    -e 's#buildId\\":\\"[A-Za-z0-9_-]+#buildId\\":\\"X#g' \
    -e 's#nonce="[^"]*"#nonce="X"#g' \
    -e 's#[0-9a-f]{16,}#HASH#g' \
    "$1"
}

diffs=0
tmpd=$(mktemp -d)
while IFS= read -r b; do
  rel="${b#$BASE/}"
  cur=".next/server/app/$rel"
  if [ ! -f "$cur" ]; then echo "MISSING in new build: $rel"; diffs=$((diffs+1)); continue; fi
  norm "$b"   > "$tmpd/base.html"
  norm "$cur" > "$tmpd/cur.html"
  if ! diff -q "$tmpd/base.html" "$tmpd/cur.html" >/dev/null 2>&1; then
    echo "CHANGED: $rel"; diffs=$((diffs+1))
  fi
done < <(find "$BASE" -name '*.html')
rm -rf "$tmpd"
total=$(find "$BASE" -name '*.html' | wc -l | tr -d ' ')
if [ "$diffs" -eq 0 ]; then echo "PARITY: PASS ($total pages identical)"; else echo "PARITY: FAIL ($diffs changed)"; exit 1; fi
