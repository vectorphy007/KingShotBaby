import { calculateMasterAcademy, calculateTruegoldCost } from "@/lib/calculators/economic";
import { recommendFormation, simulatePRNGDamage } from "@/lib/calculators/damage";
import { calculateSkillModMultiplier } from "@/lib/calculators/skillmod";
import { HeroSkill } from "@/types/hero";

describe("Calculator Coverage Expansion", () => {
  it("covers all formation recommendation scenarios", () => {
    const scenarios = [
      "bear_hunt",
      "pvp_garrison",
      "pvp_open_field",
      "mystic_coliseum",
      "mystic_crystal_cave"
    ] as const;

    for (const scenario of scenarios) {
      const result = recommendFormation(scenario);
      expect(result.isOptimal).toBe(true);
      expect(result.explanation.length).toBeGreaterThan(0);
    }
  });

  it("covers truegold and academy branches", () => {
    const truegold = calculateTruegoldCost({ currentLevel: "TC35", targetLevel: "TG5" });
    expect(truegold.totalTemperedTruegoldRequired).toBeGreaterThan(0);
    expect(truegold.estimatedRefinementWeeks).toBeGreaterThan(0);

    const academy = calculateMasterAcademy({
      dailyAdventureSupplies: 120,
      currentManuscripts: 10,
      currentEmblems: 3
    });
    expect(academy.efficiencyLossWarning).toBeDefined();
    expect(academy.recommendedActions.length).toBeGreaterThan(0);

    const academyNoItems = calculateMasterAcademy({
      dailyAdventureSupplies: 10,
      currentManuscripts: 0,
      currentEmblems: 0
    });
    expect(academyNoItems.recommendedActions[0]).toContain("Badlands");
  });

  it("covers skillmod and PRNG simulation paths", () => {
    const guaranteedSkill: HeroSkill = {
      id: "s1",
      name: "Guaranteed Attack",
      description: "",
      effectOp: 101,
      value: 25,
      isChanceBased: false,
      skillLevel: 5
    };

    const chanceSkill: HeroSkill = {
      id: "s2",
      name: "Chance Burst",
      description: "",
      effectOp: 202,
      value: 10,
      isChanceBased: true,
      chanceProbability: 1,
      skillLevel: 5
    };

    const multiplier = calculateSkillModMultiplier([guaranteedSkill, chanceSkill]);
    expect(multiplier).toBeGreaterThan(1);

    const sim = simulatePRNGDamage(
      {
        troopCount: 10000,
        baseAttack: 100,
        attackMultiplier: 1,
        lethalityMultiplier: 1,
        enemyDefense: 100,
        enemyDefenseMultiplier: 1,
        enemyHealth: 100,
        enemyHealthMultiplier: 1,
        skillModMultiplier: 1.2
      },
      [chanceSkill],
      5
    );

    expect(sim.bestCaseDamage).toBeGreaterThanOrEqual(sim.averageDamage);
    expect(sim.averageDamage).toBeGreaterThanOrEqual(sim.worstCaseDamage);
  });
});
