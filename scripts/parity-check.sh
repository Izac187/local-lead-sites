#!/usr/bin/env bash
# Rebuild Merced and compare the rendered DOM (+ JSON-LD) against the baseline.
# Ignores build-internal churn: strips the __next_f RSC hydration payload (webpack
# module IDs), async chunk-loader <script> tags, and normalizes asset/font hashes.
# A real content or layout change still shows as a diff. Exit 0 = parity holds.
set -euo pipefail
BASE="docs/superpowers/artifacts/merced-baseline/html"
NEXT_PUBLIC_SITE=merced npm run build > /tmp/parity-build.log 2>&1 || { echo "BUILD FAILED"; tail -20 /tmp/parity-build.log; exit 2; }

norm() {
  perl -0777 -pe 's#self\.__next_f\.push\(.*?\)</script>#__NEXTF__</script>#gs' "$1" | \
  sed -E \
    -e 's#/_next/static/[^"]*#/_next/static/X#g' \
    -e 's#<script src="/_next/static/X"[^>]*></script>##g' \
    -e 's#__variable_[A-Za-z0-9]+#__variable_X#g' \
    -e 's#nonce="[^"]*"#nonce="X"#g'
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
if [ "$diffs" -eq 0 ]; then echo "PARITY: PASS ($total DOM pages identical)"; else echo "PARITY: FAIL ($diffs changed)"; exit 1; fi
