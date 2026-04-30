import React from "react";
import Card from "@/components/ui/Card";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function EventDetail() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Kingdom of Power (KvK)</h1>
        <Link href="/events">
          <Button variant="secondary">Back to Events</Button>
        </Link>
      </div>

      <Card>
        <h2 className="text-xl font-bold mb-4">Event Overview</h2>
        <p className="text-accent-muted mb-4">
          Kingdom of Power, commonly known as KvK, is a monthly massive conflict where entire kingdoms battle for supremacy across multiple stages. 
          Success requires intense resource hoarding and highly coordinated multi-alliance warfare.
        </p>
        <div className="bg-background-dark p-4 rounded-lg border border-accent-muted/20">
          <p className="text-sm">
            <strong>Server Sync:</strong> All KvK phases and daily score resets operate strictly on the 00:00 UTC schedule.
          </p>
        </div>
      </Card>

      <Card>
        <h2 className="text-xl font-bold mb-4 text-gold">Phase 1: Preparation & Hoarding</h2>
        <p className="text-accent-muted mb-4">
          The foundation of a successful KvK is built in the weeks leading up to the event:
        </p>
        <ul className="list-disc list-inside text-sm space-y-2 text-accent-muted">
          <li>Save all shards, speedups, and Truegold for the Preparation days to maximize the double rewards</li>
          <li>Hoard premium materials including Forgehammers and Mithril specifically for this monthly cycle</li>
          <li>The most efficient path to power involves reaching Town Center 30 (TC 30) before committing heavily to the event</li>
        </ul>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-xl font-bold mb-4 text-accent">A/B Castle Defense</h2>
          <p className="text-accent-muted mb-4">
            Defending territory requires misdirection and split forces:
          </p>
          <ul className="list-disc list-inside text-sm space-y-2 text-accent-muted">
            <li>Distribute your top players across two separate alliances (Alliance A and Alliance B)</li>
            <li>If Alliance A is rallied by the enemy, Alliance B immediately counters</li>
            <li>This dual-threat approach keeps the enemy off balance and prevents them from focusing entirely on one defensive point</li>
          </ul>
        </Card>

        <Card>
          <h2 className="text-xl font-bold mb-4 text-red-400">Enlistment Office Management</h2>
          <p className="text-accent-muted mb-4">
            Troop retention is critical during prolonged KvK engagements:
          </p>
          <ul className="list-disc list-inside text-sm space-y-2 text-accent-muted">
            <li>Heal your wounded troops in small batches</li>
            <li>This prevents the Infirmary from overflowing into the Enlistment Office</li>
            <li>Careful Infirmary management ensures maximum troop recovery, reaching up to 90% retention</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}