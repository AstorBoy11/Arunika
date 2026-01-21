"use client";

import Image from "next/image";
import {
    Edit,
    Pencil,
    Plus,
    Home,
    Building2,
    MapPin,
    CheckCircle2,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function UserProfile() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <div className="max-w-[1200px] mx-auto w-full flex flex-col gap-8 pb-20">

            {/* --- HEADER PROFILE SECTION --- */}
            <div className={`flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-6 border-b ${isDark ? "border-[#3e342b]" : "border-[#e5ddd5]"
                }`}>
                <div className="flex items-center gap-6">
                    {/* Avatar */}
                    <div className="relative group">
                        <div className={`relative w-28 h-28 rounded-full border-4 shadow-2xl overflow-hidden ${isDark ? "border-[#1a140e]" : "border-white"
                            }`}>
                            <Image
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2GmZQePWPY04wHlVPH7g2QechnIQhqr-oZQY35eO03gOTMRZT0T5GiSUL_P2shWFbkumDQ5nZG9meggW2Ue_5QoK3xIQeiSO6WSq-Vq_UI5-GJnkbAA7mTvlFrsRPvs4ZPqcE-2oI6EGqR0oJe33z1XydzPgbdW-aHPkOeOvJV1xacWdkSfHJu7pRSGJ_8x0tOmrDi6G00Gq7LOwFzNPHhmHf5oydaiE-D6ueg-TdCHj9yQm37IUtDqXdlP-eeKsK6igXmU_1mfFC"
                                alt="Profile Picture"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <button className="absolute bottom-1 right-1 p-2 bg-[#ec6d13] rounded-full text-white shadow-lg hover:bg-[#d65c0b] transition-colors z-10">
                            <Pencil size={16} />
                        </button>
                    </div>

                    {/* Nama & Status */}
                    <div>
                        <h1 className={`text-4xl font-bold mb-2 ${isDark ? "text-white" : "text-[#1a140e]"}`}>
                            Alex Morgan
                        </h1>
                    </div>
                </div>

                {/* Edit Button */}
                <button className="flex items-center gap-2 px-6 py-3 bg-[#ec6d13] text-white font-bold rounded-xl shadow-[0_4px_12px_rgba(236,109,19,0.3)] hover:shadow-[0_6px_16px_rgba(236,109,19,0.4)] hover:bg-[#d65d0a] transition-all">
                    <Edit size={20} />
                    Edit Profile
                </button>
            </div>

            {/* --- CONTENT GRID --- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* LEFT COLUMN: PERSONAL INFO */}
                <div className="lg:col-span-1 flex flex-col gap-6">
                    <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-[#1a140e]"}`}>
                        Personal Information
                    </h3>
                    <div className={`rounded-2xl p-6 border shadow-lg flex flex-col gap-6 ${isDark
                            ? "bg-[#1a140e] border-[#3e342b]"
                            : "bg-white border-[#e5ddd5]"
                        }`}>

                        <div className="group">
                            <label className={`block text-xs uppercase font-bold tracking-wider mb-1.5 ${isDark ? "text-[#b9a89d]" : "text-[#8b7355]"
                                }`}>Full Name</label>
                            <p className={`font-medium text-lg ${isDark ? "text-white" : "text-[#1a140e]"}`}>
                                Alex Morgan
                            </p>
                        </div>

                        <div className={`h-px ${isDark ? "bg-[#3e342b]/50" : "bg-[#e5ddd5]"}`}></div>

                        <div className="group">
                            <label className={`block text-xs uppercase font-bold tracking-wider mb-1.5 ${isDark ? "text-[#b9a89d]" : "text-[#8b7355]"
                                }`}>Email Address</label>
                            <p className={`font-medium text-lg ${isDark ? "text-white" : "text-[#1a140e]"}`}>
                                alex.morgan@coffee.com
                            </p>
                        </div>

                        <div className={`h-px ${isDark ? "bg-[#3e342b]/50" : "bg-[#e5ddd5]"}`}></div>

                        <div className="group">
                            <label className={`block text-xs uppercase font-bold tracking-wider mb-1.5 ${isDark ? "text-[#b9a89d]" : "text-[#8b7355]"
                                }`}>Phone Number</label>
                            <p className={`font-medium text-lg ${isDark ? "text-white" : "text-[#1a140e]"}`}>
                                +1 (555) 123-4567
                            </p>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: ADDRESSES */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                        <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-[#1a140e]"}`}>
                            Shipping Addresses
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {/* Card 1: Home (Default) */}
                        <div className={`rounded-2xl p-6 border shadow-lg relative group transition-all ${isDark
                                ? "bg-[#1a140e] border-[#ec6d13]/40 hover:bg-[#1e1711]"
                                : "bg-white border-[#ec6d13]/40 hover:bg-[#fef9f5]"
                            }`}>
                            <div className="absolute top-5 right-5 text-[#ec6d13]">
                                <CheckCircle2 size={24} />
                            </div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`p-2 rounded-lg ${isDark
                                        ? "bg-[#231910] text-white"
                                        : "bg-[#fef5ee] text-[#ec6d13]"
                                    }`}>
                                    <Home size={24} />
                                </div>
                                <div>
                                    <h4 className={`font-bold ${isDark ? "text-white" : "text-[#1a140e]"}`}>Home</h4>
                                    <span className="text-[#ec6d13] text-[10px] font-bold uppercase tracking-wider">Default</span>
                                </div>
                            </div>
                            <p className={`text-sm leading-relaxed mb-6 ${isDark ? "text-[#b9a89d]" : "text-[#8b7355]"}`}>
                                452 Pike Street, Apt 8B<br />
                                Seattle, WA 98101<br />
                                United States
                            </p>
                            <div className={`flex items-center gap-4 pt-4 border-t ${isDark ? "border-[#3e342b]/50" : "border-[#e5ddd5]"
                                }`}>
                                <button className={`text-xs font-bold hover:text-[#ec6d13] transition-colors ${isDark ? "text-white" : "text-[#1a140e]"
                                    }`}>Edit</button>
                                <button className={`text-xs font-bold hover:text-red-500 transition-colors ${isDark ? "text-[#b9a89d]" : "text-[#8b7355]"
                                    }`}>
                                    Delete
                                </button>
                            </div>
                        </div>

                        {/* Card 2: Work */}
                        <div className={`rounded-2xl p-6 border transition-all shadow-lg group ${isDark
                                ? "bg-[#1a140e] border-[#3e342b] hover:border-[#b9a89d]/30"
                                : "bg-white border-[#e5ddd5] hover:border-[#8b7355]/30"
                            }`}>
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`p-2 rounded-lg transition-colors ${isDark
                                        ? "bg-[#231910] text-[#b9a89d] group-hover:text-white"
                                        : "bg-[#f5f0eb] text-[#8b7355] group-hover:text-[#1a140e]"
                                    }`}>
                                    <Building2 size={24} />
                                </div>
                                <div>
                                    <h4 className={`font-bold ${isDark ? "text-white" : "text-[#1a140e]"}`}>Work Office</h4>
                                    <span className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? "text-[#b9a89d]" : "text-[#8b7355]"
                                        }`}>Business</span>
                                </div>
                            </div>
                            <p className={`text-sm leading-relaxed mb-6 ${isDark ? "text-[#b9a89d]" : "text-[#8b7355]"}`}>
                                2000 Tech Boulevard, Suite 500<br />
                                Bellevue, WA 98004<br />
                                United States
                            </p>
                            <div className={`flex items-center gap-4 pt-4 border-t ${isDark ? "border-[#3e342b]/50" : "border-[#e5ddd5]"
                                }`}>
                                <button className={`text-xs font-bold hover:text-[#ec6d13] transition-colors ${isDark ? "text-white" : "text-[#1a140e]"
                                    }`}>Edit</button>
                                <button className={`text-xs font-bold hover:text-[#ec6d13] transition-colors ${isDark ? "text-white" : "text-[#1a140e]"
                                    }`}>Set as Default</button>
                                <button className={`text-xs font-bold hover:text-red-500 transition-colors ${isDark ? "text-[#b9a89d]" : "text-[#8b7355]"
                                    }`}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}