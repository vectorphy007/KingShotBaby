import { POST as optimizePOST } from "@/app/api/ai/optimize/route";
import { POST as predictPOST } from "@/app/api/ai/predict/route";

describe("AI API Endpoints", () => {
  it("returns recommendation payload for optimize route", async () => {
    const request = new Request("http://localhost/api/ai/optimize", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        candidates: [
          { memberId: "1", heroName: "Rosa", rallyCapacity: 240000, deploymentCap: 50000 },
          { memberId: "2", heroName: "Alcar", rallyCapacity: 230000, deploymentCap: 48000 },
          { memberId: "3", heroName: "Diana", rallyCapacity: 220000, deploymentCap: 45000 },
          { memberId: "4", heroName: "Seth", rallyCapacity: 210000, deploymentCap: 42000 },
          { memberId: "5", heroName: "Petra", rallyCapacity: 200000, deploymentCap: 40000 }
        ]
      })
    });

    const response = await optimizePOST(request);
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload.recommendedTeam).toBeDefined();
    expect(payload.reasoning).toBeDefined();
  });

  it("returns hybrid prediction payload", async () => {
    const request = new Request("http://localhost/api/ai/predict", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        ruleScore: 0.77,
        mlScore: 0.65,
        mlConfidence: 0.8
      })
    });

    const response = await predictPOST(request);
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload.winProbability).toBeGreaterThan(0);
    expect(typeof payload.modelUsed).toBe("boolean");
  });
});
