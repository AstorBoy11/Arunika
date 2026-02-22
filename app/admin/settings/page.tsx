"use client";

import AdminHeader from "@/components/admin-header";
import {
  Save,
  Store,
  UploadCloud,
  Clock,
  CreditCard,
  Banknote,
  ShieldCheck,
  Lock
} from "lucide-react";

export default function AdminSettings() {
  return (
    <div className="flex flex-col h-full w-full">
      {/* 1. HEADER */}
      <AdminHeader
        title="System Settings"
        subtitle="Configure global store profile, preferences and security"
      >
      </AdminHeader>

      {/* 2. MAIN CONTENT */}
      <div className="flex-1 overflow-y-auto p-8 pt-6 custom-scrollbar">
        <div className="max-w-4xl mx-auto space-y-6 pb-12">

          {/* SECTION 1: STORE PROFILE */}
          <section className="bg-white dark:bg-[#1a140e] rounded-xl border border-gray-200 dark:border-[#3e342b] p-6 shadow-sm dark:shadow-none transition-colors">
            <div className="flex items-center gap-2 mb-6 border-b border-gray-200 dark:border-[#3e342b] pb-4">
              <Store className="text-[#ec6d13]" size={24} />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Store Profile</h3>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
              {/* Photo Upload */}
              <div className="flex flex-col items-center gap-3 shrink-0">
                <div className="relative group cursor-pointer">
                  <div className="size-32 rounded-full bg-gray-50 dark:bg-[#231910] border-2 border-dashed border-gray-300 dark:border-[#3e342b] flex items-center justify-center overflow-hidden group-hover:border-[#ec6d13] transition-colors">
                    <UploadCloud className="text-gray-400 dark:text-[#8e7f72] group-hover:text-[#ec6d13] transition-colors" size={32} />
                  </div>
                  <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs font-bold text-white uppercase">Upload</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-[#8e7f72]">PNG or JPG, max 2MB</p>
              </div>

              {/* Form Fields */}
              <div className="flex-1 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-500 dark:text-[#8e7f72] uppercase tracking-wider">Store Name</label>
                    <input
                      className="w-full bg-white dark:bg-[#231910] border border-gray-200 dark:border-[#3e342b] rounded-lg px-4 py-2.5 text-gray-900 dark:text-[#EAE0D5] text-sm focus:ring-1 focus:ring-[#ec6d13] focus:border-[#ec6d13] outline-none transition-all placeholder-gray-400"
                      type="text"
                      defaultValue="Coffee Connect Downtown"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-500 dark:text-[#8e7f72] uppercase tracking-wider">Store ID</label>
                    <input
                      className="w-full bg-gray-100 dark:bg-[#1a140e] border border-gray-200 dark:border-[#3e342b] rounded-lg px-4 py-2.5 text-gray-500 dark:text-[#8e7f72] text-sm cursor-not-allowed opacity-70"
                      disabled
                      type="text"
                      defaultValue="CC-001-DT"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-500 dark:text-[#8e7f72] uppercase tracking-wider">Store Address</label>
                  <textarea
                    className="w-full bg-white dark:bg-[#231910] border border-gray-200 dark:border-[#3e342b] rounded-lg px-4 py-2.5 text-gray-900 dark:text-[#EAE0D5] text-sm focus:ring-1 focus:ring-[#ec6d13] focus:border-[#ec6d13] outline-none transition-all placeholder-gray-400"
                    rows={3}
                    defaultValue="123 Roasted Bean Avenue, Suite 100&#10;Metropolis, NY 10012"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 2: OPERATING HOURS (FIXED FOR MOBILE) */}
          <section className="bg-white dark:bg-[#1a140e] rounded-xl border border-gray-200 dark:border-[#3e342b] p-6 shadow-sm dark:shadow-none transition-colors">
            <div className="flex items-center gap-2 mb-6 border-b border-gray-200 dark:border-[#3e342b] pb-4">
              <Clock className="text-[#ec6d13]" size={24} />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Operating Hours</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Weekdays */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-gray-700 dark:text-[#EAE0D5]">Weekdays (Mon - Fri)</h4>
                {/* UBAH: Tambah flex-col untuk mobile, sm:flex-row untuk tablet ke atas */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                  <div className="space-y-1 w-full sm:flex-1">
                    <label className="text-xs text-gray-500 dark:text-[#8e7f72]">Open</label>
                    <input className="w-full bg-white dark:bg-[#231910] border border-gray-200 dark:border-[#3e342b] rounded-lg px-3 py-2 text-gray-900 dark:text-[#EAE0D5] text-sm focus:border-[#ec6d13] outline-none" type="time" defaultValue="06:00" />
                  </div>
                  {/* Sembunyikan tanda strip (-) di mobile agar layout vertikal lebih rapi */}
                  <span className="hidden sm:block text-gray-400 dark:text-[#8e7f72] mt-5">-</span>
                  <div className="space-y-1 w-full sm:flex-1">
                    <label className="text-xs text-gray-500 dark:text-[#8e7f72]">Close</label>
                    <input className="w-full bg-white dark:bg-[#231910] border border-gray-200 dark:border-[#3e342b] rounded-lg px-3 py-2 text-gray-900 dark:text-[#EAE0D5] text-sm focus:border-[#ec6d13] outline-none" type="time" defaultValue="20:00" />
                  </div>
                </div>
              </div>

              {/* Weekends */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-gray-700 dark:text-[#EAE0D5]">Weekends (Sat - Sun)</h4>
                {/* UBAH: Sama seperti di atas, gunakan flex-col untuk mobile */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                  <div className="space-y-1 w-full sm:flex-1">
                    <label className="text-xs text-gray-500 dark:text-[#8e7f72]">Open</label>
                    <input className="w-full bg-white dark:bg-[#231910] border border-gray-200 dark:border-[#3e342b] rounded-lg px-3 py-2 text-gray-900 dark:text-[#EAE0D5] text-sm focus:border-[#ec6d13] outline-none" type="time" defaultValue="07:00" />
                  </div>
                  <span className="hidden sm:block text-gray-400 dark:text-[#8e7f72] mt-5">-</span>
                  <div className="space-y-1 w-full sm:flex-1">
                    <label className="text-xs text-gray-500 dark:text-[#8e7f72]">Close</label>
                    <input className="w-full bg-white dark:bg-[#231910] border border-gray-200 dark:border-[#3e342b] rounded-lg px-3 py-2 text-gray-900 dark:text-[#EAE0D5] text-sm focus:border-[#ec6d13] outline-none" type="time" defaultValue="22:00" />
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* SECTION 3 & 4 TETAP SAMA */}
          {/* SECTION 4: SECURITY */}
          <section className="bg-white dark:bg-[#1a140e] rounded-xl border border-gray-200 dark:border-[#3e342b] p-6 shadow-sm dark:shadow-none transition-colors">
            <div className="flex items-center gap-2 mb-6 border-b border-gray-200 dark:border-[#3e342b] pb-4">
              <ShieldCheck className="text-[#ec6d13]" size={24} />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Security</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              <div className="md:col-span-1">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-[#EAE0D5]">Change Password</h4>
                <p className="text-xs text-gray-500 dark:text-[#8e7f72] mt-1">Ensure your account is using a long, random password to stay secure.</p>
              </div>

              <div className="md:col-span-2 space-y-4">
                <div className="space-y-1.5 relative">
                  <label className="text-xs font-medium text-gray-500 dark:text-[#8e7f72] uppercase tracking-wider">Current Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 text-gray-400 dark:text-[#8e7f72]" size={16} />
                    <input
                      className="w-full bg-white dark:bg-[#231910] border border-gray-200 dark:border-[#3e342b] rounded-lg pl-10 pr-4 py-2.5 text-gray-900 dark:text-[#EAE0D5] text-sm focus:ring-1 focus:ring-[#ec6d13] focus:border-[#ec6d13] outline-none transition-all placeholder-gray-400"
                      placeholder="••••••••"
                      type="password"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-500 dark:text-[#8e7f72] uppercase tracking-wider">New Password</label>
                    <input className="w-full bg-white dark:bg-[#231910] border border-gray-200 dark:border-[#3e342b] rounded-lg px-4 py-2.5 text-gray-900 dark:text-[#EAE0D5] text-sm focus:ring-1 focus:ring-[#ec6d13] focus:border-[#ec6d13] outline-none transition-all" type="password" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-500 dark:text-[#8e7f72] uppercase tracking-wider">Confirm New Password</label>
                    <input className="w-full bg-white dark:bg-[#231910] border border-gray-200 dark:border-[#3e342b] rounded-lg px-4 py-2.5 text-gray-900 dark:text-[#EAE0D5] text-sm focus:ring-1 focus:ring-[#ec6d13] focus:border-[#ec6d13] outline-none transition-all" type="password" />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button className="bg-gray-200 dark:bg-[#3e342b] hover:bg-gray-300 dark:hover:bg-[#4a3f35] text-gray-700 dark:text-[#EAE0D5] px-5 py-2 rounded-lg text-sm font-medium transition-colors">
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          </section>
          
          <div className="flex w-full justify-end">
            <button className="flex items-center gap-2 bg-[#ec6d13] hover:bg-[#d65c0b] text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-lg shadow-[#ec6d13]/20 transition-all active:scale-95">
              <Save size={20} />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}