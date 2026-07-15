// Config-driven estimate engine shared by <Calculator> and <CalculatorSection>.
// Two estimator kinds cover every niche:
//   - lookup:  composite key from N select inputs -> [min,max] range (roofing, tree removal)
//   - formula: base + Σ(perUnit·qty), select inputs apply a multiplier (HVAC, fence)

export type CalcSelectInput = {
  id: string;
  label: string;
  type: "select";
  options: { value: string; label: string }[];
};

export type CalcNumberInput = {
  id: string;
  label: string;
  type: "number";
  unitLabel?: string;
  min?: number;
  max?: number;
  step?: number;
};

export type CalcInput = CalcSelectInput | CalcNumberInput;

export type Estimator =
  | { kind: "lookup"; keyOrder: string[]; table: Record<string, [number, number]> }
  | {
      kind: "formula";
      base: number;
      terms: { inputId: string; perUnit?: number; multipliers?: Record<string, number> }[];
    };

export type CalculatorConfig = {
  inputs: CalcInput[];
  estimator: Estimator;
  laborNote: string;
};

function allProvided(cfg: CalculatorConfig, values: Record<string, string>): boolean {
  return cfg.inputs.every((i) => values[i.id] !== undefined && values[i.id] !== "");
}

/**
 * Compute an estimate range for the given input values.
 * Returns null when any input is missing/blank, or the combination is unknown.
 * Formula results apply a ±15% band around the computed point.
 */
export function computeEstimate(
  cfg: CalculatorConfig,
  values: Record<string, string>
): [number, number] | null {
  if (!allProvided(cfg, values)) return null;

  if (cfg.estimator.kind === "lookup") {
    const key = cfg.estimator.keyOrder.map((id) => values[id]).join("|");
    return cfg.estimator.table[key] ?? null;
  }

  let point = cfg.estimator.base;
  for (const term of cfg.estimator.terms) {
    const raw = values[term.inputId];
    if (term.perUnit !== undefined) {
      const qty = Number(raw);
      if (!Number.isFinite(qty)) return null;
      point += term.perUnit * qty;
    }
    if (term.multipliers) {
      const m = term.multipliers[raw];
      if (m === undefined) return null;
      point *= m;
    }
  }
  return [Math.round(point * 0.85), Math.round(point * 1.15)];
}
