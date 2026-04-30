import { NextResponse } from "next/server";
import { BearCandidate, recommendBearTeam } from "@/lib/ai/recommender";

interface OptimizeRequest {
  candidates: BearCandidate[];
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as OptimizeRequest;
    const recommendation = recommendBearTeam(body.candidates ?? []);

    if (!recommendation) {
      return NextResponse.json(
        {
          error: "Insufficient candidate data. Provide at least 5 members mapped to known heroes."
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      recommendedTeam: {
        leader: recommendation.leader,
        joiners: recommendation.joiners
      },
      winProbability: null,
      confidence: Number(Math.min(0.99, recommendation.synergyScore / 200).toFixed(4)),
      reasoning: recommendation.reasoning,
      modelUsed: false,
      totalBuff: recommendation.totalBuff,
      synergyScore: recommendation.synergyScore
    });
  } catch {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
}
