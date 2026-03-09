"use client";

import { useState, createContext, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ThemeAwareLogo from "@/components/theme-aware-logo";
import {
    LayoutDashboard,
    BarChart3,
    Package,
    Settings,
    Coffee,
    X,
    LogOut
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

// --- CONTEXT SETUP ---
export const AdminSidebarContext = createContext<{
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
} | null>(null);

export function AdminSidebarProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <AdminSidebarContext.Provider value={{ isOpen, setIsOpen }}>
            {children}
        </AdminSidebarContext.Provider>
    );
}

export function useAdminSidebar() {
    const context = useContext(AdminSidebarContext);
    if (!context) {
        throw new Error("useAdminSidebar must be used within AdminSidebarProvider");
    }
    return context;
}

const adminNavItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Reports", href: "/admin/report", icon: BarChart3 },
    { name: "Inventory", href: "/admin/inventory", icon: Package },
    { name: "Product Management", href: "/admin/product_management", icon: Coffee },
    { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
    const { isOpen, setIsOpen } = useAdminSidebar();
    const pathname = usePathname();
    const { mounted } = useTheme();

    const handleNavClick = () => {
        setIsOpen(false);
    };

    // Avoid hydration flicker — render a stable placeholder until client mounts
    if (!mounted) {
        return (
            <aside className="fixed md:relative z-50 w-64 flex flex-col h-full shrink-0 bg-white border-r border-[#e5ddd5] -translate-x-full md:translate-x-0 transition-all duration-300 ease-in-out" />
        );
    }

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
        fixed md:relative z-50
        w-64 flex flex-col h-full shrink-0
        transition-all duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        bg-white dark:bg-[#1a140e] border-r border-[#e5ddd5] dark:border-[#3e342b]
      `}>
                {/* Header Logo with Close Button (Mobile) */}
                <div className="pl-6 pt-2 flex items-start justify-between mb-2">
                    <div className="flex flex-col">
                        <Link href="/admin/dashboard" onClick={() => setIsOpen(false)}>
                            <ThemeAwareLogo
                                width={150}
                                height={50}
                                className="h-15 w-auto object-contain"
                                priority
                            />
                        </Link>
                        <p className="text-xs mt-1 text-[#8b7355] dark:text-[#9a6c4c]">Admin Page</p>
                    </div>
                    {/* Close Button - Mobile Only */}
                    <button
                        onClick={() => setIsOpen(false)}
                        className="md:hidden p-2 rounded-lg transition-colors hover:bg-[#f5f0eb] text-[#8b7355] hover:text-[#1a140e] dark:hover:bg-[#3e342b] dark:text-[#b9a89d] dark:hover:text-white"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 flex flex-col gap-2 mt-4 overflow-y-auto">
                    {adminNavItems.map((item) => {
                        const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={handleNavClick}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                    ? "bg-[#ec6d13] text-white shadow-lg shadow-[#ec6d13]/20"
                                    : "hover:bg-[#f5f0eb] text-[#8b7355] hover:text-[#1a140e] dark:hover:bg-[#3e342b] dark:text-[#fcfaf8]/70 dark:hover:text-white"
                                    }`}
                            >
                                <item.icon size={18} />
                                <span className="font-medium text-sm">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Admin Profile Footer */}
                <div className="p-4 border-t border-[#e5ddd5] dark:border-[#3e342b]">
                    <Link href="/admin/profile" onClick={() => setIsOpen(false)}>
                        <div className="flex items-center gap-3 p-2 rounded-xl mb-3 transition-colors border border-transparent bg-[#f5f0eb] hover:bg-[#ebe3db] hover:border-[#e5ddd5] dark:bg-[#231910] dark:hover:bg-[#2a221b] dark:hover:border-[#3e342b]">
                            <div className="relative h-10 w-10 rounded-full overflow-hidden border border-[#e5ddd5] dark:border-[#3e342b]">
                                <Image
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2GmZQePWPY04wHlVPH7g2QechnIQhqr-oZQY35eO03gOTMRZT0T5GiSUL_P2shWFbkumDQ5nZG9meggW2Ue_5QoK3xIQeiSO6WSq-Vq_UI5-GJnkbAA7mTvlFrsRPvs4ZPqcE-2oI6EGqR0oJe33z1XydzPgbdW-aHPkOeOvJV1xacWdkSfHJu7pRSGJ_8x0tOmrDi6G00Gq7LOwFzNPHhmHf5oydaiE-D6ueg-TdCHj9yQm37IUtDqXdlP-eeKsK6igXmU_1mfFC"
                                    alt="User Profile"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex flex-col overflow-hidden">
                                <p className="text-sm font-semibold truncate text-[#1a140e] dark:text-white">
                                    Alex Morgan
                                </p>
                            </div>
                        </div>
                    </Link>

                    <button className="w-full flex items-center justify-center gap-2 h-10 rounded-xl bg-transparent border text-sm font-bold transition-all border-[#e5ddd5] hover:bg-[#f5f0eb] hover:text-[#1a140e] text-[#8b7355] dark:border-[#3e342b] dark:hover:bg-[#231910] dark:hover:text-white dark:text-[#b9a89d]">
                        <LogOut size={18} />
                        <span>Log Out</span>
                    </button>
                </div>
            </aside>
        </>
    );
}
