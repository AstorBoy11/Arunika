"use client";

import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

// ─── Lazy-loaded modals ─────────────────────────────────────────────────────
// These chunks are only downloaded when the user opens a modal, so they never
// appear in the initial JS bundle.
const EditProfileModal = dynamic(
  () => import("./_components/EditProfileModal"),
  { ssr: false }
);
const AddAddressModal = dynamic(
  () => import("./_components/AddAddressModal"),
  { ssr: false }
);
import {
  Edit,
  Pencil,
  Plus,
  Home,
  Building2,
  MapPin,
  CheckCircle2,
  Mail,
  Phone,
  User as UserIcon,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

// ─── Types & Dummy Data ───────────────────────────────────────────────────────

interface ProfileData {
  name: string;
  email: string;
  phone: string;
}

interface Address {
  id: number;
  label: string;
  type: "home" | "office";
  recipient: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  phone: string;
  isDefault: boolean;
}

const INITIAL_PROFILE: ProfileData = {
  name: "Alex Morgan",
  email: "alex.morgan@coffee.com",
  phone: "+62 812-3456-7890",
};

const INITIAL_ADDRESSES: Address[] = [
  {
    id: 1,
    label: "Rumah",
    type: "home",
    recipient: "Alex Morgan",
    street: "452 Pike Street, Apt 8B",
    city: "Seattle, WA 98101",
    province: "Washington",
    postalCode: "98101",
    phone: "+62 812-3456-7890",
    isDefault: true,
  },
  {
    id: 2,
    label: "Kantor Pusat",
    type: "office",
    recipient: "Alex Morgan (Divisi IT)",
    street: "2000 Tech Boulevard, Suite 500",
    city: "Bellevue, WA 98004",
    province: "Washington",
    postalCode: "98004",
    phone: "+62 812-3456-7890",
    isDefault: false,
  },
];

// ─── Input class helper ───────────────────────────────────────────────────────

const inputCls = (isDark: boolean) =>
  `w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#ec6d13] transition-all ${
    isDark
      ? "bg-[#120d0a] border-[#3e342b] text-white placeholder-[#8b7355]"
      : "bg-[#f5f0eb] border-[#e5ddd5] text-[#1a140e] placeholder-[#8b7355]"
  }`;

const labelCls = (isDark: boolean) =>
  `block text-sm font-medium mb-2 ${isDark ? "text-white" : "text-[#1a140e]"}`;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function UserProfile() {
  const { theme, mounted } = useTheme();
  const isDark = mounted && theme === "dark";

  const [profile, setProfile] = useState<ProfileData>(INITIAL_PROFILE);
  const [addresses, setAddresses] = useState<Address[]>(INITIAL_ADDRESSES);

  // ── Modal visibility ──
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showAddAddress, setShowAddAddress] = useState(false);

  // Form state now lives inside each modal component; the page just holds the
  // visibility flag and the save callbacks.

  const handleSaveProfile = (data: { name: string; email: string; phone: string }) => {
    setProfile(data);
    setShowEditProfile(false);
  };

  const handleSaveAddress = (data: {
    label: string;
    type: "home" | "office";
    recipient: string;
    phone: string;
    street: string;
    city: string;
    postalCode: string;
    isDefault: boolean;
  }) => {
    const newAddr: Address = { id: Date.now(), province: "", ...data };
    setAddresses((prev) =>
      data.isDefault
        ? [newAddr, ...prev.map((a) => ({ ...a, isDefault: false }))]
        : [...prev, newAddr],
    );
    setShowAddAddress(false);
  };

  return (
    <div className="max-w-300 mx-auto w-full flex flex-col gap-8 pb-20">
      {/* ── HEADER ─────────────────────────────────────────────────────── */}
      <div
        className={`flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-6 border-b ${
          isDark ? "border-[#3e342b]" : "border-[#e5ddd5]"
        }`}
      >
        <div className="flex items-center gap-6">
          {/* Avatar */}
          <div className="relative group">
            <div
              className={`relative w-28 h-28 rounded-full border-4 shadow-2xl overflow-hidden ${
                isDark ? "border-[#1a140e]" : "border-white"
              }`}
            >
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2GmZQePWPY04wHlVPH7g2QechnIQhqr-oZQY35eO03gOTMRZT0T5GiSUL_P2shWFbkumDQ5nZG9meggW2Ue_5QoK3xIQeiSO6WSq-Vq_UI5-GJnkbAA7mTvlFrsRPvs4ZPqcE-2oI6EGqR0oJe33z1XydzPgbdW-aHPkOeOvJV1xacWdkSfHJu7pRSGJ_8x0tOmrDi6G00Gq7LOwFzNPHhmHf5oydaiE-D6ueg-TdCHj9yQm37IUtDqXdlP-eeKsK6igXmU_1mfFC"
                alt="Profile Picture"
                fill
                className="object-cover"
                priority
              />
            </div>
            <button className="absolute bottom-1 right-1 p-2 bg-[#ec6d13] rounded-full text-white shadow-lg hover:bg-[#d65c0b] transition-colors z-10">
              <Pencil size={16} />
            </button>
          </div>

          {/* Name & Email */}
          <div>
            <h1
              className={`text-4xl font-bold mb-1 ${
                isDark ? "text-white" : "text-[#1a140e]"
              }`}
            >
              {profile.name}
            </h1>
            <p
              className={`text-sm ${isDark ? "text-[#b9a89d]" : "text-[#8b7355]"}`}
            >
              {profile.email}
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowEditProfile(true)}
          className="flex items-center gap-2 px-6 py-3 bg-[#ec6d13] text-white font-bold rounded-xl shadow-[0_4px_12px_rgba(236,109,19,0.3)] hover:shadow-[0_6px_16px_rgba(236,109,19,0.4)] hover:bg-[#d65d0a] transition-all"
        >
          <Edit size={20} />
          Edit Profil
        </button>
      </div>

      {/* ── CONTENT GRID ───────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT: Personal Info */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <h3
            className={`text-xl font-bold ${isDark ? "text-white" : "text-[#1a140e]"}`}
          >
            Informasi Pribadi
          </h3>

          <div
            className={`rounded-2xl p-6 border shadow-lg flex flex-col gap-6 ${
              isDark
                ? "bg-[#1a140e] border-[#3e342b]"
                : "bg-white border-[#e5ddd5]"
            }`}
          >
            {[
              {
                icon: <UserIcon size={14} />,
                label: "Nama Lengkap",
                value: profile.name,
              },
              {
                icon: <Mail size={14} />,
                label: "Alamat Email",
                value: profile.email,
              },
              {
                icon: <Phone size={14} />,
                label: "Nomor Telepon",
                value: profile.phone,
              },
            ].map(({ icon, label, value }, i, arr) => (
              <div key={label}>
                <p
                  className={`flex items-center gap-2 text-xs uppercase font-bold tracking-wider mb-1.5 ${
                    isDark ? "text-[#b9a89d]" : "text-[#8b7355]"
                  }`}
                >
                  {icon}
                  {label}
                </p>
                <p
                  className={`font-medium text-lg ${
                    isDark ? "text-white" : "text-[#1a140e]"
                  }`}
                >
                  {value}
                </p>
                {i < arr.length - 1 && (
                  <div
                    className={`mt-6 h-px ${
                      isDark ? "bg-[#3e342b]/50" : "bg-[#e5ddd5]"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Addresses */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3
              className={`text-xl font-bold flex items-center gap-2 ${
                isDark ? "text-white" : "text-[#1a140e]"
              }`}
            >
              <MapPin size={22} className="text-[#ec6d13]" />
              Alamat Pengiriman
            </h3>
            <button
              onClick={() => setShowAddAddress(true)}
              className="flex items-center gap-2 text-[#ec6d13] hover:text-[#d65c0b] transition-colors text-sm font-semibold"
            >
              <Plus size={18} />
              Tambah Alamat
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addresses.map((addr) => (
              <div
                key={addr.id}
                className={`rounded-2xl p-6 border shadow-lg relative group transition-all ${
                  addr.isDefault
                    ? isDark
                      ? "bg-[#1a140e] border-[#ec6d13]/40 hover:bg-[#1e1711]"
                      : "bg-white border-[#ec6d13]/40 hover:bg-[#fef9f5]"
                    : isDark
                      ? "bg-[#1a140e] border-[#3e342b] hover:border-[#b9a89d]/30"
                      : "bg-white border-[#e5ddd5] hover:border-[#8b7355]/30"
                }`}
              >
                {addr.isDefault && (
                  <div className="absolute top-5 right-5 text-[#ec6d13]">
                    <CheckCircle2 size={22} />
                  </div>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`p-2 rounded-lg ${
                      addr.isDefault
                        ? "bg-[#fef5ee] text-[#ec6d13]"
                        : isDark
                          ? "bg-[#231910] text-[#b9a89d]"
                          : "bg-[#f5f0eb] text-[#8b7355]"
                    }`}
                  >
                    {addr.type === "home" ? (
                      <Home size={22} />
                    ) : (
                      <Building2 size={22} />
                    )}
                  </div>
                  <div>
                    <h4
                      className={`font-bold ${
                        isDark ? "text-white" : "text-[#1a140e]"
                      }`}
                    >
                      {addr.label}
                    </h4>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider ${
                        addr.isDefault
                          ? "text-[#ec6d13]"
                          : isDark
                            ? "text-[#b9a89d]"
                            : "text-[#8b7355]"
                      }`}
                    >
                      {addr.isDefault
                        ? "Utama"
                        : addr.type === "home"
                          ? "Rumah"
                          : "Kantor"}
                    </span>
                  </div>
                </div>

                <p
                  className={`text-sm leading-relaxed mb-2 ${
                    isDark ? "text-[#b9a89d]" : "text-[#8b7355]"
                  }`}
                >
                  {addr.recipient}
                </p>
                <p
                  className={`text-sm leading-relaxed mb-4 ${
                    isDark ? "text-[#b9a89d]" : "text-[#8b7355]"
                  }`}
                >
                  {addr.street}
                  <br />
                  {addr.city}
                  {addr.postalCode && `, ${addr.postalCode}`}
                </p>

                <div
                  className={`flex items-center gap-4 pt-4 border-t ${
                    isDark ? "border-[#3e342b]/50" : "border-[#e5ddd5]"
                  }`}
                >
                  {!addr.isDefault && (
                    <button
                      onClick={() =>
                        setAddresses((prev) =>
                          prev.map((a) => ({
                            ...a,
                            isDefault: a.id === addr.id,
                          })),
                        )
                      }
                      className={`text-xs font-bold hover:text-[#ec6d13] transition-colors ${
                        isDark ? "text-[#b9a89d]" : "text-[#8b7355]"
                      }`}
                    >
                      Set Utama
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
                MODAL: EDIT PROFIL
            ══════════════════════════════════════════════════════════════════ */}
      {/* EditProfileModal — lazily loaded chunk */}
      {showEditProfile && (
        <EditProfileModal
          isDark={isDark}
          initialName={profile.name}
          initialEmail={profile.email}
          initialPhone={profile.phone}
          onClose={() => setShowEditProfile(false)}
          onSave={handleSaveProfile}
        />
      )}

      {/* AddAddressModal — lazily loaded chunk */}
      {showAddAddress && (
        <AddAddressModal
          isDark={isDark}
          onClose={() => setShowAddAddress(false)}
          onSave={handleSaveAddress}
        />
      )}
    </div>
  );
}
