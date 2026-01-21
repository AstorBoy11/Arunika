"use client";

import AdminSidebar, { AdminSidebarProvider } from "@/components/admin-sidebar";
import { useTheme } from "@/context/ThemeContext";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AdminSidebarProvider>
            <AdminLayoutContent>{children}</AdminLayoutContent>
        </AdminSidebarProvider>
    );
}

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <div className={`flex h-screen w-full overflow-hidden font-sans transition-colors duration-300 ${isDark ? "bg-[#231910]" : "bg-[#f8f6f4]"}`}>
            <AdminSidebar />
            <div className="flex-1 flex flex-col h-full overflow-hidden relative min-w-0">
                {children}
            </div>
        </div>
    );
}
