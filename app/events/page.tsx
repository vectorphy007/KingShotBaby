import React from "react";
import Link from "next/link";
import Card from "@/components/ui/Card";

export default function EventsHub() {
  const events = [
    { 
      name: "Bear Hunt", 
      path: "/events/bear-hunt", 
      desc: "Maximize alliance boss damage through Archer-focused ratios and unique hero skill stacking." 
    },
    { 
      name: "Viking Vengeance", 
      path: "/events/viking-vengeance", 
      desc: "Coordinate alliance defenses using the 'Empty City' rule and HQ recall tactics for 20 waves." 
    },
    { 
      name: "Strongest Governor", 
      path: "/events/strongest-governor", 
      desc: "Analyze point yields for construction, training, and hero development across the seven-day cycle." 
    },
    { 
      name: "Alliance Championship", 
      path: "/events/alliance-championship", 
      desc: "Optimize 2-1 lane distributions and troop ratios for the monthly automated battlefield." 
    },
    { 
      name: "Kingdom of Power (KvK)", 
      path: "/events/kvk", 
      desc: "Plan for monthly multi-stage server warfare, hoarding strategies, and A/B castle defense." 
    },
    { 
      name: "Desert Trial", 
      path: "/events/desert-trial", 
      desc: "Acquire and develop Diana to permanently reduce stamina consumption for all daily city tasks." 
    },
    { 
      name: "Roulette Hero", 
      path: "/events/roulette-hero", 
      desc: "Optimize spin efficiency and chip conservation for Mythical (SSR) hero shard acquisition." 
    },
    { 
      name: "Eternity's Reach", 
      path: "/events/eternitys-reach", 
      desc: "Master the 30-minute battlefield through initial XP rushes and high-frequency 'Vein Tapping'." 
    }
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="border-b border-accent-muted/20 pb-4">
        <h1 className="text-3xl font-bold">Event Intelligence Center</h1>
        <p className="text-accent-muted mt-2">
          Kingshot operates on a four-week cycle alternating between PvP and PvE focuses. 
          All official event cycles and resets are synchronized to <strong>00:00 UTC</strong>. 
          The platform automatically converts these timestamps to your local timezone to avoid drift and scheduling errors.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((ev) => (
          <Link key={ev.path} href={ev.path}>
            <Card className="hover:border-gold transition-colors cursor-pointer h-full group">
              <h2 className="text-lg font-bold text-gold group-hover:text-white transition-colors">{ev.name}</h2>
              <p className="text-sm text-accent-muted mt-2 leading-relaxed">{ev.desc}</p>
            </Card>
          </Link>
        ))}
      </div>

      <Card className="bg-accent/5 border-dashed">
        <h3 className="font-bold text-accent mb-2">Tactical Scheduling Note</h3>
        <p className="text-sm text-accent-muted">
          Successful alliance coordination depends on identifying peak concurrency. 
          Check the <strong>Availability Heatmap</strong> on the Dashboard to coordinate massive events like the 
          Tri-Alliance Clash or Castle Battle based on your members' active hours.
        </p>
      </Card>
    </div>
  );
}