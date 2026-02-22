"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, Moon, Sun, LogOut, User } from "lucide-react";
import { useAdminSidebar } from "./admin-sidebar";
import { useTheme } from "@/context/ThemeContext";

interface AdminHeaderProps {
    children?: React.ReactNode;
    title?: string;
    subtitle?: string;
}

export default function AdminHeader({ children, title, subtitle }: AdminHeaderProps) {
    const { setIsOpen } = useAdminSidebar();
    const { theme, toggleTheme } = useTheme();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const isDark = theme === "dark";

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
        <header className={`h-16 md:h-20 flex items-center justify-between px-4 md:px-8 py-4 shrink-0 backdrop-blur-md sticky top-0 z-30 border-b transition-colors duration-300 ${isDark
            ? "bg-[#231910]/95 border-[#3e342b]"
            : "bg-white/90 border-[#e5ddd5]"
            }`}>
            <div className="flex items-center gap-4">
                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOpen(true)}
                    className={`md:hidden p-2 rounded-lg transition-colors ${isDark
                        ? "hover:bg-[#3e342b] text-[#b9a89d] hover:text-white"
                        : "hover:bg-[#f5f0eb] text-[#8b7355] hover:text-[#1a140e]"
                        }`}
                >
                    <Menu size={24} />
                </button>

                {/* Children (Title/Subtitle usually) */}
                <div className="flex flex-col">
                    {title ? (
                        <>
                            <h2 className={`${isDark ? "text-[#fcfaf8]" : "text-[#1a140e]"} text-lg md:text-2xl font-bold tracking-tight`}>
                                {title}
                            </h2>
                            {subtitle && (
                                <p className={`text-xs md:text-sm ${isDark ? "text-[#9a6c4c]" : "text-[#8b7355]"} hidden sm:block`}>
                                    {subtitle}
                                </p>
                            )}
                        </>
                    ) : (
                        children
                    )}
                </div>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
                {/* Actions (If title is present, render children here) */}
                {title && children && (
                    <div className="hidden md:flex items-center gap-3 mr-2">
                        {children}
                    </div>
                )}

                {/* Profile Dropdown */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className={`relative w-10 h-10 rounded-full border-2 overflow-hidden transition-all hover:scale-105 ${isDark ? "border-[#3e342b]" : "border-[#e5ddd5]"
                            }`}
                    >
                        <Image
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFFMEAlbc-oz-npHCx5oeKvtQICJCT0H7fLZGCSfBAKnMVgfKcoA_wOD8v8eg-CW0POamYx3vS-5_FUTC_iqNTpUpvTt2LcW2dloqUpgnmoNeZwtdmCz4BtiHJTCficyXbqHzbiKhGy5VXgmBWEc2ZqribfeQJfXbIyTYRNy86Vl8ftlh-t0fcPkhpdUKfLRnirHh9oM2bvJKX4h4SnkfXDGi2s8aY0Z8H2IheZ-FD-CZ72gzAvW8Gs052PzZt6-jDPn2WVrsNRE1g"
                            alt="Admin Profile"
                            fill
                            className="object-cover"
                        />
                    </button>

                    {/* Dropdown Menu */}
                    {dropdownOpen && (
                        <div className={`absolute right-0 mt-2 w-64 border rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200 ${isDark
                            ? "bg-[#1a140e] border-[#3e342b] shadow-black/30"
                            : "bg-white border-[#e5ddd5] shadow-black/10"
                            }`}>
                            {/* Admin Info */}
                            <div className={`px-4 py-3 border-b ${isDark ? "border-[#3e342b]" : "border-[#e5ddd5]"}`}>
                                <p className={`font-semibold text-sm ${isDark ? "text-white" : "text-[#1a140e]"}`}>
                                    James Brewer
                                </p>
                                <p className={`text-xs truncate ${isDark ? "text-[#9a6c4c]" : "text-[#8b7355]"}`}>
                                    Owner & Manager
                                </p>
                            </div>

                            {/* Menu Items */}
                            <div className="py-2">
                                {/* Profile */}
                                <Link
                                    href="/admin/profile"
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
            </div>
        </header>
    );
}
