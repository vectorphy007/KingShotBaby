import React from "react";
import Card from "@/components/ui/Card";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function EventDetail() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Strongest Governor</h1>
        <Link href="/events">
          <Button variant="secondary">Back to Events</Button>
        </Link>
      </div>

      <Card>
        <h2 className="text-xl font-bold mb-4">Event Mechanics</h2>
        <p className="text-accent-muted mb-4">
          The Strongest Governor is a demanding seven-day event that rotates daily through specific development and combat themes. 
          Success depends on hoarding resources for weeks and deploying them only during high-yield windows.
        </p>
        <div className="bg-background-dark p-4 rounded-lg border border-accent-muted/20">
          <p className="text-sm">
            <strong>Server Sync:</strong> Daily phase transitions occur precisely at 00:00 UTC.
          </p>
        </div>
      </Card>

      <Card>
        <h2 className="text-xl font-bold mb-4">Daily Themes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div className="p-3 border border-accent-muted/20 rounded">
            <span className="font-bold text-accent">Day 1:</span> City Construction
          </div>
          <div className="p-3 border border-accent-muted/20 rounded">
            <span className="font-bold text-accent">Day 2:</span> Hero Development
          </div>
          <div className="p-3 border border-accent-muted/20 rounded">
            <span className="font-bold text-accent">Day 3:</span> Basic Skill Up
          </div>
          <div className="p-3 border border-accent-muted/20 rounded">
            <span className="font-bold text-accent">Day 4:</span> Combat Training
          </div>
          <div className="p-3 border border-accent-muted/20 rounded">
            <span className="font-bold text-accent">Day 5:</span> Gathering
          </div>
          <div className="p-3 border border-accent-muted/20 rounded">
            <span className="font-bold text-accent text-gold">Day 6 & 7:</span> Rush Job
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="text-xl font-bold mb-4">Point Values</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="border-b border-accent-muted/20">
                <th className="py-2 px-4 font-bold text-accent">Action</th>
                <th className="py-2 px-4 font-bold text-accent">Points</th>
                <th className="py-2 px-4 font-bold text-accent">Best Day</th>
              </tr>
            </thead>
            <tbody className="text-accent-muted">
              <tr className="border-b border-accent-muted/10">
                <td className="py-2 px-4">Upgrading buildings (Truegold)</td>
                <td className="py-2 px-4">2,000 / unit</td>
                <td className="py-2 px-4">Day 1 or 6</td>
              </tr>
              <tr className="border-b border-accent-muted/10">
                <td className="py-2 px-4">Using Mythic Hero Shards</td>
                <td className="py-2 px-4">3,040 / each</td>
                <td className="py-2 px-4">Day 2 or 7</td>
              </tr>
              <tr className="border-b border-accent-muted/10">
                <td className="py-2 px-4">Using Advanced Taming Marks</td>
                <td className="py-2 px-4">15,000 / each</td>
                <td className="py-2 px-4">Day 3 or 5</td>
              </tr>
              <tr className="border-b border-accent-muted/10">
                <td className="py-2 px-4">Using 1m Construction Speedup</td>
                <td className="py-2 px-4">30 / minute</td>
                <td className="py-2 px-4">Day 1</td>
              </tr>
              <tr className="border-b border-accent-muted/10">
                <td className="py-2 px-4">Training Level 10 Troops</td>
                <td className="py-2 px-4">39 / each</td>
                <td className="py-2 px-4">Day 4 or 6</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-xl font-bold mb-4 text-accent">Promotion Efficiency</h2>
          <p className="text-sm text-accent-muted leading-relaxed">
            Promoting troops is significantly more efficient for point generation than direct training because the time cost is reduced while you receive the net point gain of the final tier. 
            Expert advice suggests training T9 troops "naturally" before the event starts, then using speedups to promote them to T10 during the combat training phase.
          </p>
        </Card>

        <Card>
          <h2 className="text-xl font-bold mb-4 text-gold">The "Rush Job" Phase</h2>
          <p className="text-sm text-accent-muted leading-relaxed">
            The final "Rush Job" phase often acts as a catch-all where multiple scoring actions are active simultaneously. 
            Calculate precisely if you possess enough resources to breach the top 10 leaderboard before wasting your hoard on a futile attempt.
          </p>
        </Card>
      </div>
    </div>
  );
}