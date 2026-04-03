"use client";

import { useState } from "react";
import { Home, Building2, X } from "lucide-react";

interface AddressData {
  label: string;
  type: "home" | "office";
  recipient: string;
  phone: string;
  street: string;
  city: string;
  postalCode: string;
  isDefault: boolean;
}

interface Props {
  isDark: boolean;
  isLoading?: boolean;
  errorMessage?: string | null;
  onClose: () => void;
  onSave: (data: AddressData) => void;
}

const inputCls = (isDark: boolean) =>
  `w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#ec6d13] transition-all ${
    isDark
      ? "bg-[#120d0a] border-[#3e342b] text-white placeholder-[#8b7355]"
      : "bg-[#f5f0eb] border-[#e5ddd5] text-[#1a140e] placeholder-[#8b7355]"
  }`;

const labelCls = (isDark: boolean) =>
  `block text-sm font-medium mb-2 ${isDark ? "text-white" : "text-[#1a140e]"}`;

export default function AddAddressModal({ isDark, isLoading = false, errorMessage = null, onClose, onSave }: Props) {
  const [label, setLabel] = useState("");
  const [type, setType] = useState<"home" | "office">("home");
  const [recipient, setRecipient] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [isDefault, setIsDefault] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ label: label || "Alamat Baru", type, recipient, phone, street, city, postalCode, isDefault });
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
        className={`relative w-full max-w-lg max-h-[90dvh] overflow-y-auto rounded-2xl border shadow-2xl p-6 animate-in zoom-in-95 duration-200 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${
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

        <div className="mb-6">
          <h3
            className={`text-xl font-bold ${
              isDark ? "text-white" : "text-[#1a140e]"
            }`}
          >
            Tambah Alamat Baru
          </h3>
          <p
            className={`text-sm mt-1 ${
              isDark ? "text-[#b9a89d]" : "text-[#8b7355]"
            }`}
          >
            Isi detail alamat pengiriman baru.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}

          {/* Address type */}
          <div>
            <label className={labelCls(isDark)}>Jenis Alamat</label>
            <div className="flex gap-3">
              {(["home", "office"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setType(t)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-medium transition-all ${
                    type === t
                      ? "bg-[#ec6d13]/10 border-[#ec6d13] text-[#ec6d13]"
                      : isDark
                      ? "border-[#3e342b] text-[#b9a89d] hover:border-[#ec6d13]"
                      : "border-[#e5ddd5] text-[#8b7355] hover:border-[#ec6d13]"
                  }`}
                >
                  {t === "home" ? <Home size={18} /> : <Building2 size={18} />}
                  {t === "home" ? "Rumah" : "Kantor"}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={labelCls(isDark)}>Label Alamat</label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Contoh: Rumah, Apartemen"
              className={inputCls(isDark)}
            />
          </div>

          <div>
            <label className={labelCls(isDark)}>Nama Penerima</label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              required
              placeholder="Nama lengkap penerima"
              className={inputCls(isDark)}
            />
          </div>

          <div>
            <label className={labelCls(isDark)}>Nomor Telepon</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="08xx-xxxx-xxxx"
              className={inputCls(isDark)}
            />
          </div>

          <div>
            <label className={labelCls(isDark)}>Alamat Lengkap</label>
            <textarea
              rows={3}
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              required
              placeholder="Jalan, nomor rumah, RT/RW, kelurahan, kecamatan"
              className={`${inputCls(isDark)} resize-none`}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className={labelCls(isDark)}>Kota</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Nama kota"
                className={inputCls(isDark)}
              />
            </div>
            <div>
              <label className={labelCls(isDark)}>Kode Pos</label>
              <input
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                placeholder="00000"
                className={inputCls(isDark)}
              />
            </div>
          </div>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={isDefault}
              onChange={(e) => setIsDefault(e.target.checked)}
              className="w-5 h-5 rounded border-2 text-[#ec6d13] focus:ring-[#ec6d13]"
            />
            <span className={`text-sm ${isDark ? "text-[#b9a89d]" : "text-[#8b7355]"}`}>
              Jadikan sebagai alamat utama
            </span>
          </label>

          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className={`flex-1 py-3 rounded-xl border font-medium text-sm transition-all ${
                isDark
                  ? "border-[#3e342b] text-[#b9a89d] hover:bg-[#2a221b]"
                  : "border-[#e5ddd5] text-[#8b7355] hover:bg-[#f5f0eb]"
              } disabled:opacity-60 disabled:cursor-not-allowed`}
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 py-3 rounded-xl bg-[#ec6d13] hover:bg-[#d65c0b] text-white font-bold text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? "Menyimpan..." : "Simpan Alamat"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
