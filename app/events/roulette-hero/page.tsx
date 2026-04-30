import React from "react";
import Card from "@/components/ui/Card";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function EventDetail() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Roulette Hero</h1>
        <Link href="/events">
          <Button variant="secondary">Back to Events</Button>
        </Link>
      </div>

      <Card>
        <h2 className="text-xl font-bold mb-4">Event Overview</h2>
        <p className="text-accent-muted mb-4">
          Roulette Hero is a bi-weekly PvE event and serves as a primary source for acquiring Mythical (SSR) heroes. 
          Strategic management of Lucky Chips is essential for maximizing shard returns.
        </p>
        <div className="bg-background-dark p-4 rounded-lg border border-accent-muted/20">
          <p className="text-sm">
            <strong>Server Sync:</strong> Daily refreshes and event cycles occur precisely at 00:00 UTC.
          </p>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-xl font-bold mb-4 text-gold">Efficiency & Milestones</h2>
          <p className="text-accent-muted mb-4">
            Maximize your resources by following these specific spin benchmarks:
          </p>
          <ul className="list-disc list-inside text-sm space-y-2 text-accent-muted">
            <li>Always spin in multiples of 10 to receive the discount and maximize Lucky Chips</li>
            <li>Aim for exactly 70 or 120 spins to receive guaranteed bonus shard rewards</li>
            <li>Avoid stopping between milestones, as this yields a lower shards-per-chip ratio</li>
          </ul>
        </Card>

        <Card>
          <h2 className="text-xl font-bold mb-4 text-accent">Chip Conservation</h2>
          <p className="text-accent-muted mb-4">
            Long-term planning is required for meta-defining hero releases:
          </p>
          <ul className="list-disc list-inside text-sm space-y-2 text-accent-muted">
            <li>Free daily chips carry over between events</li>
            <li>Save your chips across several hero generations</li>
            <li>"Dump" your hoarded chips on specific meta-changing heroes to instantly high-star them</li>
          </ul>
        </Card>
      </div>

      <Card>
        <h2 className="text-xl font-bold mb-4">Tactical Advice</h2>
        <p className="text-accent-muted">
          Because heroes are released in specific generations (Gen 1-5), f2p and low-spending players should avoid spending chips on every rotation. 
          Instead, identify the primary hero for your troop type (Infantry, Cavalry, or Archer) and spend only when that hero appears on the wheel.
        </p>
      </Card>
    </div>
  );
}