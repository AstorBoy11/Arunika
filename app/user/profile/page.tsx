"use client";

import Image from "next/image";
import {
    Edit,
    Pencil,
    Award,
    Plus,
    Home,
    Building2,
    MapPin,
    CheckCircle2,
    Trash2
} from "lucide-react";

export default function UserProfile() {
    return (
        <div className="max-w-[1200px] mx-auto w-full flex flex-col gap-8 pb-20">

            {/* --- HEADER PROFILE SECTION --- */}
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-6 border-b border-[#3e342b]">
                <div className="flex items-center gap-6">
                    {/* Avatar */}
                    <div className="relative group">
                        <div className="relative w-28 h-28 rounded-full border-4 border-[#1a140e] shadow-2xl overflow-hidden">
                            <Image
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2GmZQePWPY04wHlVPH7g2QechnIQhqr-oZQY35eO03gOTMRZT0T5GiSUL_P2shWFbkumDQ5nZG9meggW2Ue_5QoK3xIQeiSO6WSq-Vq_UI5-GJnkbAA7mTvlFrsRPvs4ZPqcE-2oI6EGqR0oJe33z1XydzPgbdW-aHPkOeOvJV1xacWdkSfHJu7pRSGJ_8x0tOmrDi6G00Gq7LOwFzNPHhmHf5oydaiE-D6ueg-TdCHj9yQm37IUtDqXdlP-eeKsK6igXmU_1mfFC" // Ganti dengan URL gambar aslimu
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
                        <h1 className="text-4xl font-bold text-white mb-2">Alex Morgan</h1>
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
                    <h3 className="text-xl font-bold text-white">Personal Information</h3>
                    <div className="bg-[#1a140e] rounded-2xl p-6 border border-[#3e342b] shadow-lg flex flex-col gap-6">

                        <div className="group">
                            <label className="block text-[#b9a89d] text-xs uppercase font-bold tracking-wider mb-1.5">Full Name</label>
                            <p className="text-white font-medium text-lg">Alex Morgan</p>
                        </div>

                        <div className="h-px bg-[#3e342b]/50"></div>

                        <div className="group">
                            <label className="block text-[#b9a89d] text-xs uppercase font-bold tracking-wider mb-1.5">Email Address</label>
                            <p className="text-white font-medium text-lg">alex.morgan@coffee.com</p>
                        </div>

                        <div className="h-px bg-[#3e342b]/50"></div>

                        <div className="group">
                            <label className="block text-[#b9a89d] text-xs uppercase font-bold tracking-wider mb-1.5">Phone Number</label>
                            <p className="text-white font-medium text-lg">+1 (555) 123-4567</p>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: ADDRESSES */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-white">Shipping Addresses</h3>
                        <button className="text-[#ec6d13] text-sm font-bold hover:text-white transition-colors flex items-center gap-1">
                            <Plus size={18} />
                            Add New Address
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {/* Card 1: Home (Default) */}
                        <div className="bg-[#1a140e] rounded-2xl p-6 border border-[#ec6d13]/40 shadow-lg relative group transition-all hover:bg-[#1e1711]">
                            <div className="absolute top-5 right-5 text-[#ec6d13]">
                                <CheckCircle2 size={24} />
                            </div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 rounded-lg bg-[#231910] text-white">
                                    <Home size={24} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold">Home</h4>
                                    <span className="text-[#ec6d13] text-[10px] font-bold uppercase tracking-wider">Default</span>
                                </div>
                            </div>
                            <p className="text-[#b9a89d] text-sm leading-relaxed mb-6">
                                452 Pike Street, Apt 8B<br />
                                Seattle, WA 98101<br />
                                United States
                            </p>
                            <div className="flex items-center gap-4 pt-4 border-t border-[#3e342b]/50">
                                <button className="text-white text-xs font-bold hover:text-[#ec6d13] transition-colors">Edit</button>
                                <button className="text-[#b9a89d] text-xs font-bold hover:text-red-500 transition-colors flex items-center gap-1">
                                    Delete
                                </button>
                            </div>
                        </div>

                        {/* Card 2: Work */}
                        <div className="bg-[#1a140e] rounded-2xl p-6 border border-[#3e342b] hover:border-[#b9a89d]/30 transition-all shadow-lg group">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 rounded-lg bg-[#231910] text-[#b9a89d] group-hover:text-white transition-colors">
                                    <Building2 size={24} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold">Work Office</h4>
                                    <span className="text-[#b9a89d] text-[10px] font-bold uppercase tracking-wider">Business</span>
                                </div>
                            </div>
                            <p className="text-[#b9a89d] text-sm leading-relaxed mb-6">
                                2000 Tech Boulevard, Suite 500<br />
                                Bellevue, WA 98004<br />
                                United States
                            </p>
                            <div className="flex items-center gap-4 pt-4 border-t border-[#3e342b]/50">
                                <button className="text-white text-xs font-bold hover:text-[#ec6d13] transition-colors">Edit</button>
                                <button className="text-white text-xs font-bold hover:text-[#ec6d13] transition-colors">Set as Default</button>
                                <button className="text-[#b9a89d] text-xs font-bold hover:text-red-500 transition-colors">Delete</button>
                            </div>
                        </div>

                        {/* Card 3: Add New Button */}
                        <button className="rounded-2xl border border-dashed border-[#3e342b] hover:border-[#ec6d13]/50 hover:bg-[#1a140e]/50 p-6 flex flex-col items-center justify-center gap-3 transition-all min-h-[200px] text-[#b9a89d] hover:text-[#ec6d13] group">
                            <MapPin className="group-hover:scale-110 transition-transform" size={40} />
                            <span className="font-bold text-sm">Add New Address</span>
                        </button>

                    </div>
                </div>

            </div>
        </div>
    );
}