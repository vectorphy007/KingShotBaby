import { recommendBearTeam } from "@/lib/ai/recommender";

describe("Bear Recommender", () => {
  it("rejects candidate lists smaller than five", () => {
    const result = recommendBearTeam([
      { memberId: "1", heroName: "Rosa", rallyCapacity: 200000, deploymentCap: 40000 }
    ]);

    expect(result).toBeNull();
  });

  it("builds leader + four joiners with synergy score", () => {
    const result = recommendBearTeam([
      { memberId: "1", heroName: "Rosa", rallyCapacity: 240000, deploymentCap: 50000 },
      { memberId: "2", heroName: "Alcar", rallyCapacity: 230000, deploymentCap: 48000 },
      { memberId: "3", heroName: "Diana", rallyCapacity: 220000, deploymentCap: 45000 },
      { memberId: "4", heroName: "Seth", rallyCapacity: 210000, deploymentCap: 42000 },
      { memberId: "5", heroName: "Petra", rallyCapacity: 200000, deploymentCap: 40000 },
      { memberId: "6", heroName: "Zoe", rallyCapacity: 190000, deploymentCap: 39000 }
    ]);

    expect(result).not.toBeNull();
    expect(result!.joiners).toHaveLength(4);
    expect(result!.totalBuff).toBeGreaterThan(0);
    expect(result!.synergyScore).toBeGreaterThan(0);
  });
});
