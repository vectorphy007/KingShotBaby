import React from "react";
import Card from "@/components/ui/Card";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function EventDetail() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Desert Trial</h1>
        <Link href="/events">
          <Button variant="secondary">Back to Events</Button>
        </Link>
      </div>

      <Card>
        <h2 className="text-xl font-bold mb-4">Event Overview</h2>
        <p className="text-accent-muted mb-4">
          Desert Trial is a bi-weekly PvE event centered around the acquisition and development of the hero Diana. 
          Success in this event provides long-term benefits for city stamina management.
        </p>
        <div className="bg-background-dark p-4 rounded-lg border border-accent-muted/20">
          <p className="text-sm">
            <strong>Timing:</strong> Daily missions and event resets are synchronized to 00:00 UTC.
          </p>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-xl font-bold mb-4 text-gold">Mission Requirements</h2>
          <p className="text-accent-muted mb-4">
            Mission credit for Dreadwolves is restricted based on rally participation:
          </p>
          <ul className="list-disc list-inside text-sm space-y-2 text-accent-muted">
            <li>You must initiate exactly 10 rallies against Dreadwolves for full mission credit</li>
            <li>Simply joining an alliance member's rally does not count toward your personal mission progression</li>
            <li>Ensure you have sufficient stamina reserved for these 10 manual initiations</li>
          </ul>
        </Card>

        <Card>
          <h2 className="text-xl font-bold mb-4 text-accent">Diana Utility & Shards</h2>
          <p className="text-accent-muted mb-4">
            Diana is a critical utility hero for active players:
          </p>
          <ul className="list-disc list-inside text-sm space-y-2 text-accent-muted">
            <li>Focus entirely on her skills first, as they provide a permanent reduction in stamina consumption for the rest of the game</li>
            <li>Once Diana reaches 5-star status, continue to use extra stamina to hunt additional shards</li>
            <li>Surplus shards acquired after maxing her stars can be traded for "Champagne Tickets"</li>
          </ul>
        </Card>
      </div>

      <Card>
        <h2 className="text-xl font-bold mb-4">The Stamina Loop</h2>
        <p className="text-accent-muted">
          Efficient use of stamina during Desert Trial allows players to maximize their hero growth while preparing for future events. 
          Because Diana reduces the cost of stamina-heavy tasks like hunting or rallies, she should be a priority for all F2P and low-spending players seeking to optimize their daily gameplay loops.
        </p>
      </Card>
    </div>
  );
}