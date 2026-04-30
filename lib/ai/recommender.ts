import { HeroFeature, HeroSkillType, getHeroFeatureByName, scoreHeroFeature } from "@/lib/ai/hero";

export interface BearCandidate {
  memberId: string;
  heroName: string;
  rallyCapacity: number;
  deploymentCap: number;
}

export interface BearRecommendation {
  leader: BearCandidate;
  joiners: BearCandidate[];
  totalBuff: number;
  synergyScore: number;
  reasoning: string;
}

const SKILL_PRIORITY: Record<HeroSkillType, number> = {
  lethality: 4,
  attack: 3,
  health: 2,
  defense: 1
};

function candidateStrength(candidate: BearCandidate, hero: HeroFeature): number {
  const heroScore = scoreHeroFeature(hero);
  const capacityFactor = Math.max(candidate.rallyCapacity, 1) / 1000;
  return heroScore + capacityFactor;
}

function scoreJoinerSet(heroes: HeroFeature[]): number {
  const skillTypeCounts: Partial<Record<HeroSkillType, number>> = {};
  let score = 0;

  for (const hero of heroes) {
    const type = hero.skillType;
    const priorCount = skillTypeCounts[type] ?? 0;
    skillTypeCounts[type] = priorCount + 1;

    score += scoreHeroFeature(hero) + SKILL_PRIORITY[type] * 2;

    // Penalize repeated buff types in joiners.
    if (priorCount > 0) {
      score -= 12;
    }
  }

  const uniqueTypes = new Set(heroes.map((h) => h.skillType)).size;
  score += uniqueTypes * 8;

  return Number(score.toFixed(4));
}

function buildReasoning(leaderHero: HeroFeature, joinerHeroes: HeroFeature[]): string {
  const uniqueTypes = Array.from(new Set(joinerHeroes.map((hero) => hero.skillType)));
  const ordered = uniqueTypes.sort((a, b) => SKILL_PRIORITY[b] - SKILL_PRIORITY[a]);

  return [
    `Leader chosen for strongest rally throughput and hero value: ${leaderHero.heroName} (${leaderHero.skillType}).`,
    `Joiners selected to maximize unique buff coverage with priority ${ordered.join(", ")}.`,
    "Repeated buff types were penalized while complementary buffs were rewarded."
  ].join(" ");
}

export function recommendBearTeam(candidates: BearCandidate[]): BearRecommendation | null {
  if (candidates.length < 5) return null;

  const enriched = candidates
    .map((candidate) => {
      const hero = getHeroFeatureByName(candidate.heroName);
      if (!hero) return null;
      return { candidate, hero, strength: candidateStrength(candidate, hero) };
    })
    .filter((item): item is { candidate: BearCandidate; hero: HeroFeature; strength: number } => item !== null);

  if (enriched.length < 5) return null;

  const leader = [...enriched].sort((a, b) => b.strength - a.strength)[0];
  const joinerPool = enriched.filter((item) => item.candidate.memberId !== leader.candidate.memberId);

  let bestJoiners = joinerPool.slice(0, 4);
  let bestScore = Number.NEGATIVE_INFINITY;

  // Evaluate combinations of 4 joiners from available pool.
  for (let i = 0; i < joinerPool.length; i += 1) {
    for (let j = i + 1; j < joinerPool.length; j += 1) {
      for (let k = j + 1; k < joinerPool.length; k += 1) {
        for (let l = k + 1; l < joinerPool.length; l += 1) {
          const set = [joinerPool[i], joinerPool[j], joinerPool[k], joinerPool[l]];
          const score = scoreJoinerSet(set.map((x) => x.hero));
          if (score > bestScore) {
            bestScore = score;
            bestJoiners = set;
          }
        }
      }
    }
  }

  const joinerBuff = bestJoiners.reduce((sum, item) => sum + scoreHeroFeature(item.hero), 0);
  const totalBuff = Number((scoreHeroFeature(leader.hero) + joinerBuff).toFixed(4));
  const synergyScore = Number((bestScore + SKILL_PRIORITY[leader.hero.skillType] * 2).toFixed(4));

  return {
    leader: leader.candidate,
    joiners: bestJoiners.map((item) => item.candidate),
    totalBuff,
    synergyScore,
    reasoning: buildReasoning(leader.hero, bestJoiners.map((item) => item.hero))
  };
}
