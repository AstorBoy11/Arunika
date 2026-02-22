"use client";

import Header from "@/components/header";
import Sidebar, { SidebarProvider } from "@/components/sidebar";
import { useTheme } from "@/context/ThemeContext";

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  return (
    <div className={`flex h-screen overflow-hidden transition-colors duration-300 ${theme === "dark"
        ? "bg-[#120d0a] text-[#fcfaf8]"
        : "bg-[#f5f0eb] text-[#1a140e]"
      }`}>

      {/* Sidebar - handles its own responsive behavior */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full relative min-w-0">

        {/* Header */}
        <Header />

        {/* Scrollable Content - Hidden scrollbar */}
        <main className={`flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] transition-colors duration-300 ${theme === "dark" ? "bg-[#120d0a]" : "bg-[#f5f0eb]"
          }`}>
          {children}
        </main>

      </div>
    </div>
  );
}

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <LayoutContent>{children}</LayoutContent>
    </SidebarProvider>
  );
}