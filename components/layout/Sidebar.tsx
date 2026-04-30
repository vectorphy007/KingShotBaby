import React from "react";
import Link from "next/link";

interface SidebarProps {
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ className = "", isOpen = false, onClose }: SidebarProps) {
  const links = [
    { name: "Dashboard", path: "/" },
    { name: "Roster Hub", path: "/roster" },
    { name: "Events Center", path: "/events" },
    { name: "Calculators", path: "/calculators" },
    { name: "Guides", path: "/guides" },
    { name: "Admin", path: "/admin" },
  ];

  return (
    <aside 
      className={`
        fixed top-0 left-0 h-full w-72 bg-secondary border-r border-slate-700 
        flex flex-col px-4 sm:px-6 py-8 z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:h-auto md:w-64 md:flex
        md:flex-shrink-0 overflow-y-auto
        ${className}
      `}
    >
      {/* Close button - mobile only */}
      <button
        onClick={onClose}
        className="md:hidden absolute top-4 right-4 p-2 hover:bg-slate-700/40 rounded-lg transition-colors"
        aria-label="Close sidebar"
      >
        <svg 
          className="w-6 h-6 text-foreground" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="mb-12">
        <h1 className="text-2xl font-semibold tracking-tight text-accent-gold">Kingshot</h1>
        <p className="text-xs text-accent-muted mt-1">Alliance Command</p>
      </div>
      <nav className="flex flex-col gap-2">
        {links.map((link) => (
          <Link
            key={link.path}
            href={link.path}
            onClick={onClose}
            className="px-4 py-3 rounded-xl hover:bg-slate-700/60 text-foreground transition-all duration-200 text-sm font-medium hover:text-accent-gold"
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
