/**
 * Minimal {token} interpolation for per-site template strings.
 * Unknown tokens are left as-is so a missing var is visible, not silently blank.
 */
export function interpolate(tpl: string, vars: Record<string, string | number>): string {
  return tpl.replace(/\{(\w+)\}/g, (_, k) => (k in vars ? String(vars[k]) : `{${k}}`));
}
