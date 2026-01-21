"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Menu, User, Moon, Sun, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSidebar } from "./sidebar";
import { useTheme } from "@/context/ThemeContext";

export default function Header() {
  const { setIsOpen } = useSidebar();
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isDark = theme === "dark";

  // Search bar hanya muncul di halaman dashboard (shop)
  const showSearch = pathname === "/user/dashboard";

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className={`h-16 border-b backdrop-blur-md flex items-center justify-between px-4 sm:px-6 md:px-8 sticky top-0 z-10 gap-4 transition-colors duration-300 ${isDark
        ? "border-[#3e342b] bg-[#1a140e]/95"
        : "border-[#e5ddd5] bg-white/95"
      }`}>

      {/* Left: Hamburger Menu (mobile only) + Search Bar */}
      <div className="flex items-center gap-3 flex-1">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(true)}
          className={`lg:hidden p-2 rounded-lg border transition-all flex-shrink-0 ${isDark
              ? "bg-[#231910] border-[#3e342b] text-white hover:bg-[#2a221b]"
              : "bg-[#f5f0eb] border-[#e5ddd5] text-[#1a140e] hover:bg-[#ebe3db]"
            }`}
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>

        {/* Search Bar - Only visible on dashboard/shop page */}
        {showSearch && (
          <div className="relative flex-1 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className={isDark ? "text-[#9a6c4c]" : "text-[#8b7355]"} size={16} />
            </div>
            <input
              className={`w-full border text-xs rounded-lg focus:outline-none block pl-9 p-2.5 transition-colors ${isDark
                  ? "bg-[#120d0a] border-[#3e342b] text-white focus:border-[#ec6d13] placeholder-[#9a6c4c]"
                  : "bg-[#f5f0eb] border-[#e5ddd5] text-[#1a140e] focus:border-[#ec6d13] placeholder-[#8b7355]"
                }`}
              placeholder="Search..."
              type="text"
            />
          </div>
        )}
      </div>

      {/* Right: User Avatar with Dropdown */}
      <div className="relative" ref={dropdownRef}>
        {/* Avatar Button */}
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className={`h-9 w-9 rounded-full border-2 overflow-hidden flex-shrink-0 transition-all duration-200 flex items-center justify-center ${isDark
              ? "bg-[#2c241b] border-[#3e342b] hover:border-[#ec6d13]"
              : "bg-[#f5f0eb] border-[#e5ddd5] hover:border-[#ec6d13]"
            }`}
        >
          <div className="w-full h-full bg-[#ec6d13] flex items-center justify-center text-white font-bold text-sm">
            A
          </div>
        </button>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className={`absolute right-0 mt-2 w-56 border rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200 ${isDark
              ? "bg-[#1a140e] border-[#3e342b] shadow-black/30"
              : "bg-white border-[#e5ddd5] shadow-black/10"
            }`}>
            {/* User Info */}
            <div className={`px-4 py-3 border-b ${isDark ? "border-[#3e342b]" : "border-[#e5ddd5]"}`}>
              <p className={`font-semibold text-sm ${isDark ? "text-white" : "text-[#1a140e]"}`}>
                Alex Morgan
              </p>
              <p className={`text-xs truncate ${isDark ? "text-[#9a6c4c]" : "text-[#8b7355]"}`}>
                alex@example.com
              </p>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              {/* Profile */}
              <Link
                href="/user/profile"
                onClick={() => setDropdownOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 transition-all ${isDark
                    ? "text-[#b9a89d] hover:bg-[#2a221b] hover:text-white"
                    : "text-[#8b7355] hover:bg-[#f5f0eb] hover:text-[#1a140e]"
                  }`}
              >
                <User size={18} />
                <span className="text-sm font-medium">Profile</span>
              </Link>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`w-full flex items-center justify-between px-4 py-2.5 transition-all ${isDark
                    ? "text-[#b9a89d] hover:bg-[#2a221b] hover:text-white"
                    : "text-[#8b7355] hover:bg-[#f5f0eb] hover:text-[#1a140e]"
                  }`}
              >
                <div className="flex items-center gap-3">
                  {isDark ? <Moon size={18} /> : <Sun size={18} />}
                  <span className="text-sm font-medium">Theme</span>
                </div>
                <div className={`w-10 h-5 rounded-full p-0.5 transition-colors ${isDark ? 'bg-[#ec6d13]' : 'bg-[#e5ddd5]'}`}>
                  <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${isDark ? 'translate-x-5' : 'translate-x-0'}`} />
                </div>
              </button>
            </div>

            {/* Logout */}
            <div className={`border-t py-2 ${isDark ? "border-[#3e342b]" : "border-[#e5ddd5]"}`}>
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  console.log("Logout clicked");
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-red-400 hover:bg-red-500/10 transition-all"
              >
                <LogOut size={18} />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}