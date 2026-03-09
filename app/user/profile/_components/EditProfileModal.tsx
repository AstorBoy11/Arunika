"use client";

import { useState } from "react";
import { Edit, User as UserIcon, Mail, Phone, X } from "lucide-react";

interface Props {
  isDark: boolean;
  initialName: string;
  initialEmail: string;
  initialPhone: string;
  onClose: () => void;
  onSave: (data: { name: string; email: string; phone: string }) => void;
}

const inputCls = (isDark: boolean) =>
  `w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#ec6d13] transition-all ${
    isDark
      ? "bg-[#120d0a] border-[#3e342b] text-white placeholder-[#8b7355]"
      : "bg-[#f5f0eb] border-[#e5ddd5] text-[#1a140e] placeholder-[#8b7355]"
  }`;

const labelCls = (isDark: boolean) =>
  `block text-sm font-medium mb-2 ${isDark ? "text-white" : "text-[#1a140e]"}`;

export default function EditProfileModal({
  isDark,
  initialName,
  initialEmail,
  initialPhone,
  onClose,
  onSave,
}: Props) {
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [phone, setPhone] = useState(initialPhone);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, email, phone });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`relative w-full max-w-md rounded-2xl border shadow-2xl p-6 animate-in zoom-in-95 duration-200 ${
          isDark
            ? "bg-[#1a140e] border-[#3e342b]"
            : "bg-white border-[#e5ddd5]"
        }`}
      >
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-lg transition-colors ${
            isDark
              ? "hover:bg-[#2a221b] text-[#b9a89d]"
              : "hover:bg-[#f5f0eb] text-[#8b7355]"
          }`}
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-[#ec6d13]/10">
            <Edit size={20} className="text-[#ec6d13]" />
          </div>
          <div>
            <h3
              className={`text-xl font-bold ${
                isDark ? "text-white" : "text-[#1a140e]"
              }`}
            >
              Edit Profil
            </h3>
            <p
              className={`text-sm ${
                isDark ? "text-[#b9a89d]" : "text-[#8b7355]"
              }`}
            >
              Perbarui informasi pribadi kamu.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className={labelCls(isDark)}>
              <span className="flex items-center gap-1.5">
                <UserIcon size={14} /> Nama Lengkap
              </span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Nama lengkap"
              className={inputCls(isDark)}
            />
          </div>

          <div>
            <label className={labelCls(isDark)}>
              <span className="flex items-center gap-1.5">
                <Mail size={14} /> Email
              </span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="email@contoh.com"
              className={inputCls(isDark)}
            />
          </div>

          <div>
            <label className={labelCls(isDark)}>
              <span className="flex items-center gap-1.5">
                <Phone size={14} /> Nomor Telepon
              </span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="08xx-xxxx-xxxx"
              className={inputCls(isDark)}
            />
          </div>

          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
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
  );
}
