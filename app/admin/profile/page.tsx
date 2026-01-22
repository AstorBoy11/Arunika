"use client";

import AdminHeader from "@/components/admin-header";
import Image from "next/image";
import { 
  Camera, 
  Upload, 
  BadgeCheck, 
  Lock, 
  ShieldCheck, 
  Monitor, 
  Laptop, 
  Smartphone 
} from "lucide-react";

export default function AdminProfile() {
  return (
    <div className="flex flex-col h-full w-full">
      {/* 1. HEADER */}
      <AdminHeader 
        title="Admin Profile" 
        subtitle="Manage your personal details and account security."
      />

      {/* 2. MAIN CONTENT */}
      <div className="flex-1 overflow-y-auto p-6 md:p-10 pb-24 custom-scrollbar">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT COLUMN: Profile Card */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            
            {/* Profile Info */}
            <div className="bg-white dark:bg-[#1a140e] rounded-xl p-6 border border-gray-200 dark:border-[#3e342b] shadow-sm dark:shadow-lg flex flex-col items-center text-center transition-colors">
              <div className="relative group cursor-pointer mb-4">
                <div className="relative size-32 rounded-full border-4 border-gray-100 dark:border-[#3e342b] shadow-xl overflow-hidden">
                  <Image 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPm2FuOkpZbQ74djdMD59KmT18_KcjZ5d6FmHcRNABFvPDkQKaVcDb3Q02KLzqFCsg6halyhJv0TcgllVCpNqJ_34kTpDIsdGXqpco8cQjKBq2iO_QrxymGiNyb0p3si8ru0hC-n5hKUrB6jvT_uE39rBhAIMfMtYSQS1Y-OUalputwF5qPM3avyJ2WNouN_negs2tm0r3uRF2JMP83BlB3bc2yo1ntZ86uO7PwU5QEB4ObrjLa4JtOegY14MNIii6-rBGlzw8lkgX" 
                    alt="Profile" 
                    fill 
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="text-white" size={32} />
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Jane Doe</h3>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#ec6d13]/10 text-[#ec6d13] border border-[#ec6d13]/20 mb-6">
                Super Admin
              </span>
              
              <button className="w-full py-2.5 px-4 rounded-lg bg-gray-100 dark:bg-[#3e342b] hover:bg-gray-200 dark:hover:bg-[#4a3d33] text-gray-700 dark:text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2">
                <Upload size={18} />
                Upload New Photo
              </button>
            </div>

            {/* Account Status */}
            <div className="bg-white dark:bg-[#1a140e] rounded-xl p-6 border border-gray-200 dark:border-[#3e342b] shadow-sm dark:shadow-none transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-500 dark:text-[#b9a89d] text-sm font-medium">Account Status</span>
                <span className="text-green-500 text-xs font-bold uppercase tracking-wider">Active</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-[#3e342b] rounded-full h-1.5 mt-2">
                <div className="bg-green-500 h-1.5 rounded-full" style={{ width: "100%" }}></div>
              </div>
              <p className="text-gray-400 dark:text-[#b9a89d] text-xs mt-3">Member since Oct 2021</p>
            </div>
          </div>

          {/* RIGHT COLUMN: Form & Activity */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            {/* Personal Info Form */}
            <div className="bg-white dark:bg-[#1a140e] rounded-xl p-6 md:p-8 border border-gray-200 dark:border-[#3e342b] shadow-sm dark:shadow-none transition-colors">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <BadgeCheck className="text-[#ec6d13]" size={24} />
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className="flex flex-col gap-2">
                  <span className="text-gray-500 dark:text-[#b9a89d] text-sm font-medium">Admin Name</span>
                  <input 
                    className="w-full bg-gray-50 dark:bg-[#2a221b] border border-gray-200 dark:border-[#3e342b] rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#ec6d13] focus:border-[#ec6d13] transition-all placeholder-gray-400" 
                    type="text" 
                    defaultValue="Jane Doe"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-gray-500 dark:text-[#b9a89d] text-sm font-medium">Role</span>
                  <div className="relative">
                    <input 
                      className="w-full bg-gray-100 dark:bg-[#2a221b] border border-gray-200 dark:border-[#3e342b] rounded-lg px-4 py-3 text-gray-500 dark:text-[#b9a89d] cursor-not-allowed focus:outline-none" 
                      readOnly 
                      type="text" 
                      defaultValue="Super Admin"
                    />
                    <Lock className="absolute right-3 top-3 text-gray-400 dark:text-[#6b5d52]" size={18} />
                  </div>
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-gray-500 dark:text-[#b9a89d] text-sm font-medium">Email Address</span>
                  <input 
                    className="w-full bg-gray-50 dark:bg-[#2a221b] border border-gray-200 dark:border-[#3e342b] rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#ec6d13] focus:border-[#ec6d13] transition-all placeholder-gray-400" 
                    type="email" 
                    defaultValue="jane.doe@coffeeconnect.com"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-gray-500 dark:text-[#b9a89d] text-sm font-medium">Contact Number</span>
                  <input 
                    className="w-full bg-gray-50 dark:bg-[#2a221b] border border-gray-200 dark:border-[#3e342b] rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#ec6d13] focus:border-[#ec6d13] transition-all placeholder-gray-400" 
                    type="tel" 
                    defaultValue="+1 (555) 123-4567"
                  />
                </label>
              </div>
              
              <div className="mt-8 flex justify-end">
                <button className="bg-[#ec6d13] hover:bg-[#d65f0e] text-white font-bold py-3 px-8 rounded-lg shadow-lg shadow-[#ec6d13]/20 transition-all transform hover:scale-[1.02] active:scale-[0.98]">
                  Update Profile
                </button>
              </div>
            </div>

            {/* Login Activity */}
            <div className="bg-white dark:bg-[#1a140e] rounded-xl border border-gray-200 dark:border-[#3e342b] overflow-hidden shadow-sm dark:shadow-none transition-colors">
              <div className="p-6 border-b border-gray-200 dark:border-[#3e342b] flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <ShieldCheck className="text-[#ec6d13]" size={24} />
                  Recent Login Activity
                </h3>
                <button className="text-gray-500 dark:text-[#b9a89d] hover:text-[#ec6d13] dark:hover:text-white text-sm font-medium transition-colors">View All</button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-gray-50 dark:bg-[#2a221b]">
                    <tr>
                      <th className="p-4 text-xs font-semibold text-gray-500 dark:text-[#b9a89d] uppercase tracking-wider">Device / Browser</th>
                      <th className="p-4 text-xs font-semibold text-gray-500 dark:text-[#b9a89d] uppercase tracking-wider">IP Address</th>
                      <th className="p-4 text-xs font-semibold text-gray-500 dark:text-[#b9a89d] uppercase tracking-wider">Time</th>
                      <th className="p-4 text-xs font-semibold text-gray-500 dark:text-[#b9a89d] uppercase tracking-wider text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-[#392f28]">
                    {/* Row 1 */}
                    <tr className="hover:bg-gray-50 dark:hover:bg-[#2a221b] transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <Monitor className="text-gray-400 dark:text-[#b9a89d]" size={20} />
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">Chrome on Windows</p>
                            <p className="text-xs text-green-600 dark:text-[#6b5d52]">Current Session</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-gray-500 dark:text-[#b9a89d]">192.168.1.42</td>
                      <td className="p-4 text-sm text-gray-500 dark:text-[#b9a89d]">Oct 24, 2023 10:45 AM</td>
                      <td className="p-4 text-right">
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-500/20">
                          Success
                        </span>
                      </td>
                    </tr>
                    {/* Row 2 */}
                    <tr className="hover:bg-gray-50 dark:hover:bg-[#2a221b] transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <Laptop className="text-gray-400 dark:text-[#b9a89d]" size={20} />
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">Safari on MacOS</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-gray-500 dark:text-[#b9a89d]">203.0.113.11</td>
                      <td className="p-4 text-sm text-gray-500 dark:text-[#b9a89d]">Oct 23, 2023 09:12 AM</td>
                      <td className="p-4 text-right">
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-500/20">
                          Success
                        </span>
                      </td>
                    </tr>
                    {/* Row 3 */}
                    <tr className="hover:bg-gray-50 dark:hover:bg-[#2a221b] transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <Smartphone className="text-gray-400 dark:text-[#b9a89d]" size={20} />
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">App on iPhone 13</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-gray-500 dark:text-[#b9a89d]">192.168.1.42</td>
                      <td className="p-4 text-sm text-gray-500 dark:text-[#b9a89d]">Oct 20, 2023 06:30 PM</td>
                      <td className="p-4 text-right">
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/20">
                          Failed
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}