import React from "react";
import Link from "next/link";

interface NavbarProps {
  className?: string;
  onMenuClick?: () => void;
}

export default function Navbar({ className = "", onMenuClick }: NavbarProps) {
  return (
    <header className={`bg-secondary border-b border-slate-700 px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center md:hidden ${className}`}>
      <Link href="/">
        <h1 className="text-2xl font-semibold tracking-tight text-accent-gold hover:text-opacity-80 transition-opacity">Kingshot Command</h1>
      </Link>
      <button 
        onClick={onMenuClick}
        className="px-4 py-2 border border-slate-700 rounded-xl hover:bg-slate-800/60 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-gold/50 text-sm font-medium"
        aria-label="Toggle menu"
      >
        Menu
      </button>
    </header>
  );
}
