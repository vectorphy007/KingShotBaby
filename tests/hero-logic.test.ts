import { extractHeroFeatures, getHeroFeatureByName, scoreHeroFeature } from "@/lib/ai/hero";

describe("Hero Intelligence Layer", () => {
  it("extracts hero features from clean dataset", () => {
    const heroes = extractHeroFeatures();
    expect(heroes.length).toBeGreaterThan(0);
    expect(heroes[0].heroName).toBeDefined();
    expect(heroes[0].skillType).toMatch(/attack|lethality|health|defense/);
  });

  it("scores known heroes deterministically", () => {
    const hero = getHeroFeatureByName("Rosa");
    expect(hero).not.toBeNull();

    const score = scoreHeroFeature(hero!);
    expect(score).toBeGreaterThan(0);
  });
});
