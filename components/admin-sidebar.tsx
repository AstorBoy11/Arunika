"use client";

import { useState, createContext, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
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
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const handleNavClick = () => {
        setIsOpen(false);
    };

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
        ${isDark
                    ? "bg-[#1a140e] border-r border-[#3e342b]"
                    : "bg-white border-r border-[#e5ddd5]"
                }
      `}>
                {/* Header Logo with Close Button (Mobile) */}
                <div className="p-6 pb-2 flex items-start justify-between mb-4">
                    <div className="flex flex-col">
                        <Link href="/admin/dashboard" onClick={() => setIsOpen(false)}>
                            <Image
                                src="/logo_sidebar.png"
                                alt="Arunika Logo"
                                width={150}
                                height={50}
                                className="h-10 w-auto object-contain"
                            />
                        </Link>
                        <p className={`text-xs mt-1 ${isDark ? "text-[#9a6c4c]" : "text-[#8b7355]"}`}>Admin Console</p>
                    </div>
                    {/* Close Button - Mobile Only */}
                    <button
                        onClick={() => setIsOpen(false)}
                        className={`md:hidden p-2 rounded-lg transition-colors ${isDark
                            ? "hover:bg-[#3e342b] text-[#b9a89d] hover:text-white"
                            : "hover:bg-[#f5f0eb] text-[#8b7355] hover:text-[#1a140e]"
                            }`}
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
                                    : isDark
                                        ? "hover:bg-[#3e342b] text-[#fcfaf8]/70 hover:text-white"
                                        : "hover:bg-[#f5f0eb] text-[#8b7355] hover:text-[#1a140e]"
                                    }`}
                            >
                                <item.icon size={18} />
                                <span className="font-medium text-sm">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Admin Profile Footer */}
                <div className={`p-4 border-t ${isDark ? "border-[#3e342b]" : "border-[#e5ddd5]"}`}>
                    <Link href="/admin/profile" onClick={() => setIsOpen(false)}>
                        <div className={`flex items-center gap-3 p-2 rounded-xl mb-3 transition-colors border border-transparent ${isDark
                            ? "bg-[#231910] hover:bg-[#2a221b] hover:border-[#3e342b]"
                            : "bg-[#f5f0eb] hover:bg-[#ebe3db] hover:border-[#e5ddd5]"
                            }`}>
                            <div className={`relative h-10 w-10 rounded-full overflow-hidden border ${isDark ? "border-[#3e342b]" : "border-[#e5ddd5]"
                                }`}>
                                <Image
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2GmZQePWPY04wHlVPH7g2QechnIQhqr-oZQY35eO03gOTMRZT0T5GiSUL_P2shWFbkumDQ5nZG9meggW2Ue_5QoK3xIQeiSO6WSq-Vq_UI5-GJnkbAA7mTvlFrsRPvs4ZPqcE-2oI6EGqR0oJe33z1XydzPgbdW-aHPkOeOvJV1xacWdkSfHJu7pRSGJ_8x0tOmrDi6G00Gq7LOwFzNPHhmHf5oydaiE-D6ueg-TdCHj9yQm37IUtDqXdlP-eeKsK6igXmU_1mfFC"
                                    alt="User Profile"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex flex-col overflow-hidden">
                                <p className={`text-sm font-semibold truncate ${isDark ? "text-white" : "text-[#1a140e]"}`}>
                                    Alex Morgan
                                </p>
                            </div>
                        </div>
                    </Link>

                    <button className={`w-full flex items-center justify-center gap-2 h-10 rounded-xl bg-transparent border text-sm font-bold transition-all ${isDark
                        ? "border-[#3e342b] hover:bg-[#231910] hover:text-white text-[#b9a89d]"
                        : "border-[#e5ddd5] hover:bg-[#f5f0eb] hover:text-[#1a140e] text-[#8b7355]"
                        }`}>
                        <LogOut size={18} />
                        <span>Log Out</span>
                    </button>
                </div>
            </aside>
        </>
    );
}
