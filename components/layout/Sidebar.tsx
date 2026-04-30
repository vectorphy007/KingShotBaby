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

  // Mobile overlay classes
  const mobileClasses = isOpen 
    ? "fixed inset-y-0 left-0 z-40 w-64 overflow-y-auto" 
    : "hidden";

  return (
    <aside className={`bg-secondary border-r border-slate-700 flex flex-col p-4 md:relative ${className} ${mobileClasses}`}>
      <div className="mb-8">
        <h1 className="text-xl font-bold text-accent-gold">Kingshot Command</h1>
      </div>
      <nav className="flex flex-col gap-2">
        {links.map((link) => (
          <Link
            key={link.path}
            href={link.path}
            onClick={onClose}
            className="px-4 py-2 rounded-lg hover:bg-card text-foreground transition-colors"
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
