import React from "react";
import Card from "@/components/ui/Card";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function EventDetail() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Bear Hunt / Pitfall</h1>
        <Link href="/events">
          <Button variant="secondary">Back to Events</Button>
        </Link>
      </div>

      <Card>
        <h2 className="text-xl font-bold mb-4">Event Mechanics</h2>
        <p className="text-accent-muted mb-4">
          Bear Hunt is a recurring alliance event featuring a 30-minute window to deal maximum damage to a static, non-attacking boss. 
          Success relies on optimizing troop ratios and stacking multiplicative hero buffs.
        </p>
        <div className="bg-background-dark p-4 rounded-lg border border-accent-muted/20">
          <p className="text-sm">
            <strong>Server Timing:</strong> All event phases and resets are synchronized to 00:00 UTC.
          </p>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-xl font-bold mb-4 text-accent">Archer-Focus Ratios</h2>
          <p className="text-accent-muted mb-4">
            Archers provide the highest DPS for this event. As the kingdom progresses through hero generations, the optimal troop ratio shifts heavily toward backline damage:
          </p>
          <div className="space-y-3">
            <div className="p-3 bg-background-dark rounded border border-accent-muted/10">
              <span className="text-xs uppercase text-gold font-bold">Generation 1</span>
              <div className="flex justify-between text-sm mt-1">
                <span>10% Inf / 30% Cav / 60% Arc</span>
              </div>
            </div>
            <div className="p-3 bg-background-dark rounded border border-accent-muted/10">
              <span className="text-xs uppercase text-gold font-bold">Generation 4+</span>
              <div className="flex justify-between text-sm mt-1">
                <span>1% Inf / 10% Cav / 89% Arc</span>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-bold mb-4 text-gold">The "Rule of 4"</h2>
          <p className="text-accent-muted mb-4">
            Rally mechanics dictate that only the top 4 joiner skills are applied to the march. 
            Joiners only contribute the first expedition skill of their leftmost hero.
          </p>
          <ul className="list-disc list-inside text-sm space-y-2 text-accent-muted">
            <li>Ensure the 4 active joiner skills are unique (e.g., Chenko, Amadeus, Yeonwoo)</li>
            <li>Avoid stacking identical hero IDs, as buffs are additive or overwritten rather than multiplicative</li>
            <li>Prioritize S-Tier joiners with guaranteed Lethality modifiers</li>
          </ul>
        </Card>
      </div>

      <Card>
        <h2 className="text-xl font-bold mb-4">Alliance Coordination</h2>
        <p className="text-accent-muted mb-4">
          To maximize total alliance score, leadership must manage rally density and composition.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-accent/5 border border-accent/20 rounded-lg">
            <h3 className="font-bold text-accent mb-2">Minimal Rally Density</h3>
            <p className="text-sm text-accent-muted">
              Keep fewer rallies open simultaneously to ensure every rally is filled to maximum capacity with high-level joiner buffs.
            </p>
          </div>
          <div className="p-4 bg-accent/5 border border-accent/20 rounded-lg">
            <h3 className="font-bold text-accent mb-2">Multiplicative Compounding</h3>
            <p className="text-sm text-accent-muted">
              Damage compounds most effectively when mixing Lethality buffs (e.g., Chenko) with Attack buffs (e.g., Amane).
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}