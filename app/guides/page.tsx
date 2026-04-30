import React from "react";
import Card from "@/components/ui/Card";

export default function GuidesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="border-b border-accent-muted/20 pb-4">
        <h1 className="text-3xl font-bold">Knowledge Base</h1>
        <p className="text-accent-muted mt-2">
          A static repository for game mastery, covering hero guides, troop formations, and strategic research priorities.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <h2 className="text-xl font-bold mb-3 text-gold">Hero Guides</h2>
          <p className="text-sm text-accent-muted mb-4">
            Understanding the functional separation between Rally Leaders and Rally Joiners is critical for combat efficiency.
          </p>
          <ul className="space-y-2 text-sm">
            <li className="border-l-2 border-accent-muted/20 pl-3">
              <strong>Rally Leaders:</strong> Focus on high-lethality meta leaders like Amadeus (Infantry), Petra (Cavalry), or Vivian (Archers).
            </li>
            <li className="border-l-2 border-accent-muted/20 pl-3">
              <strong>Rally Joiners:</strong> Prioritize "S-Tier" joiners like Chenko or Yeonwoo for their guaranteed +25% Lethality buffs.
            </li>
            <li className="border-l-2 border-accent-muted/20 pl-3">
              <strong>Skill Stacking:</strong> Avoid stacking chance-based skills like Jabel's, as they do not stack and may overwrite superior buffs.
            </li>
          </ul>
        </Card>

        <Card>
          <h2 className="text-xl font-bold mb-3 text-accent">Troop Formations</h2>
          <p className="text-sm text-accent-muted mb-4">
            Combat resolution uses square-root scaling, prioritizing qualitative stats over pure army size.
          </p>
          <ul className="space-y-2 text-sm">
            <li className="border-l-2 border-accent-muted/20 pl-3">
              <strong>Standard Ratio:</strong> Use 50% Infantry, 20% Cavalry, and 30% Archers for balanced defense and offense.
            </li>
            <li className="border-l-2 border-accent-muted/20 pl-3">
              <strong>Survival Priority:</strong> Prioritize Infantry Health above all other defensive metrics, as they absorb the opening salvo in every engagement.
            </li>
            <li className="border-l-2 border-accent-muted/20 pl-3">
              <strong>Damage Scaling:</strong> Combat damage scales multiplicatively with Lethality stats.
            </li>
          </ul>
        </Card>

        <Card>
          <h2 className="text-xl font-bold mb-3">Research Priorities</h2>
          <p className="text-sm text-accent-muted mb-4">
            Efficiency is achieved by maintaining a strict order of operations for Laboratory upgrades.
          </p>
          <ul className="space-y-2 text-sm">
            <li className="border-l-2 border-accent-muted/20 pl-3">
              <strong>Early Growth:</strong> Prioritize Research Speed and Construction Speed nodes until they reach Level 10.
            </li>
            <li className="border-l-2 border-accent-muted/20 pl-3">
              <strong>Military Focus:</strong> Concentrate on Infantry Health and Defense before pursuing Archer or Cavalry lethality.
            </li>
            <li className="border-l-2 border-accent-muted/20 pl-3">
              <strong>War Academy (TG 1+):</strong> For F2P players, focus on mastering a single T11 troop type (like Infantry Helios) first.
            </li>
          </ul>
        </Card>

        <Card>
          <h2 className="text-xl font-bold mb-3">Progression Milestones</h2>
          <p className="text-sm text-accent-muted mb-4">
            The Town Center (TC) dictates building levels and the availability of advanced game modes.
          </p>
          <ul className="space-y-2 text-sm">
            <li className="border-l-2 border-accent-muted/20 pl-3">
              <strong>TC 15:</strong> Unlocks Hero Equipment, a primary factor in march strength.
            </li>
            <li className="border-l-2 border-accent-muted/20 pl-3">
              <strong>TC 22 & 25:</strong> Unlocks Lord Equipment (TC 22) and Lord Charms (TC 25) for account-wide stat bonuses.
            </li>
            <li className="border-l-2 border-accent-muted/20 pl-3">
              <strong>TC 30 / Truegold:</strong> Transitions the game into the "Age of Truegold" and T11 troop unlocks.
            </li>
          </ul>
        </Card>
      </div>

      <Card className="bg-accent/5">
        <h2 className="text-lg font-bold mb-2">Training Tip: Promotion Efficiency</h2>
        <p className="text-sm text-accent-muted">
          Promoting troops from T9 to T10 (3,854 points/min) is significantly more efficient for scoring in events than direct T10 training (2,197 points/min). 
          Train lower tiers "naturally" before events, then use speedups for promotion during active event windows.
        </p>
      </Card>
    </div>
  );
}