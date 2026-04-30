import React from "react";
import Link from "next/link";

interface NavbarProps {
  className?: string;
  onMenuClick?: () => void;
}

export default function Navbar({ className = "", onMenuClick }: NavbarProps) {
  return (
    <header className={`bg-secondary border-b border-slate-700 p-4 flex justify-between items-center ${className}`}>
      <Link href="/">
        <h1 className="text-xl font-bold text-accent-gold">Kingshot Command</h1>
      </Link>
      <button 
        onClick={onMenuClick}
        className="p-2 border border-slate-700 rounded-lg hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-gold"
        aria-label="Toggle menu"
      >
        Menu
      </button>
    </header>
  );
}
