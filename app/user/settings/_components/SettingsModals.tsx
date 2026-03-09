"use client";

import { useState } from "react";
import { X, Eye, EyeOff, Home, Building2, Trash2 } from "lucide-react";

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

interface Props {
  isDark: boolean;
  // Which modals are open
  showPassword: boolean;
  showAddress: boolean;
  showEdit: boolean;
  showDeleteConfirm: boolean;
  showDeleteAccount: boolean;
  // State data
  selectedAddress: Address | null;
  addressToDelete: number | null;
  // Close callbacks
  onClosePassword: () => void;
  onCloseAddress: () => void;
  onCloseEdit: () => void;
  onCloseDeleteConfirm: () => void;
  onCloseDeleteAccount: () => void;
  // Action callbacks
  onSetSelectedAddress: (addr: Address) => void;
  onConfirmDeleteAddress: () => void;
}

const inputCls = (isDark: boolean) =>
  `w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#ec6d13] transition-all ${
    isDark
      ? "bg-[#120d0a] border-[#3e342b] text-white placeholder-[#8b7355]"
      : "bg-[#f5f0eb] border-[#e5ddd5] text-[#1a140e] placeholder-[#8b7355]"
  }`;

const labelCls = (isDark: boolean) =>
  `block text-sm font-medium mb-2 ${isDark ? "text-white" : "text-[#1a140e]"}`;

const closeBtnCls = (isDark: boolean) =>
  `absolute top-4 right-4 p-2 rounded-lg transition-colors ${
    isDark ? "hover:bg-[#2a221b] text-[#b9a89d]" : "hover:bg-[#f5f0eb] text-[#8b7355]"
  }`;

export default function SettingsModals({
  isDark,
  showPassword,
  showAddress,
  showEdit,
  showDeleteConfirm,
  showDeleteAccount,
  selectedAddress,
  addressToDelete,
  onClosePassword,
  onCloseAddress,
  onCloseEdit,
  onCloseDeleteConfirm,
  onCloseDeleteAccount,
  onSetSelectedAddress,
  onConfirmDeleteAddress,
}: Props) {
  // Password visibility — local to this component
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  return (
    <>
      {/* ══════════ PASSWORD MODAL ══════════ */}
      {showPassword && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClosePassword} />
          <div
            className={`relative w-full max-w-md rounded-2xl border shadow-2xl p-6 animate-in zoom-in-95 duration-200 ${
              isDark ? "bg-[#1a140e] border-[#3e342b]" : "bg-white border-[#e5ddd5]"
            }`}
          >
            <button onClick={onClosePassword} className={closeBtnCls(isDark)}>
              <X size={20} />
            </button>

            <div className="mb-6">
              <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-[#1a140e]"}`}>
                Ganti Password
              </h3>
              <p className={`text-sm mt-1 ${isDark ? "text-[#b9a89d]" : "text-[#8b7355]"}`}>
                Masukkan password lama dan password baru.
              </p>
            </div>

            <form
              className="flex flex-col gap-4"
              onSubmit={(e) => { e.preventDefault(); onClosePassword(); }}
            >
              {[
                { label: "Password Saat Ini", show: showCurrentPass, toggle: () => setShowCurrentPass((v) => !v), placeholder: "Masukkan password saat ini" },
                { label: "Password Baru",     show: showNewPass,     toggle: () => setShowNewPass((v) => !v),     placeholder: "Masukkan password baru" },
                { label: "Konfirmasi Password Baru", show: showConfirmPass, toggle: () => setShowConfirmPass((v) => !v), placeholder: "Ulangi password baru" },
              ].map(({ label, show, toggle, placeholder }) => (
                <div key={label}>
                  <label className={labelCls(isDark)}>{label}</label>
                  <div className="relative">
                    <input
                      type={show ? "text" : "password"}
                      placeholder={placeholder}
                      className={inputCls(isDark)}
                    />
                    <button
                      type="button"
                      onClick={toggle}
                      className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                        isDark ? "text-[#8b7355]" : "text-[#8b7355]"
                      }`}
                    >
                      {show ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              ))}

              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={onClosePassword}
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
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══════════ ADD ADDRESS MODAL ══════════ */}
      {showAddress && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCloseAddress} />
          <div
            className={`relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border shadow-2xl p-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${
              isDark ? "bg-[#1a140e] border-[#3e342b]" : "bg-white border-[#e5ddd5]"
            }`}
          >
            <button onClick={onCloseAddress} className={closeBtnCls(isDark)}>
              <X size={20} />
            </button>

            <div className="mb-6">
              <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-[#1a140e]"}`}>Tambah Alamat Baru</h3>
              <p className={`text-sm mt-1 ${isDark ? "text-[#b9a89d]" : "text-[#8b7355]"}`}>
                Isi detail alamat pengiriman baru.
              </p>
            </div>

            <form
              className="flex flex-col gap-4"
              onSubmit={(e) => { e.preventDefault(); onCloseAddress(); }}
            >
              {[
                { label: "Label Alamat", type: "text", placeholder: "Contoh: Rumah, Apartemen" },
                { label: "Nama Penerima", type: "text", placeholder: "Nama lengkap penerima" },
                { label: "Nomor Telepon", type: "tel", placeholder: "08xx-xxxx-xxxx" },
              ].map(({ label, type, placeholder }) => (
                <div key={label}>
                  <label className={labelCls(isDark)}>{label}</label>
                  <input type={type} placeholder={placeholder} className={inputCls(isDark)} />
                </div>
              ))}

              <div>
                <label className={labelCls(isDark)}>Alamat Lengkap</label>
                <textarea
                  rows={3}
                  placeholder="Jalan, nomor rumah, RT/RW, kelurahan, kecamatan"
                  className={`${inputCls(isDark)} resize-none`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={labelCls(isDark)}>Kota</label>
                  <input type="text" placeholder="Nama kota" className={inputCls(isDark)} />
                </div>
                <div>
                  <label className={labelCls(isDark)}>Kode Pos</label>
                  <input type="text" placeholder="00000" className={inputCls(isDark)} />
                </div>
              </div>

              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-5 h-5 rounded border-2 text-[#ec6d13] focus:ring-[#ec6d13]" />
                <span className={`text-sm ${isDark ? "text-[#b9a89d]" : "text-[#8b7355]"}`}>
                  Jadikan sebagai alamat utama
                </span>
              </label>

              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={onCloseAddress}
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

      {/* ══════════ EDIT ADDRESS MODAL ══════════ */}
      {showEdit && selectedAddress && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onCloseEdit}
          />
          <div
            className={`relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border shadow-2xl p-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${
              isDark ? "bg-[#1a140e] border-[#3e342b]" : "bg-white border-[#e5ddd5]"
            }`}
          >
            <button onClick={onCloseEdit} className={closeBtnCls(isDark)}>
              <X size={20} />
            </button>

            <div className="mb-6">
              <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-[#1a140e]"}`}>Edit Alamat</h3>
              <p className={`text-sm mt-1 ${isDark ? "text-[#b9a89d]" : "text-[#8b7355]"}`}>
                Perbarui detail alamat pengiriman.
              </p>
            </div>

            <form
              className="flex flex-col gap-4"
              onSubmit={(e) => { e.preventDefault(); onCloseEdit(); }}
            >
              {/* Address type */}
              <div>
                <label className={labelCls(isDark)}>Jenis Alamat</label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => onSetSelectedAddress({ ...selectedAddress, type: "home" })}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-medium transition-all ${
                      selectedAddress.type === "home"
                        ? "bg-[#ec6d13]/10 border-[#ec6d13] text-[#ec6d13]"
                        : isDark
                        ? "border-[#3e342b] text-[#b9a89d] hover:border-[#ec6d13]"
                        : "border-[#e5ddd5] text-[#8b7355] hover:border-[#ec6d13]"
                    }`}
                  >
                    <Home size={18} /> Rumah
                  </button>
                  <button
                    type="button"
                    onClick={() => onSetSelectedAddress({ ...selectedAddress, type: "office" })}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-medium transition-all ${
                      selectedAddress.type === "office"
                        ? "bg-[#ec6d13]/10 border-[#ec6d13] text-[#ec6d13]"
                        : isDark
                        ? "border-[#3e342b] text-[#b9a89d] hover:border-[#ec6d13]"
                        : "border-[#e5ddd5] text-[#8b7355] hover:border-[#ec6d13]"
                    }`}
                  >
                    <Building2 size={18} /> Kantor
                  </button>
                </div>
              </div>

              {[
                { label: "Label Alamat",    defaultValue: selectedAddress.label,      type: "text" },
                { label: "Nama Penerima",   defaultValue: selectedAddress.name,       type: "text" },
                { label: "Nomor Telepon",   defaultValue: selectedAddress.phone,      type: "tel"  },
              ].map(({ label, defaultValue, type }) => (
                <div key={label}>
                  <label className={labelCls(isDark)}>{label}</label>
                  <input type={type} defaultValue={defaultValue} className={inputCls(isDark)} />
                </div>
              ))}

              <div>
                <label className={labelCls(isDark)}>Alamat Lengkap</label>
                <textarea
                  rows={3}
                  defaultValue={selectedAddress.street}
                  className={`${inputCls(isDark)} resize-none`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={labelCls(isDark)}>Kota</label>
                  <input type="text" defaultValue={selectedAddress.city} className={inputCls(isDark)} />
                </div>
                <div>
                  <label className={labelCls(isDark)}>Kode Pos</label>
                  <input type="text" defaultValue={selectedAddress.postalCode} className={inputCls(isDark)} />
                </div>
              </div>

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

              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={onCloseEdit}
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

      {/* ══════════ DELETE ADDRESS CONFIRMATION ══════════ */}
      {showDeleteConfirm && addressToDelete !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onCloseDeleteConfirm}
          />
          <div
            className={`relative w-full max-w-sm rounded-2xl border shadow-2xl p-6 animate-in zoom-in-95 duration-200 ${
              isDark ? "bg-[#1a140e] border-[#3e342b]" : "bg-white border-[#e5ddd5]"
            }`}
          >
            <div className="flex justify-center mb-4">
              <div className="p-4 rounded-full bg-red-500/10">
                <Trash2 size={32} className="text-red-500" />
              </div>
            </div>
            <div className="text-center mb-6">
              <h3 className={`text-xl font-bold mb-2 ${isDark ? "text-white" : "text-[#1a140e]"}`}>
                Hapus Alamat?
              </h3>
              <p className={`text-sm ${isDark ? "text-[#b9a89d]" : "text-[#8b7355]"}`}>
                Apakah kamu yakin ingin menghapus alamat ini? Tindakan ini tidak dapat dibatalkan.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={onCloseDeleteConfirm}
                className={`flex-1 py-3 rounded-xl border font-medium text-sm transition-all ${
                  isDark
                    ? "border-[#3e342b] text-[#b9a89d] hover:bg-[#2a221b]"
                    : "border-[#e5ddd5] text-[#8b7355] hover:bg-[#f5f0eb]"
                }`}
              >
                Batal
              </button>
              <button
                onClick={onConfirmDeleteAddress}
                className="flex-1 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold text-sm transition-all"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════ DELETE ACCOUNT MODAL ══════════ */}
      {showDeleteAccount && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onCloseDeleteAccount}
          />
          <div
            className={`relative w-full max-w-md rounded-2xl border-2 shadow-2xl p-6 animate-in zoom-in-95 duration-200 border-red-500/30 ${
              isDark ? "bg-[#1a140e]" : "bg-white"
            }`}
          >
            <button onClick={onCloseDeleteAccount} className={closeBtnCls(isDark)}>
              <X size={20} />
            </button>

            <div className="flex justify-center mb-5">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center">
                  <Trash2 size={36} className="text-red-500" />
                </div>
                <span className="absolute inset-0 rounded-full border-2 border-red-500/30 animate-ping" />
              </div>
            </div>

            <div className="text-center mb-6">
              <h3 className={`text-xl font-black mb-2 ${isDark ? "text-white" : "text-[#1a140e]"}`}>
                Hapus Akun Secara Permanen?
              </h3>
              <p className={`text-sm leading-relaxed mb-4 ${isDark ? "text-[#b9a89d]" : "text-[#8b7355]"}`}>
                Tindakan ini{" "}
                <strong className="text-red-500">tidak dapat dibatalkan</strong>.
                Semua data akunmu termasuk riwayat pesanan, alamat pengiriman, dan preferensi akan
                dihapus selamanya.
              </p>
              <div
                className={`rounded-xl border border-red-500/20 p-3 text-left ${
                  isDark ? "bg-red-500/5" : "bg-red-50"
                }`}
              >
                <p className="text-xs text-red-500 font-medium mb-1">Yang akan dihapus:</p>
                <ul className="text-xs text-red-400 space-y-0.5 list-disc list-inside">
                  <li>Profil dan informasi pribadi</li>
                  <li>Seluruh riwayat pembelian</li>
                  <li>Semua alamat pengiriman tersimpan</li>
                  <li>Akses ke akun ini selamanya</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onCloseDeleteAccount}
                className={`flex-1 py-3 rounded-xl border font-medium text-sm transition-all ${
                  isDark
                    ? "border-[#3e342b] text-[#b9a89d] hover:bg-[#2a221b]"
                    : "border-[#e5ddd5] text-[#8b7355] hover:bg-[#f5f0eb]"
                }`}
              >
                Batal, Kembali
              </button>
              <button
                onClick={() => {
                  onCloseDeleteAccount();
                  // TODO: panggil API delete account di sini
                  console.log("Account deleted");
                }}
                className="flex-1 py-3 rounded-xl bg-red-500 hover:bg-red-600 active:scale-95 text-white font-bold text-sm transition-all shadow-lg shadow-red-500/20"
              >
                Hapus Akun Permanen
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
