"use client";

import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { useState, useEffect } from "react";

// Note: Metadata export commented out since this is now a client component
// Metadata should be set in a separate root layout or via Next.js routing  
// export const metadata: Metadata = { ... };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => setSidebarOpen(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Prevent background scroll when mobile sidebar is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = sidebarOpen ? "hidden" : prev;
    return () => {
      document.body.style.overflow = prev;
    };
  }, [sidebarOpen]);

  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex overflow-x-hidden bg-background text-foreground">
        {/* Sidebar: fixed/slide-in on mobile, static on desktop */}
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={closeSidebar}
        />
        
        {/* Mobile backdrop overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden" 
            onClick={closeSidebar}
            aria-hidden="true"
          />
        )}
        
        {/* Main content area */}
        <div className="flex flex-col flex-1 min-w-0">
          <Navbar onMenuClick={toggleSidebar} />
          <main className="flex-1 w-full min-h-0 overflow-x-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
