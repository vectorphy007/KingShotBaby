import { calculateHybridScore } from "@/lib/ai/model";

describe("Hybrid Scoring", () => {
  it("falls back to rules when ML confidence is low", () => {
    const result = calculateHybridScore({
      ruleScore: 0.8,
      mlScore: 0.2,
      mlConfidence: 0.5
    });

    expect(result.modelUsed).toBe(false);
    expect(result.finalScore).toBeCloseTo(0.8, 4);
  });

  it("blends rules and ML when confidence threshold is met", () => {
    const result = calculateHybridScore({
      ruleScore: 0.8,
      mlScore: 0.5,
      mlConfidence: 0.9
    });

    expect(result.modelUsed).toBe(true);
    expect(result.finalScore).toBeCloseTo(0.71, 2);
  });
});
