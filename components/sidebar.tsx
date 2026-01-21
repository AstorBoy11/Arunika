"use client";

import { useState, createContext, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    ShoppingBag,
    Package,
    Settings,
    LogOut,
    X
} from "lucide-react";

// Context untuk share state sidebar antara Sidebar dan Header
export const SidebarContext = createContext<{
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
} | null>(null);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
            {children}
        </SidebarContext.Provider>
    );
}

export function useSidebar() {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebar must be used within SidebarProvider");
    }
    return context;
}

export default function Sidebar() {
    const { isOpen, setIsOpen } = useSidebar();

    return (
        <>
            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-30"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed lg:static inset-y-0 left-0 z-40
                w-72 h-full flex flex-col bg-[#1a140e] border-r border-[#3e342b] flex-shrink-0
                transform transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                {/* Sidebar Header */}
                <div className="p-6 pb-2">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <Image
                                src="/logo_sidebar.png"
                                alt="Arunika Logo"
                                width={665}
                                height={484}
                                className="h-15 w-auto object-contain transform group-hover:scale-105 transition-transform"
                            />
                        </div>
                        {/* Close button - Only visible on mobile when sidebar is open */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="lg:hidden p-2 rounded-lg hover:bg-[#2a221b] text-[#b9a89d] hover:text-white transition-all"
                            aria-label="Close menu"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* Navigation Menu */}
                <nav className="flex-1 flex flex-col gap-2 px-4 overflow-y-auto">
                    <Link
                        href="/shop"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#ec6d13]/10 border border-[#ec6d13]/20 text-[#ec6d13] group transition-all"
                        onClick={() => setIsOpen(false)}
                    >
                        <ShoppingBag size={20} />
                        <span className="text-sm font-semibold">Shop</span>
                    </Link>

                    <Link
                        href="/user/orders"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#2a221b] text-[#b9a89d] hover:text-white transition-all"
                        onClick={() => setIsOpen(false)}
                    >
                        <Package size={20} />
                        <span className="text-sm font-medium">My Orders</span>
                    </Link>

                    <div className="my-2 border-t border-[#3e342b] mx-2"></div>

                    <Link
                        href="/user/settings"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#2a221b] text-[#b9a89d] hover:text-white transition-all"
                        onClick={() => setIsOpen(false)}
                    >
                        <Settings size={20} />
                        <span className="text-sm font-medium">Settings</span>
                    </Link>
                </nav>

                {/* User Footer */}
                <div className="p-4 border-t border-[#3e342b]">
                    <div className="flex items-center gap-3 p-2 rounded-xl bg-[#231910] mb-3">
                        <div className="relative h-10 w-10 rounded-full overflow-hidden border border-[#3e342b]">
                            <Image
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2GmZQePWPY04wHlVPH7g2QechnIQhqr-oZQY35eO03gOTMRZT0T5GiSUL_P2shWFbkumDQ5nZG9meggW2Ue_5QoK3xIQeiSO6WSq-Vq_UI5-GJnkbAA7mTvlFrsRPvs4ZPqcE-2oI6EGqR0oJe33z1XydzPgbdW-aHPkOeOvJV1xacWdkSfHJu7pRSGJ_8x0tOmrDi6G00Gq7LOwFzNPHhmHf5oydaiE-D6ueg-TdCHj9yQm37IUtDqXdlP-eeKsK6igXmU_1mfFC"
                                alt="User Profile"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="flex flex-col overflow-hidden">
                            <p className="text-white text-sm font-semibold truncate">Alex Morgan</p>
                            <p className="text-[#b9a89d] text-xs truncate">Gold Member</p>
                        </div>
                    </div>
                    <button className="w-full flex items-center justify-center gap-2 h-10 rounded-xl bg-transparent border border-[#3e342b] hover:bg-[#231910] hover:text-white text-[#b9a89d] text-sm font-bold transition-all">
                        <LogOut size={18} />
                        <span>Log Out</span>
                    </button>
                </div>
            </aside>
        </>
    );
}