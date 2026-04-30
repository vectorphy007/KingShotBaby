import { calculateDamage } from "@/lib/calculators/damage";
import { calculateBatchHeal } from "@/lib/calculators/economic";
import { analyzeRally } from "@/lib/calculators/rally";

describe("Calculator Regression Guard", () => {
  it("keeps combat calculator math stable", () => {
    const result = calculateDamage({
      troopCount: 10000,
      baseAttack: 100,
      attackMultiplier: 1,
      lethalityMultiplier: 1,
      enemyDefense: 100,
      enemyDefenseMultiplier: 1,
      enemyHealth: 100,
      enemyHealthMultiplier: 1,
      skillModMultiplier: 1.5
    });

    expect(result.estimatedCasualties).toBeCloseTo(0.0015, 6);
  });

  it("keeps economic calculator behavior stable", () => {
    const result = calculateBatchHeal({
      treatiesAssists: 30,
      secondsPerAssist: 200,
      totalInjuredTroops: 100000,
      timeToHealOneTroopSeconds: 2
    });

    expect(result.optimalBatchSize).toBe(3000);
    expect(result.totalBatchesRequired).toBe(34);
  });

  it("keeps rally analyzer output contract stable", () => {
    const result = analyzeRally({
      leader: {
        memberId: "L1",
        capacityCap: 100000,
        combatStats: {
          attackMultiplier: 0.2,
          lethalityMultiplier: 0.2,
          defenseMultiplier: 0.1,
          healthMultiplier: 0.1
        },
        heroSkills: []
      },
      joiners: []
    });

    expect(result.totalCapacity).toBe(0);
    expect(Array.isArray(result.warnings)).toBe(true);
  });
});
