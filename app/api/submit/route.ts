// Location: /app/api/submit/route.ts

import { NextResponse } from "next/server";
import { addSubmission, rebalanceDatabase } from "@/lib/storage";
import { suggestPlayerRole } from "@/lib/ai/classification/role";
import { detectAnomalies } from "@/lib/ai/anomaly-detection";
import { SubmissionRole } from "@/types/roster";

function parseCompactNumber(value: unknown): number {
  if (typeof value === "number") return value;
  if (!value || typeof value !== "string") return 0;
  const clean = value.replace(/,/g, "").trim().toUpperCase();
  const base = parseFloat(clean);
  if (Number.isNaN(base)) return 0;
  if (clean.endsWith("M")) return base * 1_000_000;
  if (clean.endsWith("K")) return base * 1_000;
  return base;
}

function inferSubmissionRole(townCenter: number, rallyCap: unknown): SubmissionRole {
  return townCenter >= 22 || parseCompactNumber(rallyCap) >= 250_000 ? "Veteran" : "Newbie";
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const townCenter = Number(body.townCenter) || 0;
    const inferredRole = inferSubmissionRole(townCenter, body.rallyCap);

    // 1. Validation
    if (
      !body.name ||
      !townCenter ||
      !body.rallyCap ||
      !body.deploymentCap ||
      !body.highestTier ||
      !body.totalTroops
    ) {
      return NextResponse.json({ error: "Required fields missing." }, { status: 400 });
    }

    // 2. AI Logic
    const suggestedGroup = suggestPlayerRole({ ...body, townCenter });
    const anomalies = detectAnomalies({ ...body, townCenter });
    const isApproved = anomalies.length === 0;

    // 3. Save to DB
    await addSubmission({
      ...body,
      townCenter,
      role: inferredRole,
      group: suggestedGroup,
      status: isApproved ? "approved" : "pending",
      notes: isApproved ? "Auto-approved." : `Flagged: ${anomalies.join(", ")}`
    });

    // 4. If clean, re-calculate the entire alliance 1:3:3:3 curve
    if (isApproved) {
      await rebalanceDatabase();
      return NextResponse.json({ 
        success: true, 
        message: `Approved. Tactical designation: ${suggestedGroup}.` 
      });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Data transmitted. Awaiting manual officer review due to anomalies." 
    });

  } catch (error) {
    return NextResponse.json({ error: "System failure during transmission." }, { status: 500 });
  }
}