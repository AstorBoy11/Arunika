"use client";

import { useState, createContext, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import logoSidebar from "@/public/logo_sidebar.png";
import {
  ShoppingBag,
  Settings,
  LogOut,
  X,
  ShoppingCart
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

// --- CONTEXT SETUP ---
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

// --- MAIN COMPONENT ---
export default function Sidebar({ userRole = "USER" }: { userRole?: string }) {
  const { isOpen, setIsOpen } = useSidebar();
  const pathname = usePathname();
  const { theme } = useTheme();

  const isDark = theme === "dark";

  const navItems = [
    {
      name: "Shop",
      href: "/user/dashboard",
      icon: ShoppingBag
    },
    {
      name: "Cart",
      href: "/user/cart",
      icon: ShoppingCart
    },
    {
      name: "Settings",
      href: "/user/settings",
      icon: Settings
    },
  ];

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
        w-72 h-full flex flex-col flex-shrink-0
        transform transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${isDark
          ? "bg-[#1a140e] border-r border-[#3e342b]"
          : "bg-white border-r border-[#e5ddd5]"
        }
      `}>
        {/* Sidebar Header */}
        <div className="p-6 pb-2">
          <div className="flex items-center justify-between mb-8">
            <div>
              <Link href="/user/dashboard" onClick={() => setIsOpen(false)}>
                <Image
                  src={logoSidebar}
                  alt="Arunika Logo"
                  width={150}
                  height={50}
                  className="h-10 w-auto object-contain"
                />
              </Link>
            </div>

            {/* Close button (Mobile only) */}
            <button
              onClick={() => setIsOpen(false)}
              className={`lg:hidden p-2 rounded-lg transition-all ${isDark
                ? "hover:bg-[#2a221b] text-[#b9a89d] hover:text-white"
                : "hover:bg-[#f0e8e0] text-[#8b7355] hover:text-[#1a140e]"
                }`}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 flex flex-col gap-2 px-4 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all group
                  ${isActive
                    ? "bg-[#ec6d13] text-white shadow-lg shadow-[#ec6d13]/20"
                    : isDark
                      ? "hover:bg-[#2a221b] text-[#b9a89d] hover:text-white"
                      : "hover:bg-[#f5f0eb] text-[#8b7355] hover:text-[#1a140e]"
                  }
                `}
              >
                <item.icon size={20} />
                <span className={`text-sm ${isActive ? "font-semibold" : "font-medium"}`}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* User Footer */}
        <div className={`p-4 border-t ${isDark ? "border-[#3e342b]" : "border-[#e5ddd5]"}`}>
          <Link href="/user/profile" onClick={() => setIsOpen(false)}>
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