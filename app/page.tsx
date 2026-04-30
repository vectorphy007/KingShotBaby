import React from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-8 md:gap-12">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">Alliance Command Center</h1>
          <p className="text-sm text-accent-muted mt-2">Welcome back, Commander.</p>
        </div>
        <Link href="/roster/submit">
          <Button className="whitespace-nowrap">Update Stats</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <Card>
          <h2 className="text-lg font-semibold mb-4">Upcoming Events</h2>
          <div className="flex flex-col gap-4">
            <div className="bg-background p-4 rounded-xl border border-slate-700 hover:border-slate-600 transition-colors">
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-accent-blue">Bear Hunt</span>
                <span className="text-sm text-accent-muted">Starts in 2h</span>
              </div>
              <p className="text-xs text-accent-muted">Local: 21:00 (19:00 UTC)</p>
            </div>
            <Link href="/events" className="text-sm text-accent-gold hover:underline font-medium">View all events →</Link>
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold mb-4">Roster Summary</h2>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center border-b border-slate-700 pb-3">
              <span className="text-sm text-accent-muted">Total Members</span>
              <span className="font-semibold">95/100</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-700 pb-3">
              <span className="text-sm text-accent-muted">Needs Review</span>
              <span className="font-semibold text-accent-red">3</span>
            </div>
            <Link href="/roster" className="text-sm text-accent-gold hover:underline font-medium pt-2">Manage roster →</Link>
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold mb-4">Quick Tools</h2>
          <div className="flex flex-col gap-3">
            <Link href="/calculators/bear-hunt">
              <Button variant="secondary" className="w-full text-left text-sm">Bear Hunt Optimizer</Button>
            </Link>
            <Link href="/calculators/championship">
              <Button variant="secondary" className="w-full text-left text-sm">Championship Lanes</Button>
            </Link>
            <Link href="/calculators" className="text-sm text-accent-gold hover:underline font-medium pt-2">All tools →</Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
