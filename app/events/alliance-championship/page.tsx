import React from "react";
import Card from "@/components/ui/Card";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function EventDetail() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Alliance Championship</h1>
        <Link href="/events">
          <Button variant="secondary">Back to Events</Button>
        </Link>
      </div>

      <Card>
        <h2 className="text-xl font-bold mb-4">League Overview</h2>
        <p className="text-accent-muted mb-4">
          The Alliance Championship is a monthly automated battle tournament league. 
          Alliances must allocate exactly 60 members across three distinct battle lanes. 
          Victory is determined by winning two out of the three lanes.
        </p>
        <div className="bg-background-dark p-4 rounded-lg border border-accent-muted/20">
          <p className="text-sm">
            <strong>Server Sync:</strong> Timers and strategies sync to 00:00 UTC.
          </p>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-xl font-bold mb-4 text-gold">The 2-1 Lane Strategy</h2>
          <p className="text-accent-muted mb-4">
            Concentrate overwhelming power into two "Main Lanes" to secure the primary point-generating victories. 
            The third lane should be "sacrificed" using low-power R1/R2 members to absorb enemy hits.
          </p>
          <ul className="list-disc list-inside text-sm space-y-2 text-accent-muted">
            <li>Assign top tanks (e.g., Howard or Gordon) to main lanes</li>
            <li>Place R1/R2 initiates in the sacrifice lane</li>
            <li>Prioritize lane victory over individual power</li>
          </ul>
        </Card>

        <Card>
          <h2 className="text-xl font-bold mb-4 text-accent">Optimal Formations</h2>
          <p className="text-accent-muted mb-4">
            The standard starting formation for balanced defense and offense follows a 5:2:3 ratio:
          </p>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm border-b border-accent-muted/10 pb-1">
              <span>Infantry (Frontline Tanks)</span>
              <span className="font-bold text-white">50%</span>
            </div>
            <div className="flex justify-between text-sm border-b border-accent-muted/10 pb-1">
              <span>Cavalry (Midline Flex)</span>
              <span className="font-bold text-white">20%</span>
            </div>
            <div className="flex justify-between text-sm border-b border-accent-muted/10 pb-1">
              <span>Archers (Backline Damage)</span>
              <span className="font-bold text-white">30%</span>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <h2 className="text-xl font-bold mb-4">Scouting & Counter-Play</h2>
        <p className="text-accent-muted mb-4">
          Success depends on analyzing the enemy's previous round ratios. Combat damage scales 
          multiplicatively with Lethality stats, and troop count follows a square-root scaling, making quality 
          over quantity essential.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-3 bg-red-900/10 border border-red-500/20 rounded">
            <h3 className="font-bold text-red-400 mb-1">If Enemy is Infantry-Heavy:</h3>
            <p className="text-sm">Shift to a 20/20/60 Archer-focused counter-march to maximize damage output.</p>
          </div>
          <div className="p-3 bg-blue-900/10 border border-blue-500/20 rounded">
            <h3 className="font-bold text-blue-400 mb-1">Combat Formula:</h3>
            <p className="text-sm italic">Kills = √Troops × (Attack × Lethality) / (Enemy Defense × Enemy Health) × SkillMod</p>
          </div>
        </div>
      </Card>
    </div>
  );
}