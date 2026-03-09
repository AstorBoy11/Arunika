"use client";

import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";

// Lazy-load all 5 modals as a single chunk â€” downloaded only when the user
// first opens any modal, keeping the initial settings page JS very lean.
const SettingsModals = dynamic(
  () => import("./_components/SettingsModals"),
  { ssr: false }
);
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
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [addressToDelete, setAddressToDelete] = useState<number | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    <div className="max-w-250 w-full mx-auto flex flex-col gap-10 pb-20">

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
          Kelola keamanan, alamat pengirimanmu, dan akun.
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
                Ganti Password
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
                        Hapus
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
          <button
            onClick={() => setShowDeleteAccountModal(true)}
            className="px-5 py-2.5 rounded-3xl bg-red-500 border border-red-500 text-white hover:bg-red-500/10 hover:text-red-500 transition-colors font-medium text-sm"
          >
            Hapus Akun
          </button>
        </div>
      </section>

      {/* SettingsModals â€” lazily loaded chunk, rendered only when any modal is open */}
      {(showPasswordModal || showAddressModal || showEditModal || showDeleteConfirm || showDeleteAccountModal) && (
        <SettingsModals
          isDark={isDark}
          showPassword={showPasswordModal}
          showAddress={showAddressModal}
          showEdit={showEditModal}
          showDeleteConfirm={showDeleteConfirm}
          showDeleteAccount={showDeleteAccountModal}
          selectedAddress={selectedAddress}
          addressToDelete={addressToDelete}
          onClosePassword={() => setShowPasswordModal(false)}
          onCloseAddress={() => setShowAddressModal(false)}
          onCloseEdit={() => setShowEditModal(false)}
          onCloseDeleteConfirm={() => setShowDeleteConfirm(false)}
          onCloseDeleteAccount={() => setShowDeleteAccountModal(false)}
          onSetSelectedAddress={setSelectedAddress}
          onConfirmDeleteAddress={() => handleDeleteAddress(addressToDelete!)}
        />
      )}

    </div>
  );
}
