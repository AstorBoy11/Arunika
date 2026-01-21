import Header from "@/components/header";
import Sidebar, { SidebarProvider } from "@/components/sidebar";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen bg-[#120d0a] text-[#fcfaf8] overflow-hidden">

        {/* Sidebar - handles its own responsive behavior */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col h-full relative min-w-0">

          {/* Header */}
          <Header />

          {/* Scrollable Content - Hidden scrollbar */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {children}
          </main>

        </div>
      </div>
    </SidebarProvider>
  );
}