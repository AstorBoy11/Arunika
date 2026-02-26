"use client";

import { useState, useRef, useEffect } from "react";
import {
  Shield,
  Key,
  Smartphone,
  MapPin,
  Plus,
  MoreVertical,
  Trash2,
  X,
  Eye,
  EyeOff,
  Edit,
  Home,
  Building2,
  Settings,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

// Types
interface Address {
  id: number;
  label: string;
  type: "home" | "office";
  name: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  phone: string;
  isDefault: boolean;
}

export default function SettingsPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Modal States
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [addressToDelete, setAddressToDelete] = useState<number | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Password form states
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  // Address data
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 1,
      label: "Rumah",
      type: "home",
      name: "Alex Morgan",
      street: "Jl. Kopi Robusta No. 45, Blok C",
      city: "Kecamatan Lowokwaru, Kota Malang",
      province: "Jawa Timur",
      postalCode: "65141",
      phone: "(+62) 812-3456-7890",
      isDefault: true,
    },
    {
      id: 2,
      label: "Kantor Pusat",
      type: "office",
      name: "Alex Morgan (Divisi IT)",
      street: "Gedung Cyber Coffee Lt. 3",
      city: "Jl. Jendral Sudirman Kav. 10",
      province: "Jakarta Selatan",
      postalCode: "12190",
      phone: "(+62) 812-3456-7890",
      isDefault: false,
    },
  ]);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Delete address
  const handleDeleteAddress = (id: number) => {
    setAddresses(prev => prev.filter(addr => addr.id !== id));
    setShowDeleteConfirm(false);
    setAddressToDelete(null);
  };

  // Open delete confirmation
  const openDeleteConfirm = (id: number) => {
    setAddressToDelete(id);
    setShowDeleteConfirm(true);
    setActiveDropdown(null);
  };

  // Open edit modal
  const openEditModal = (address: Address) => {
    setSelectedAddress(address);
    setShowEditModal(true);
    setActiveDropdown(null);
  };

  return (
    <div className="max-w-[1000px] w-full mx-auto flex flex-col gap-10 pb-20">

      {/* Header Halaman */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className={`p-2.5 rounded-xl ${isDark ? "bg-[#2a221b]" : "bg-[#fef5ee]"}`}>
            <Settings size={22} className="text-[#ec6d13]" />
          </div>
          <h2 className={`text-3xl font-bold ${isDark ? "text-white" : "text-[#1a140e]"}`}>
            Pengaturan Akun
          </h2>
        </div>
        <p className={isDark ? "text-[#b9a89d]" : "text-[#8b7355]"}>
          Kelola keamanan, preferensi notifikasi, dan alamat pengirimanmu.
        </p>
      </div>

      {/* --- SECTION 1: ACCOUNT SECURITY --- */}
      <section>
        <h3 className={`text-xl font-bold mb-6 flex items-center gap-2 ${isDark ? "text-white" : "text-[#1a140e]"}`}>
          <Shield className="text-[#ec6d13]" size={24} />
          Keamanan Akun
        </h3>

        <div className={`rounded-2xl border overflow-hidden ${isDark ? "bg-[#1a140e] border-[#3e342b]" : "bg-white border-[#e5ddd5]"
          }`}>
          <div className={`p-6 border-b ${isDark ? "border-[#3e342b]" : "border-[#e5ddd5]"}`}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl text-[#ec6d13] ${isDark ? "bg-[#2a221b]" : "bg-[#fef5ee]"}`}>
                  <Key size={20} />
                </div>
                <div>
                  <h4 className={`font-semibold text-lg ${isDark ? "text-white" : "text-[#1a140e]"}`}>
                    Ganti Password
                  </h4>
                  <p className={`text-sm mt-1 ${isDark ? "text-[#b9a89d]" : "text-[#8b7355]"}`}>
                    Perbarui password secara berkala agar akun tetap aman.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowPasswordModal(true)}
                className={`px-5 py-2 rounded-xl border text-sm font-medium transition-all whitespace-nowrap ${isDark
                  ? "bg-[#2a221b] border-[#3e342b] text-white hover:bg-[#3e342b] hover:text-[#ec6d13]"
                  : "bg-[#f5f0eb] border-[#e5ddd5] text-[#1a140e] hover:bg-[#ebe3db] hover:text-[#ec6d13]"
                  }`}
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 2: ALAMAT PENGIRIMAN --- */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h3 className={`text-xl font-bold flex items-center gap-2 ${isDark ? "text-white" : "text-[#1a140e]"}`}>
            <MapPin className="text-[#ec6d13]" size={24} />
            Alamat Pengiriman
          </h3>
          <button
            onClick={() => setShowAddressModal(true)}
            className="flex items-center gap-2 text-[#ec6d13] hover:text-[#d65c0b] transition-colors text-sm font-semibold"
          >
            <Plus size={18} />
            Tambah Alamat
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((address) => (
            <div
              key={address.id}
              className={`border rounded-2xl p-6 relative group transition-all ${address.isDefault
                ? isDark
                  ? "bg-[#1a140e] border-[#ec6d13]/50 hover:shadow-lg hover:shadow-[#ec6d13]/10"
                  : "bg-white border-[#ec6d13]/50 hover:shadow-lg hover:shadow-[#ec6d13]/10"
                : isDark
                  ? "bg-[#1a140e] border-[#3e342b] hover:border-[#ec6d13]/50"
                  : "bg-white border-[#e5ddd5] hover:border-[#ec6d13]/50"
                }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  {address.isDefault ? (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#ec6d13] text-white uppercase tracking-wider">
                      Utama
                    </span>
                  ) : (
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase tracking-wider ${isDark
                      ? "bg-[#2a221b] text-[#b9a89d] border-[#3e342b]"
                      : "bg-[#f5f0eb] text-[#8b7355] border-[#e5ddd5]"
                      }`}>
                      {address.type === "home" ? "Rumah" : "Kantor"}
                    </span>
                  )}
                  <span className={`font-bold ${isDark ? "text-white" : "text-[#1a140e]"}`}>
                    {address.label}
                  </span>
                </div>

                {/* Dropdown trigger */}
                <div className="relative" ref={activeDropdown === address.id ? dropdownRef : null}>
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === address.id ? null : address.id)}
                    className={`transition-colors p-1 rounded-lg ${isDark
                      ? "text-[#b9a89d] hover:text-white hover:bg-[#2a221b]"
                      : "text-[#8b7355] hover:text-[#1a140e] hover:bg-[#f5f0eb]"
                      }`}
                  >
                    <MoreVertical size={18} />
                  </button>

                  {/* Dropdown menu */}
                  {activeDropdown === address.id && (
                    <div className={`absolute right-0 mt-1 w-36 rounded-xl border shadow-xl z-20 overflow-hidden ${isDark
                        ? "bg-[#1a140e] border-[#3e342b]"
                        : "bg-white border-[#e5ddd5]"
                      }`}>
                      <button
                        onClick={() => openEditModal(address)}
                        className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm transition-colors ${isDark
                            ? "text-[#b9a89d] hover:bg-[#2a221b] hover:text-white"
                            : "text-[#8b7355] hover:bg-[#f5f0eb] hover:text-[#1a140e]"
                          }`}
                      >
                        <Edit size={16} />
                        Edit
                      </button>
                      <button
                        onClick={() => openDeleteConfirm(address.id)}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-500/10 transition-colors"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <h4 className={`font-semibold mb-1 ${isDark ? "text-white" : "text-[#1a140e]"}`}>
                  {address.name}
                </h4>
                <p className={`text-sm leading-relaxed ${isDark ? "text-[#b9a89d]" : "text-[#8b7355]"}`}>
                  {address.street}<br />
                  {address.city}<br />
                  {address.province}, {address.postalCode}
                </p>
                <p className={`text-sm mt-2 flex items-center gap-2 ${isDark ? "text-[#b9a89d]" : "text-[#8b7355]"}`}>
                  <Smartphone size={14} /> {address.phone}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- SECTION 3: DELETE ACCOUNT --- */}
      <section className={`pt-8 border-t ${isDark ? "border-[#3e342b]" : "border-[#e5ddd5]"}`}>
        <div className="flex justify-between items-center">
          <div>
            <h4 className="text-red-500 font-semibold mb-1 flex items-center gap-2">
              <Trash2 size={18} /> Hapus Akun
            </h4>
            <p className={`text-sm ${isDark ? "text-[#b9a89d]" : "text-[#8b7355]"}`}>
              Menghapus akun secara permanen dan menghilangkan semua data riwayat pesanan.
            </p>
          </div>
          <button className="px-5 py-2.5 rounded-3xl bg-red-500 border border-red-500 text-white hover:bg-red-500/10 hover:text-red-500 transition-colors font-medium text-sm">
            Hapus Akun
          </button>
        </div>
      </section>

      {/* ============ PASSWORD MODAL ============ */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowPasswordModal(false)}
          />

          {/* Modal */}
          <div className={`relative w-full max-w-md rounded-2xl border shadow-2xl p-6 ${isDark ? "bg-[#1a140e] border-[#3e342b]" : "bg-white border-[#e5ddd5]"
            }`}>
            {/* Close button */}
            <button
              onClick={() => setShowPasswordModal(false)}
              className={`absolute top-4 right-4 p-2 rounded-lg transition-colors ${isDark ? "hover:bg-[#2a221b] text-[#b9a89d]" : "hover:bg-[#f5f0eb] text-[#8b7355]"
                }`}
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div className="mb-6">
              <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-[#1a140e]"}`}>
                Ganti Password
              </h3>
              <p className={`text-sm mt-1 ${isDark ? "text-[#b9a89d]" : "text-[#8b7355]"}`}>
                Masukkan password lama dan password baru.
              </p>
            </div>

            {/* Form */}
            <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); setShowPasswordModal(false); }}>
              {/* Current Password */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? "text-white" : "text-[#1a140e]"}`}>
                  Password Saat Ini
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPass ? "text" : "password"}
                    className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#ec6d13] transition-all ${isDark
                      ? "bg-[#120d0a] border-[#3e342b] text-white placeholder-[#8b7355]"
                      : "bg-[#f5f0eb] border-[#e5ddd5] text-[#1a140e] placeholder-[#8b7355]"
                      }`}
                    placeholder="Masukkan password saat ini"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPass(!showCurrentPass)}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 ${isDark ? "text-[#8b7355]" : "text-[#8b7355]"}`}
                  >
                    {showCurrentPass ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? "text-white" : "text-[#1a140e]"}`}>
                  Password Baru
                </label>
                <div className="relative">
                  <input
                    type={showNewPass ? "text" : "password"}
                    className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#ec6d13] transition-all ${isDark
                      ? "bg-[#120d0a] border-[#3e342b] text-white placeholder-[#8b7355]"
                      : "bg-[#f5f0eb] border-[#e5ddd5] text-[#1a140e] placeholder-[#8b7355]"
                      }`}
                    placeholder="Masukkan password baru"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPass(!showNewPass)}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 ${isDark ? "text-[#8b7355]" : "text-[#8b7355]"}`}
                  >
                    {showNewPass ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? "text-white" : "text-[#1a140e]"}`}>
                  Konfirmasi Password Baru
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPass ? "text" : "password"}
                    className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#ec6d13] transition-all ${isDark
                      ? "bg-[#120d0a] border-[#3e342b] text-white placeholder-[#8b7355]"
                      : "bg-[#f5f0eb] border-[#e5ddd5] text-[#1a140e] placeholder-[#8b7355]"
                      }`}
                    placeholder="Ulangi password baru"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPass(!showConfirmPass)}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 ${isDark ? "text-[#8b7355]" : "text-[#8b7355]"}`}
                  >
                    {showConfirmPass ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className={`flex-1 py-3 rounded-xl border font-medium text-sm transition-all ${isDark
                    ? "border-[#3e342b] text-[#b9a89d] hover:bg-[#2a221b]"
                    : "border-[#e5ddd5] text-[#8b7355] hover:bg-[#f5f0eb]"
                    }`}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-[#ec6d13] hover:bg-[#d65c0b] text-white font-bold text-sm transition-all"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============ ADD ADDRESS MODAL ============ */}
      {showAddressModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowAddressModal(false)}
          />

          {/* Modal */}
          <div className={`relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border shadow-2xl p-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${isDark ? "bg-[#1a140e] border-[#3e342b]" : "bg-white border-[#e5ddd5]"
            }`}>
            {/* Close button */}
            <button
              onClick={() => setShowAddressModal(false)}
              className={`absolute top-4 right-4 p-2 rounded-lg transition-colors ${isDark ? "hover:bg-[#2a221b] text-[#b9a89d]" : "hover:bg-[#f5f0eb] text-[#8b7355]"
                }`}
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div className="mb-6">
              <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-[#1a140e]"}`}>
                Tambah Alamat Baru
              </h3>
              <p className={`text-sm mt-1 ${isDark ? "text-[#b9a89d]" : "text-[#8b7355]"}`}>
                Isi detail alamat pengiriman baru.
              </p>
            </div>

            {/* Form */}
            <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); setShowAddressModal(false); }}>
              {/* Address Type */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? "text-white" : "text-[#1a140e]"}`}>
                  Jenis Alamat
                </label>
                <div className="flex gap-3">
                  <button type="button" className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-medium transition-all ${isDark
                    ? "bg-[#ec6d13]/10 border-[#ec6d13] text-[#ec6d13]"
                    : "bg-[#ec6d13]/10 border-[#ec6d13] text-[#ec6d13]"
                    }`}>
                    <Home size={18} />
                    Rumah
                  </button>
                  <button type="button" className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-medium transition-all ${isDark
                    ? "border-[#3e342b] text-[#b9a89d] hover:border-[#ec6d13]"
                    : "border-[#e5ddd5] text-[#8b7355] hover:border-[#ec6d13]"
                    }`}>
                    <Building2 size={18} />
                    Kantor
                  </button>
                </div>
              </div>

              {/* Label */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? "text-white" : "text-[#1a140e]"}`}>
                  Label Alamat
                </label>
                <input
                  type="text"
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#ec6d13] transition-all ${isDark
                    ? "bg-[#120d0a] border-[#3e342b] text-white placeholder-[#8b7355]"
                    : "bg-[#f5f0eb] border-[#e5ddd5] text-[#1a140e] placeholder-[#8b7355]"
                    }`}
                  placeholder="Contoh: Rumah, Kantor, Apartemen"
                />
              </div>

              {/* Recipient Name */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? "text-white" : "text-[#1a140e]"}`}>
                  Nama Penerima
                </label>
                <input
                  type="text"
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#ec6d13] transition-all ${isDark
                    ? "bg-[#120d0a] border-[#3e342b] text-white placeholder-[#8b7355]"
                    : "bg-[#f5f0eb] border-[#e5ddd5] text-[#1a140e] placeholder-[#8b7355]"
                    }`}
                  placeholder="Nama lengkap penerima"
                />
              </div>

              {/* Phone */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? "text-white" : "text-[#1a140e]"}`}>
                  Nomor Telepon
                </label>
                <input
                  type="tel"
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#ec6d13] transition-all ${isDark
                    ? "bg-[#120d0a] border-[#3e342b] text-white placeholder-[#8b7355]"
                    : "bg-[#f5f0eb] border-[#e5ddd5] text-[#1a140e] placeholder-[#8b7355]"
                    }`}
                  placeholder="08xx-xxxx-xxxx"
                />
              </div>

              {/* Full Address */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? "text-white" : "text-[#1a140e]"}`}>
                  Alamat Lengkap
                </label>
                <textarea
                  rows={3}
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#ec6d13] transition-all resize-none ${isDark
                    ? "bg-[#120d0a] border-[#3e342b] text-white placeholder-[#8b7355]"
                    : "bg-[#f5f0eb] border-[#e5ddd5] text-[#1a140e] placeholder-[#8b7355]"
                    }`}
                  placeholder="Jalan, nomor rumah, RT/RW, kelurahan, kecamatan"
                />
              </div>

              {/* City & Postal Code */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? "text-white" : "text-[#1a140e]"}`}>
                    Kota
                  </label>
                  <input
                    type="text"
                    className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#ec6d13] transition-all ${isDark
                      ? "bg-[#120d0a] border-[#3e342b] text-white placeholder-[#8b7355]"
                      : "bg-[#f5f0eb] border-[#e5ddd5] text-[#1a140e] placeholder-[#8b7355]"
                      }`}
                    placeholder="Nama kota"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? "text-white" : "text-[#1a140e]"}`}>
                    Kode Pos
                  </label>
                  <input
                    type="text"
                    className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#ec6d13] transition-all ${isDark
                      ? "bg-[#120d0a] border-[#3e342b] text-white placeholder-[#8b7355]"
                      : "bg-[#f5f0eb] border-[#e5ddd5] text-[#1a140e] placeholder-[#8b7355]"
                      }`}
                    placeholder="00000"
                  />
                </div>
              </div>

              {/* Set as Default */}
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-5 h-5 rounded border-2 text-[#ec6d13] focus:ring-[#ec6d13]" />
                <span className={`text-sm ${isDark ? "text-[#b9a89d]" : "text-[#8b7355]"}`}>
                  Jadikan sebagai alamat utama
                </span>
              </label>

              {/* Buttons */}
              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowAddressModal(false)}
                  className={`flex-1 py-3 rounded-xl border font-medium text-sm transition-all ${
                    isDark
                      ? "border-[#3e342b] text-[#b9a89d] hover:bg-[#2a221b]"
                      : "border-[#e5ddd5] text-[#8b7355] hover:bg-[#f5f0eb]"
                  }`}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-[#ec6d13] hover:bg-[#d65c0b] text-white font-bold text-sm transition-all"
                >
                  Simpan Alamat
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============ EDIT ADDRESS MODAL ============ */}
      {showEditModal && selectedAddress && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowEditModal(false)}
          />

          {/* Modal */}
          <div className={`relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border shadow-2xl p-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${
            isDark ? "bg-[#1a140e] border-[#3e342b]" : "bg-white border-[#e5ddd5]"
          }`}>
            {/* Close button */}
            <button 
              onClick={() => setShowEditModal(false)}
              className={`absolute top-4 right-4 p-2 rounded-lg transition-colors ${
                isDark ? "hover:bg-[#2a221b] text-[#b9a89d]" : "hover:bg-[#f5f0eb] text-[#8b7355]"
              }`}
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div className="mb-6">
              <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-[#1a140e]"}`}>
                Edit Alamat
              </h3>
              <p className={`text-sm mt-1 ${isDark ? "text-[#b9a89d]" : "text-[#8b7355]"}`}>
                Perbarui detail alamat pengiriman.
              </p>
            </div>

            {/* Form */}
            <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); setShowEditModal(false); }}>
              {/* Address Type */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? "text-white" : "text-[#1a140e]"}`}>
                  Jenis Alamat
                </label>
                <div className="flex gap-3">
                  <button type="button" className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-medium transition-all ${
                    selectedAddress.type === "home"
                      ? "bg-[#ec6d13]/10 border-[#ec6d13] text-[#ec6d13]"
                      : isDark 
                        ? "border-[#3e342b] text-[#b9a89d] hover:border-[#ec6d13]" 
                        : "border-[#e5ddd5] text-[#8b7355] hover:border-[#ec6d13]"
                  }`}>
                    <Home size={18} />
                    Rumah
                  </button>
                  <button type="button" className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-medium transition-all ${
                    selectedAddress.type === "office"
                      ? "bg-[#ec6d13]/10 border-[#ec6d13] text-[#ec6d13]"
                      : isDark 
                        ? "border-[#3e342b] text-[#b9a89d] hover:border-[#ec6d13]" 
                        : "border-[#e5ddd5] text-[#8b7355] hover:border-[#ec6d13]"
                  }`}>
                    <Building2 size={18} />
                    Kantor
                  </button>
                </div>
              </div>

              {/* Label */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? "text-white" : "text-[#1a140e]"}`}>
                  Label Alamat
                </label>
                <input 
                  type="text"
                  defaultValue={selectedAddress.label}
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#ec6d13] transition-all ${
                    isDark 
                      ? "bg-[#120d0a] border-[#3e342b] text-white placeholder-[#8b7355]" 
                      : "bg-[#f5f0eb] border-[#e5ddd5] text-[#1a140e] placeholder-[#8b7355]"
                  }`}
                />
              </div>

              {/* Recipient Name */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? "text-white" : "text-[#1a140e]"}`}>
                  Nama Penerima
                </label>
                <input 
                  type="text"
                  defaultValue={selectedAddress.name}
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#ec6d13] transition-all ${
                    isDark 
                      ? "bg-[#120d0a] border-[#3e342b] text-white placeholder-[#8b7355]" 
                      : "bg-[#f5f0eb] border-[#e5ddd5] text-[#1a140e] placeholder-[#8b7355]"
                  }`}
                />
              </div>

              {/* Phone */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? "text-white" : "text-[#1a140e]"}`}>
                  Nomor Telepon
                </label>
                <input 
                  type="tel"
                  defaultValue={selectedAddress.phone}
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#ec6d13] transition-all ${
                    isDark 
                      ? "bg-[#120d0a] border-[#3e342b] text-white placeholder-[#8b7355]" 
                      : "bg-[#f5f0eb] border-[#e5ddd5] text-[#1a140e] placeholder-[#8b7355]"
                  }`}
                />
              </div>

              {/* Full Address */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? "text-white" : "text-[#1a140e]"}`}>
                  Alamat Lengkap
                </label>
                <textarea 
                  rows={3}
                  defaultValue={selectedAddress.street}
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#ec6d13] transition-all resize-none ${
                    isDark 
                      ? "bg-[#120d0a] border-[#3e342b] text-white placeholder-[#8b7355]" 
                      : "bg-[#f5f0eb] border-[#e5ddd5] text-[#1a140e] placeholder-[#8b7355]"
                  }`}
                />
              </div>

              {/* City & Postal Code */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? "text-white" : "text-[#1a140e]"}`}>
                    Kota
                  </label>
                  <input 
                    type="text"
                    defaultValue={selectedAddress.city}
                    className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#ec6d13] transition-all ${
                      isDark 
                        ? "bg-[#120d0a] border-[#3e342b] text-white placeholder-[#8b7355]" 
                        : "bg-[#f5f0eb] border-[#e5ddd5] text-[#1a140e] placeholder-[#8b7355]"
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? "text-white" : "text-[#1a140e]"}`}>
                    Kode Pos
                  </label>
                  <input 
                    type="text"
                    defaultValue={selectedAddress.postalCode}
                    className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#ec6d13] transition-all ${
                      isDark 
                        ? "bg-[#120d0a] border-[#3e342b] text-white placeholder-[#8b7355]" 
                        : "bg-[#f5f0eb] border-[#e5ddd5] text-[#1a140e] placeholder-[#8b7355]"
                    }`}
                  />
                </div>
              </div>

              {/* Set as Default */}
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  defaultChecked={selectedAddress.isDefault}
                  className="w-5 h-5 rounded border-2 text-[#ec6d13] focus:ring-[#ec6d13]" 
                />
                <span className={`text-sm ${isDark ? "text-[#b9a89d]" : "text-[#8b7355]"}`}>
                  Jadikan sebagai alamat utama
                </span>
              </label>

              {/* Buttons */}
              <div className="flex gap-3 mt-4">
                <button 
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className={`flex-1 py-3 rounded-xl border font-medium text-sm transition-all ${
                    isDark 
                      ? "border-[#3e342b] text-[#b9a89d] hover:bg-[#2a221b]" 
                      : "border-[#e5ddd5] text-[#8b7355] hover:bg-[#f5f0eb]"
                  }`}
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-[#ec6d13] hover:bg-[#d65c0b] text-white font-bold text-sm transition-all"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============ DELETE CONFIRMATION MODAL ============ */}
      {showDeleteConfirm && addressToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowDeleteConfirm(false)}
          />

          {/* Modal */}
          <div className={`relative w-full max-w-sm rounded-2xl border shadow-2xl p-6 ${
            isDark ? "bg-[#1a140e] border-[#3e342b]" : "bg-white border-[#e5ddd5]"
          }`}>
            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className="p-4 rounded-full bg-red-500/10">
                <Trash2 size={32} className="text-red-500" />
              </div>
            </div>

            {/* Content */}
            <div className="text-center mb-6">
              <h3 className={`text-xl font-bold mb-2 ${isDark ? "text-white" : "text-[#1a140e]"}`}>
                Hapus Alamat?
              </h3>
              <p className={`text-sm ${isDark ? "text-[#b9a89d]" : "text-[#8b7355]"}`}>
                Apakah kamu yakin ingin menghapus alamat ini? Tindakan ini tidak dapat dibatalkan.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button 
                onClick={() => setShowDeleteConfirm(false)}
                className={`flex-1 py-3 rounded-xl border font-medium text-sm transition-all ${
                  isDark 
                    ? "border-[#3e342b] text-[#b9a89d] hover:bg-[#2a221b]" 
                    : "border-[#e5ddd5] text-[#8b7355] hover:bg-[#f5f0eb]"
                }`}
              >
                Batal
              </button>
              <button 
                onClick={() => handleDeleteAddress(addressToDelete)}
                className="flex-1 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold text-sm transition-all"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}