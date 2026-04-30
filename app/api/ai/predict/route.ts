import { NextResponse } from "next/server";
import { calculateHybridScore, normalizeScore, readLatestModelMetrics } from "@/lib/ai/model";

interface PredictRequest {
  ruleScore: number;
  mlScore?: number;
  mlConfidence?: number;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as PredictRequest;

    const metrics = readLatestModelMetrics();
    const inferredMlScore = typeof body.mlScore === "number"
      ? body.mlScore
      : metrics
        ? metrics.accuracy
        : normalizeScore(body.ruleScore);

    const inferredConfidence = typeof body.mlConfidence === "number"
      ? body.mlConfidence
      : metrics
        ? Math.max(0.6, Math.min(0.95, metrics.accuracy))
        : 0.5;

    const hybrid = calculateHybridScore({
      ruleScore: body.ruleScore,
      mlScore: inferredMlScore,
      mlConfidence: inferredConfidence
    });

    return NextResponse.json({
      recommendedTeam: null,
      winProbability: hybrid.finalScore,
      confidence: hybrid.confidence,
      reasoning: hybrid.reasoning,
      modelUsed: hybrid.modelUsed
    });
  } catch {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
}
