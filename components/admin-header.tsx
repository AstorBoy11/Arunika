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
    const { toggleTheme, mounted } = useTheme();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

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

    // Render a stable skeleton until the client has hydrated to avoid theme flicker
    if (!mounted) {
        return (
            <header className="h-16 md:h-20 shrink-0 sticky top-0 z-30 bg-white/90 border-b border-[#e5ddd5] backdrop-blur-md" />
        );
    }

    return (
        <header className="h-16 md:h-20 flex items-center justify-between px-4 md:px-8 py-4 shrink-0 backdrop-blur-md sticky top-0 z-30 border-b transition-colors duration-300 bg-white/90 border-[#e5ddd5] dark:bg-[#231910]/95 dark:border-[#3e342b]">
            <div className="flex items-center gap-4">
                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOpen(true)}
                    className="md:hidden p-2 rounded-lg transition-colors hover:bg-[#f5f0eb] text-[#8b7355] hover:text-[#1a140e] dark:hover:bg-[#3e342b] dark:text-[#b9a89d] dark:hover:text-white"
                >
                    <Menu size={24} />
                </button>

                {/* Children (Title/Subtitle usually) */}
                <div className="flex flex-col">
                    {title ? (
                        <>
                            <h2 className="text-[#1a140e] dark:text-[#fcfaf8] text-lg md:text-2xl font-bold tracking-tight">
                                {title}
                            </h2>
                            {subtitle && (
                                <p className="text-xs md:text-sm text-[#8b7355] dark:text-[#9a6c4c] hidden sm:block">
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
                        className="relative w-10 h-10 rounded-full border-2 overflow-hidden transition-all hover:scale-105 border-[#e5ddd5] dark:border-[#3e342b]"
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
                        <div className="absolute right-0 mt-2 w-64 border rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200 bg-white border-[#e5ddd5] shadow-black/10 dark:bg-[#1a140e] dark:border-[#3e342b] dark:shadow-black/30">
                            {/* Admin Info */}
                            <div className="px-4 py-3 border-b border-[#e5ddd5] dark:border-[#3e342b]">
                                <p className="font-semibold text-sm text-[#1a140e] dark:text-white">
                                    James Brewer
                                </p>
                                <p className="text-xs truncate text-[#8b7355] dark:text-[#9a6c4c]">
                                    Owner & Manager
                                </p>
                            </div>

                            {/* Menu Items */}
                            <div className="py-2">
                                {/* Profile */}
                                <Link
                                    href="/admin/profile"
                                    onClick={() => setDropdownOpen(false)}
                                    className="flex items-center gap-3 px-4 py-2.5 transition-all text-[#8b7355] hover:bg-[#f5f0eb] hover:text-[#1a140e] dark:text-[#b9a89d] dark:hover:bg-[#2a221b] dark:hover:text-white"
                                >
                                    <User size={18} />
                                    <span className="text-sm font-medium">Profile</span>
                                </Link>

                                {/*
                                 * Theme Toggle — icon/label shows the ACTION (what you switch TO),
                                 * not the current state.
                                 * Dark mode active  → Sun icon  + "Light Mode"  (click to go light)
                                 * Light mode active → Moon icon + "Dark Mode"   (click to go dark)
                                 */}
                                <button
                                    onClick={toggleTheme}
                                    className="w-full flex items-center justify-between px-4 py-2.5 transition-all text-[#8b7355] hover:bg-[#f5f0eb] hover:text-[#1a140e] dark:text-[#b9a89d] dark:hover:bg-[#2a221b] dark:hover:text-white"
                                >
                                    <div className="flex items-center gap-3">
                                        {/* Sun shown in dark mode → clicking switches to light */}
                                        <Sun size={18} className="hidden dark:block" />
                                        {/* Moon shown in light mode → clicking switches to dark */}
                                        <Moon size={18} className="block dark:hidden" />
                                        <span className="text-sm font-medium">
                                            <span className="hidden dark:inline">Light Mode</span>
                                            <span className="inline dark:hidden">Dark Mode</span>
                                        </span>
                                    </div>
                                    <div className="w-10 h-5 rounded-full p-0.5 transition-colors bg-[#e5ddd5] dark:bg-[#ec6d13]">
                                        <div className="w-4 h-4 rounded-full bg-white shadow-sm transition-transform translate-x-0 dark:translate-x-5" />
                                    </div>
                                </button>
                            </div>

                            {/* Logout */}
                            <div className="border-t py-2 border-[#e5ddd5] dark:border-[#3e342b]">
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
