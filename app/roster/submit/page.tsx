"use client";

import React, { useState } from "react";

/**
 * PERSONNEL SUBMISSION FORM
 * Styled with Luxury Tech / Military Intelligence aesthetics.
 * Features Gold-Orange accents and high-contrast dark elements.
 */
export default function SubmitStatsPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; content: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (res.ok) {
        setMessage({ type: "success", content: result.message });
        (e.target as HTMLFormElement).reset();
      } else {
        setMessage({ type: "error", content: result.error || "Submission failed." });
      }
    } catch (err) {
      setMessage({ type: "error", content: "Connection error. Please check your signal." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-3xl mx-auto py-8 md:py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-2">
          Personnel <span className="text-accent-gold">Data Entry</span>
        </h1>
        <p className="text-accent-muted text-sm">Update your combat readiness for tactical assignment.</p>
      </div>

      {/* Main Form */}
      <form 
        onSubmit={handleSubmit} 
        className="space-y-6 bg-secondary border border-slate-700 p-8 md:p-10 rounded-2xl shadow-md"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name Input */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-foreground">Name</label>
            <input 
              name="name" 
              required 
              autoComplete="off"
              className="bg-background border border-slate-700 px-4 py-3 rounded-xl text-foreground focus:ring-2 focus:ring-accent-gold/50 focus:border-accent-gold outline-none transition-all placeholder:text-accent-muted" 
              placeholder="e.g. your name" 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* TC Level */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-foreground">Town Center</label>
            <input 
              name="townCenter" 
              type="number" 
              required 
              className="bg-background border border-slate-700 px-4 py-3 rounded-xl text-foreground focus:ring-2 focus:ring-accent-gold/50 focus:border-accent-gold outline-none transition-all placeholder:text-accent-muted" 
              placeholder="24" 
            />
          </div>
          {/* Rally Capacity */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-foreground">Rally Cap</label>
            <input 
              name="rallyCap" 
              required 
              className="bg-background border border-slate-700 px-4 py-3 rounded-xl text-foreground focus:ring-2 focus:ring-accent-gold/50 focus:border-accent-gold outline-none transition-all placeholder:text-accent-muted" 
              placeholder="225K" 
            />
          </div>
        </div>

        {/* Tactical Sub-fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-slate-700">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-foreground">Deployment Cap</label>
            <input name="deploymentCap" required className="bg-background border border-slate-700 px-4 py-3 rounded-xl text-foreground text-sm focus:ring-2 focus:ring-accent-gold/50 focus:border-accent-gold outline-none transition-all placeholder:text-accent-muted" placeholder="110K" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-foreground">Highest Tier</label>
            <input name="highestTier" required className="bg-background border border-slate-700 px-4 py-3 rounded-xl text-foreground text-sm focus:ring-2 focus:ring-accent-gold/50 focus:border-accent-gold outline-none transition-all placeholder:text-accent-muted" placeholder="T10" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-foreground">Total Troops</label>
            <input name="totalTroops" required className="bg-background border border-slate-700 px-4 py-3 rounded-xl text-foreground text-sm focus:ring-2 focus:ring-accent-gold/50 focus:border-accent-gold outline-none transition-all placeholder:text-accent-muted" placeholder="1.2M" />
          </div>
        </div>

        {/* Action Button */}
        <button 
          disabled={loading} 
          className="w-full mt-8 bg-accent-gold hover:bg-accent-gold/90 text-black font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:scale-100"
        >
          {loading ? "Transmitting..." : "Submit Combat Data"}
        </button>

        {/* Status Message Display */}
        {message && (
          <div className={`text-center p-4 rounded-xl border text-sm font-medium ${
            message.type === "success" 
              ? "bg-green-500/10 border-green-500/30 text-green-400" 
              : "bg-red-500/10 border-red-500/30 text-red-400"
          }`}>
            {message.content}
          </div>
        )}
      </form>

      <p className="mt-8 text-center text-accent-muted text-xs">
        All submissions require admin approval before roster update.
      </p>
    </section>
  );
}