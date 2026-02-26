"use client";

import AdminSidebar, { AdminSidebarProvider } from "@/components/admin-sidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AdminSidebarProvider>
            <div className="flex h-screen w-full overflow-hidden font-sans transition-colors duration-300 bg-gray-50 dark:bg-[#120d0a]">
                <AdminSidebar />
                <div className="flex-1 flex flex-col h-full overflow-hidden relative min-w-0">
                    {children}
                </div>
            </div>
        </AdminSidebarProvider>
    );
}
