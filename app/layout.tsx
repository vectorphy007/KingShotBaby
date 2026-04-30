"use client";

import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { useState } from "react";

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

  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col md:flex-row bg-background text-foreground overflow-x-hidden">
        {/* Sidebar: desktop inline, mobile overlay */}
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={closeSidebar}
          className="hidden md:flex w-64 flex-shrink-0" 
        />
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/40 z-30 md:hidden" 
            onClick={closeSidebar}
            aria-hidden="true"
          />
        )}
        
        <div className="flex flex-col flex-1 min-w-0">
          <Navbar className="md:hidden" onMenuClick={toggleSidebar} />
          <main className="flex-1 p-4 md:p-8 overflow-auto overflow-x-hidden w-full">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
