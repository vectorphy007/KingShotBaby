import React from "react";
import Card from "@/components/ui/Card";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function EventDetail() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Viking Vengeance</h1>
        <Link href="/events">
          <Button variant="secondary">Back to Events</Button>
        </Link>
      </div>

      <Card>
        <h2 className="text-xl font-bold mb-4">Event Mechanics</h2>
        <p className="text-accent-muted mb-4">
          Viking Vengeance is a bi-weekly alliance event where members must defend against 20 waves of Viking raids. 
          The primary goal of the event is point maximization through coordinated support.
        </p>
        <div className="bg-background-dark p-4 rounded-lg border border-accent-muted/20">
          <p className="text-sm">
            <strong>Server Sync:</strong> Daily missions and event resets are governed by the 00:00 UTC schedule.
          </p>
        </div>
      </Card>

      <Card>
        <h2 className="text-xl font-bold mb-4 text-gold">The "Empty City" Rule</h2>
        <p className="text-accent-muted mb-4">
          To maximize total alliance score, leadership must enforce the "Empty City" rule:
        </p>
        <ul className="list-disc list-inside text-sm space-y-2 text-accent-muted">
          <li>Send all your troops out to reinforce your allies' cities</li>
          <li>Do not keep troops at home to defend your own city</li>
          <li>This ensures the reinforcers get the kill points while the city owner receives the defense points</li>
          <li>Executing this effectively doubles the alliance’s total score</li>
        </ul>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-xl font-bold mb-4 text-accent">Target Online Members</h2>
          <p className="text-accent-muted mb-4">
            Certain waves change targeting behavior:
          </p>
          <ul className="list-disc list-inside text-sm space-y-2 text-accent-muted">
            <li>Waves 7, 14, and 17 target only online players</li>
            <li>Prioritize reinforcing active, online members during these specific waves</li>
            <li>This maintains a 100% kill rate across the alliance</li>
          </ul>
        </Card>

        <Card>
          <h2 className="text-xl font-bold mb-4 text-red-400">The HQ Recall</h2>
          <p className="text-accent-muted mb-4">
            The Alliance Headquarters requires heavy defense during milestone waves:
          </p>
          <ul className="list-disc list-inside text-sm space-y-2 text-accent-muted">
            <li>Recall the strongest marches immediately after Waves 9 and 19 conclude</li>
            <li>Send these top-tier marches to defend the Alliance HQ</li>
            <li>This ensures the HQ is protected during the massive attacks on Waves 10 and 20</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}