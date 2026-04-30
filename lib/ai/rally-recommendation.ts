import { RallyLeaderStats } from "@/types/rally";
import { recommendBearTeam } from "@/lib/ai/recommender";

export function recommendRallyConfiguration(candidates: RallyLeaderStats[]) {
  if (candidates.length === 0) return null;

  const mapped = candidates.map((candidate) => {
    const bestHero = candidate.heroSkills[0];
    return {
      memberId: candidate.memberId,
      heroName: bestHero?.name || "Unknown Hero",
      rallyCapacity: candidate.capacityCap,
      deploymentCap: Math.floor(candidate.capacityCap * 0.2)
    };
  });

  const bearRecommendation = recommendBearTeam(mapped);
  if (bearRecommendation) {
    return {
      bestLeader: candidates.find((c) => c.memberId === bearRecommendation.leader.memberId) ?? candidates[0],
      recommendedRatio: "10/10/80 (Bear Hunt) or 60/15/25 (PvP Garrison)",
      joinerAdvice: bearRecommendation.reasoning,
      totalBuff: bearRecommendation.totalBuff,
      synergyScore: bearRecommendation.synergyScore
    };
  }

  // Simple heuristic: best leader is the one with highest capacity and base stats
  let bestLeader = candidates[0];
  let maxScore = 0;

  candidates.forEach(candidate => {
    // Score based on capacity and stat multipliers
    const statScore = candidate.combatStats.attackMultiplier +
                      candidate.combatStats.lethalityMultiplier +
                      candidate.combatStats.healthMultiplier +
                      candidate.combatStats.defenseMultiplier;
    const score = candidate.capacityCap * (1 + statScore);

    if (score > maxScore) {
      maxScore = score;
      bestLeader = candidate;
    }
  });

  return {
    bestLeader,
    recommendedRatio: "10/10/80 (Bear Hunt) or 60/15/25 (PvP Garrison)",
    joinerAdvice: "Use diverse effectOps. Avoid gatherer skills."
  };
}
