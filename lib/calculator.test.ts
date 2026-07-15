import { describe, it, expect } from "vitest";
import { computeEstimate, type CalculatorConfig } from "@/lib/calculator";

const lookup: CalculatorConfig = {
  inputs: [
    { id: "size", label: "Size", type: "select", options: [{ value: "s", label: "S" }, { value: "l", label: "L" }] },
    { id: "mat", label: "Material", type: "select", options: [{ value: "a", label: "A" }] },
  ],
  estimator: { kind: "lookup", keyOrder: ["size", "mat"], table: { "s|a": [100, 200], "l|a": [300, 400] } },
  laborNote: "n",
};

const formula: CalculatorConfig = {
  inputs: [
    { id: "sqft", label: "Sq ft", type: "number", step: 1 },
    { id: "system", label: "System", type: "select", options: [{ value: "central", label: "Central" }, { value: "mini", label: "Mini" }] },
  ],
  estimator: {
    kind: "formula",
    base: 3000,
    terms: [
      { inputId: "sqft", perUnit: 4 },
      { inputId: "system", multipliers: { central: 1, mini: 1.3 } },
    ],
  },
  laborNote: "n",
};

describe("computeEstimate — lookup", () => {
  it("returns the mapped range", () => expect(computeEstimate(lookup, { size: "l", mat: "a" })).toEqual([300, 400]));
  it("null when incomplete", () => expect(computeEstimate(lookup, { size: "l" })).toBeNull());
  it("null on unknown combo", () => expect(computeEstimate(lookup, { size: "x", mat: "a" })).toBeNull());
});

describe("computeEstimate — formula", () => {
  it("base + perUnit*qty, ×multiplier, ±15% band", () => {
    // 3000 + 4*2000 = 11000; ×1.3 = 14300; ±15% -> [12155, 16445]
    expect(computeEstimate(formula, { sqft: "2000", system: "mini" })).toEqual([12155, 16445]);
  });
  it("null when a number input is blank", () => expect(computeEstimate(formula, { system: "central" })).toBeNull());
});
