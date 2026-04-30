import heroData from "@/kingshot_database_clean.json";

export type HeroSkillType = "attack" | "lethality" | "health" | "defense";

export interface HeroFeature {
  heroName: string;
  rarity: string;
  skillType: HeroSkillType;
  skillValue: number;
  isChanceBased: boolean;
  synergyTags: string[];
}

const SKILL_WEIGHTS: Record<HeroSkillType, number> = {
  lethality: 1.4,
  attack: 1.2,
  health: 1.0,
  defense: 0.8
};

const RARITY_BONUS: Record<string, number> = {
  mythic: 16,
  legendary: 12,
  epic: 8,
  rare: 4,
  unknown: 2
};

function normalizeStatValue(raw: number): number {
  if (!Number.isFinite(raw)) return 0;
  let value = Math.abs(raw);
  while (value > 500) {
    value /= 10;
  }
  return value;
}

function inferSkillType(key: string): HeroSkillType | null {
  const k = key.toLowerCase();
  if (k.includes("lethality")) return "lethality";
  if (k.includes("health") || k.includes("hp")) return "health";
  if (k.includes("defense") || k.includes("defence") || k.includes("armor")) return "defense";
  if (k.includes("attack") || k.includes("damage")) return "attack";
  return null;
}

function inferChanceBased(hero: Record<string, unknown>): boolean {
  const keys = Object.keys(hero).map((k) => k.toLowerCase());
  return keys.some((k) => k.includes("chance") || k.includes("probability") || k.includes("rng"));
}

function extractDominantSkill(hero: Record<string, unknown>): {
  skillType: HeroSkillType;
  skillValue: number;
} {
  let bestType: HeroSkillType = "attack";
  let bestValue = 0;

  for (const [key, value] of Object.entries(hero)) {
    if (typeof value !== "number") continue;
    const type = inferSkillType(key);
    if (!type) continue;

    const normalized = normalizeStatValue(value);
    if (normalized > bestValue) {
      bestType = type;
      bestValue = normalized;
    }
  }

  return { skillType: bestType, skillValue: bestValue };
}

function normalizeRarity(raw: unknown): string {
  if (typeof raw !== "string" || raw.trim().length === 0) return "Unknown";
  return raw;
}

function buildSynergyTags(hero: Record<string, unknown>): string[] {
  const tags: string[] = [];
  const troopType = hero.troopType;
  const generation = hero.generation;
  const rarity = normalizeRarity(hero.rarity);

  if (typeof troopType === "string" && troopType) {
    tags.push(troopType.toLowerCase());
  }
  if (typeof generation === "number" && Number.isFinite(generation)) {
    tags.push(`gen-${generation}`);
  }
  tags.push(`rarity-${rarity.toLowerCase()}`);

  return Array.from(new Set(tags));
}

function getRawHeroes(): Record<string, unknown>[] {
  const data = heroData as { heroes?: Record<string, unknown>[] };
  return Array.isArray(data.heroes) ? data.heroes : [];
}

export function extractHeroFeatures(): HeroFeature[] {
  return getRawHeroes()
    .map((hero) => {
      const heroName = typeof hero.name === "string" ? hero.name : "Unknown Hero";
      const rarity = normalizeRarity(hero.rarity);
      const { skillType, skillValue } = extractDominantSkill(hero);
      const isChanceBased = inferChanceBased(hero);
      const synergyTags = buildSynergyTags(hero);

      return {
        heroName,
        rarity,
        skillType,
        skillValue,
        isChanceBased,
        synergyTags
      };
    })
    .filter((hero) => hero.heroName !== "Unknown Hero");
}

export function scoreHeroFeature(hero: HeroFeature): number {
  const weight = SKILL_WEIGHTS[hero.skillType];
  const rarityBonus = RARITY_BONUS[hero.rarity.toLowerCase()] ?? RARITY_BONUS.unknown;
  const base = hero.skillValue * weight + rarityBonus;
  const chanceAdjusted = hero.isChanceBased ? base * 0.85 : base;
  return Number(chanceAdjusted.toFixed(4));
}

export function getHeroFeatureByName(heroName: string): HeroFeature | null {
  const normalized = heroName.trim().toLowerCase();
  if (!normalized) return null;

  const hero = extractHeroFeatures().find((h) => h.heroName.toLowerCase() === normalized);
  return hero ?? null;
}
