"use client";

import { useState } from "react";
import AdminHeader from "@/components/admin-header";
import {
  Save,
  Store,
  UploadCloud,
  Clock,
  CalendarClock,
  CreditCard,
  Banknote,
  ShieldCheck,
  Lock
} from "lucide-react";

export default function AdminSettings() {
  const [isStoreOpen, setIsStoreOpen] = useState(true);
  const [openTime, setOpenTime] = useState("08:00");
  const [closeTime, setCloseTime] = useState("22:00");

  const cardClass =
    "bg-white dark:bg-[#1a140e] rounded-xl border border-gray-200 dark:border-[#3e342b] p-6 shadow-sm dark:shadow-none transition-colors";

  return (
    <div className="flex flex-col h-full w-full bg-gray-50 dark:bg-[#120d0a]">
      {/* 1. HEADER */}
      <AdminHeader
        title="System Settings"
      >
      </AdminHeader>

      {/* 2. MAIN CONTENT */}
      <div className="flex-1 overflow-y-auto p-8 pt-6 custom-scrollbar">
        <div className="max-w-4xl mx-auto space-y-6 pb-12">

          {/* SECTION 1: STORE PROFILE */}
          <section className={cardClass}>
            <div className="flex items-center gap-2 mb-6 border-b border-gray-200 dark:border-[#3e342b] pb-4">
              <Store className="text-[#ec6d13]" size={24} />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Profil Toko</h3>
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
                <p className="text-xs text-gray-500 dark:text-[#8e7f72]">PNG atau JPG, maks 2MB</p>
              </div>

              {/* Form Fields */}
              <div className="flex-1 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-500 dark:text-[#8e7f72] uppercase tracking-wider">Nama Toko</label>
                    <input
                      className="w-full bg-white dark:bg-[#231910] border border-gray-200 dark:border-[#3e342b] rounded-lg px-4 py-2.5 text-gray-900 dark:text-[#EAE0D5] text-sm focus:ring-1 focus:ring-[#ec6d13] focus:border-[#ec6d13] outline-none transition-all placeholder-gray-400"
                      type="text"
                      defaultValue="Coffee Connect Downtown"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 2: OPERATING HOURS (FIXED FOR MOBILE) */}
          <section className={cardClass}>
            <div className="flex items-center gap-2 mb-6 border-b border-gray-200 dark:border-[#3e342b] pb-4">
              <Clock className="text-[#ec6d13]" size={24} />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Jam Operasional</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Weekdays */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-gray-700 dark:text-[#EAE0D5]">Weekdays (Senin - Jumat)</h4>
                {/* UBAH: Tambah flex-col untuk mobile, sm:flex-row untuk tablet ke atas */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                  <div className="space-y-1 w-full sm:flex-1">
                    <label className="text-xs text-gray-500 dark:text-[#8e7f72]">Buka</label>
                    <input className="w-full bg-white dark:bg-[#231910] border border-gray-200 dark:border-[#3e342b] rounded-lg px-3 py-2 text-gray-900 dark:text-[#EAE0D5] text-sm focus:border-[#ec6d13] outline-none" type="time" defaultValue="06:00" />
                  </div>
                  {/* Sembunyikan tanda strip (-) di mobile agar layout vertikal lebih rapi */}
                  <span className="hidden sm:block text-gray-400 dark:text-[#8e7f72] mt-5">-</span>
                  <div className="space-y-1 w-full sm:flex-1">
                    <label className="text-xs text-gray-500 dark:text-[#8e7f72]">Tutup</label>
                    <input className="w-full bg-white dark:bg-[#231910] border border-gray-200 dark:border-[#3e342b] rounded-lg px-3 py-2 text-gray-900 dark:text-[#EAE0D5] text-sm focus:border-[#ec6d13] outline-none" type="time" defaultValue="20:00" />
                  </div>
                </div>
              </div>

              {/* Weekends */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-gray-700 dark:text-[#EAE0D5]">Weekends (Sabtu - Minggu)</h4>
                {/* UBAH: Sama seperti di atas, gunakan flex-col untuk mobile */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                  <div className="space-y-1 w-full sm:flex-1">
                    <label className="text-xs text-gray-500 dark:text-[#8e7f72]">Buka</label>
                    <input className="w-full bg-white dark:bg-[#231910] border border-gray-200 dark:border-[#3e342b] rounded-lg px-3 py-2 text-gray-900 dark:text-[#EAE0D5] text-sm focus:border-[#ec6d13] outline-none" type="time" defaultValue="07:00" />
                  </div>
                  <span className="hidden sm:block text-gray-400 dark:text-[#8e7f72] mt-5">-</span>
                  <div className="space-y-1 w-full sm:flex-1">
                    <label className="text-xs text-gray-500 dark:text-[#8e7f72]">Tutup</label>
                    <input className="w-full bg-white dark:bg-[#231910] border border-gray-200 dark:border-[#3e342b] rounded-lg px-3 py-2 text-gray-900 dark:text-[#EAE0D5] text-sm focus:border-[#ec6d13] outline-none" type="time" defaultValue="22:00" />
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* SECTION 3: PENGATURAN JAM OPERASIONAL */}
          <section className={cardClass}>
            <div className="flex items-center gap-2 mb-6 border-b border-gray-200 dark:border-[#3e342b] pb-4">
              <CalendarClock className="text-[#ec6d13]" size={24} />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Pengaturan Jam Operasional</h3>
            </div>

            <div className="space-y-6">
              {/* Store Status Toggle */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg bg-gray-50 dark:bg-[#231910] border border-gray-200 dark:border-[#3e342b]">
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-[#EAE0D5]">Status Toko</p>
                  <p className="text-xs text-gray-500 dark:text-[#8e7f72] mt-0.5">
                    {isStoreOpen
                      ? "Toko sedang buka dan menerima pesanan"
                      : "Toko tutup sementara, pesanan dinonaktifkan"}
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span
                    className={`text-xs font-semibold transition-colors ${
                      isStoreOpen ? "text-green-500" : "text-red-400"
                    }`}
                  >
                    {isStoreOpen ? "Toko Buka" : "Tutup Sementara"}
                  </span>
                  <button
                    onClick={() => setIsStoreOpen(!isStoreOpen)}
                    role="switch"
                    aria-checked={isStoreOpen}
                    className={`relative inline-flex h-7 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ec6d13] focus-visible:ring-offset-2 ${
                      isStoreOpen ? "bg-[#ec6d13]" : "bg-gray-300 dark:bg-[#4a3f35]"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                        isStoreOpen ? "translate-x-7" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Time Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-500 dark:text-[#8e7f72] uppercase tracking-wider">
                    Jam Buka
                  </label>
                  <input
                    type="time"
                    value={openTime}
                    onChange={(e) => setOpenTime(e.target.value)}
                    className="w-full bg-white dark:bg-[#231910] border border-gray-200 dark:border-[#3e342b] rounded-lg px-4 py-2.5 text-gray-900 dark:text-[#EAE0D5] text-sm focus:ring-1 focus:ring-[#ec6d13] focus:border-[#ec6d13] outline-none transition-all scheme-light dark:scheme-dark"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-500 dark:text-[#8e7f72] uppercase tracking-wider">
                    Jam Tutup
                  </label>
                  <input
                    type="time"
                    value={closeTime}
                    onChange={(e) => setCloseTime(e.target.value)}
                    className="w-full bg-white dark:bg-[#231910] border border-gray-200 dark:border-[#3e342b] rounded-lg px-4 py-2.5 text-gray-900 dark:text-[#EAE0D5] text-sm focus:ring-1 focus:ring-[#ec6d13] focus:border-[#ec6d13] outline-none transition-all scheme-light dark:scheme-dark"
                  />
                </div>
              </div>

              {/* Save Button */}
              <div className="pt-2 flex justify-end">
                <button className="flex items-center gap-2 bg-[#ec6d13] hover:bg-[#d65c0b] text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-md shadow-[#ec6d13]/20 transition-all active:scale-95">
                  <Save size={16} />
                  <span>Simpan Perubahan</span>
                </button>
              </div>
            </div>
          </section>

          {/* SECTION 4: SECURITY */}
          <section className={cardClass}>
            <div className="flex items-center gap-2 mb-6 border-b border-gray-200 dark:border-[#3e342b] pb-4">
              <ShieldCheck className="text-[#ec6d13]" size={24} />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Keamanan</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              <div className="md:col-span-1">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-[#EAE0D5]">Ganti Password</h4>
                <p className="text-xs text-gray-500 dark:text-[#8e7f72] mt-1">Pastikan akun Anda menggunakan password yang panjang dan acak untuk tetap aman.</p>
              </div>

              <div className="md:col-span-2 space-y-4">
                <div className="space-y-1.5 relative">
                  <label className="text-xs font-medium text-gray-500 dark:text-[#8e7f72] uppercase tracking-wider">Password Saat Ini</label>
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
                    <label className="text-xs font-medium text-gray-500 dark:text-[#8e7f72] uppercase tracking-wider">Password Baru</label>
                    <input className="w-full bg-white dark:bg-[#231910] border border-gray-200 dark:border-[#3e342b] rounded-lg px-4 py-2.5 text-gray-900 dark:text-[#EAE0D5] text-sm focus:ring-1 focus:ring-[#ec6d13] focus:border-[#ec6d13] outline-none transition-all" type="password" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-500 dark:text-[#8e7f72] uppercase tracking-wider">Konfirmasi Password Baru</label>
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
              <span>Simpan Perubahan</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
