import fs from "fs";
import path from "path";

export interface HybridScoreInput {
  ruleScore: number;
  mlScore: number;
  mlConfidence: number;
}

export interface HybridScoreOutput {
  finalScore: number;
  confidence: number;
  modelUsed: boolean;
  reasoning: string;
}

export function normalizeScore(value: number): number {
  if (!Number.isFinite(value)) return 0;
  const normalized = value > 1 ? value / 100 : value;
  return Math.max(0, Math.min(normalized, 1));
}

export function calculateHybridScore(input: HybridScoreInput): HybridScoreOutput {
  const rule = normalizeScore(input.ruleScore);
  const ml = normalizeScore(input.mlScore);
  const confidence = Math.max(0, Math.min(input.mlConfidence, 1));

  if (confidence < 0.6) {
    return {
      finalScore: Number(rule.toFixed(4)),
      confidence,
      modelUsed: false,
      reasoning: "ML confidence below threshold; returned deterministic rule score only."
    };
  }

  const finalScore = rule * 0.7 + ml * 0.3;
  return {
    finalScore: Number(finalScore.toFixed(4)),
    confidence,
    modelUsed: true,
    reasoning: "Hybrid score composed from 70% rules and 30% ML prediction."
  };
}

export function readLatestModelMetrics(): { accuracy: number; model_file: string } | null {
  try {
    const metricsPath = path.join(process.cwd(), "ml", "model-metrics.json");
    const raw = fs.readFileSync(metricsPath, "utf8");
    const parsed = JSON.parse(raw) as { accuracy?: number; model_file?: string };

    if (typeof parsed.accuracy !== "number" || typeof parsed.model_file !== "string") {
      return null;
    }

    return {
      accuracy: parsed.accuracy,
      model_file: parsed.model_file
    };
  } catch {
    return null;
  }
}
