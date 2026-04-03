"use client";

import { useEffect, useState } from "react";
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
  isLoading: boolean;
  message: string | null;
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
  onSaveAddress: (data: {
    label: string;
    type: "home" | "office";
    recipient: string;
    phone: string;
    street: string;
    city: string;
    postalCode: string;
    isDefault: boolean;
  }) => void;
  onSaveEditAddress: (
    id: number,
    data: {
      label: string;
      type: "home" | "office";
      recipient: string;
      phone: string;
      street: string;
      city: string;
      postalCode: string;
      isDefault: boolean;
    }
  ) => void;
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
  isLoading,
  message,
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
  onSaveAddress,
  onSaveEditAddress,
}: Props) {
  // Password visibility — local to this component
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const [addLabel, setAddLabel] = useState("");
  const [addType, setAddType] = useState<"home" | "office">("home");
  const [addRecipient, setAddRecipient] = useState("");
  const [addPhone, setAddPhone] = useState("");
  const [addStreet, setAddStreet] = useState("");
  const [addCity, setAddCity] = useState("");
  const [addPostalCode, setAddPostalCode] = useState("");
  const [addIsDefault, setAddIsDefault] = useState(false);

  const [editLabel, setEditLabel] = useState("");
  const [editType, setEditType] = useState<"home" | "office">("home");
  const [editRecipient, setEditRecipient] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editStreet, setEditStreet] = useState("");
  const [editCity, setEditCity] = useState("");
  const [editPostalCode, setEditPostalCode] = useState("");
  const [editIsDefault, setEditIsDefault] = useState(false);

  useEffect(() => {
    if (!showEdit || !selectedAddress) return;
    setEditLabel(selectedAddress.label);
    setEditType(selectedAddress.type);
    setEditRecipient(selectedAddress.name);
    setEditPhone(selectedAddress.phone);
    setEditStreet(selectedAddress.street);
    setEditCity(selectedAddress.city);
    setEditPostalCode(selectedAddress.postalCode);
    setEditIsDefault(selectedAddress.isDefault);
  }, [selectedAddress, showEdit]);

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

            {message && <p className="text-sm text-red-500 mb-4">{message}</p>}

            <form
              className="flex flex-col gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                onSaveAddress({
                  label: addLabel || "Alamat Baru",
                  type: addType,
                  recipient: addRecipient,
                  phone: addPhone,
                  street: addStreet,
                  city: addCity,
                  postalCode: addPostalCode,
                  isDefault: addIsDefault,
                });
              }}
            >
              {[
                { label: "Label Alamat", type: "text", placeholder: "Contoh: Rumah, Apartemen", value: addLabel, onChange: setAddLabel },
                { label: "Nama Penerima", type: "text", placeholder: "Nama lengkap penerima", value: addRecipient, onChange: setAddRecipient },
                { label: "Nomor Telepon", type: "tel", placeholder: "08xx-xxxx-xxxx", value: addPhone, onChange: setAddPhone },
              ].map(({ label, type, placeholder }) => (
                <div key={label}>
                  <label className={labelCls(isDark)}>{label}</label>
                  <input
                    type={type}
                    value={
                      label === "Label Alamat"
                        ? addLabel
                        : label === "Nama Penerima"
                        ? addRecipient
                        : addPhone
                    }
                    onChange={(event) => {
                      if (label === "Label Alamat") setAddLabel(event.target.value);
                      if (label === "Nama Penerima") setAddRecipient(event.target.value);
                      if (label === "Nomor Telepon") setAddPhone(event.target.value);
                    }}
                    placeholder={placeholder}
                    className={inputCls(isDark)}
                  />
                </div>
              ))}

              <div>
                <label className={labelCls(isDark)}>Alamat Lengkap</label>
                <textarea
                  rows={3}
                  value={addStreet}
                  onChange={(event) => setAddStreet(event.target.value)}
                  placeholder="Jalan, nomor rumah, RT/RW, kelurahan, kecamatan"
                  className={`${inputCls(isDark)} resize-none`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={labelCls(isDark)}>Kota</label>
                  <input
                    type="text"
                    value={addCity}
                    onChange={(event) => setAddCity(event.target.value)}
                    placeholder="Nama kota"
                    className={inputCls(isDark)}
                  />
                </div>
                <div>
                  <label className={labelCls(isDark)}>Kode Pos</label>
                  <input
                    type="text"
                    value={addPostalCode}
                    onChange={(event) => setAddPostalCode(event.target.value)}
                    placeholder="00000"
                    className={inputCls(isDark)}
                  />
                </div>
              </div>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={addIsDefault}
                  onChange={(event) => setAddIsDefault(event.target.checked)}
                  className="w-5 h-5 rounded border-2 text-[#ec6d13] focus:ring-[#ec6d13]"
                />
                <span className={`text-sm ${isDark ? "text-[#b9a89d]" : "text-[#8b7355]"}`}>
                  Jadikan sebagai alamat utama
                </span>
              </label>

              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  disabled={isLoading}
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
                  disabled={isLoading}
                  className="flex-1 py-3 rounded-xl bg-[#ec6d13] hover:bg-[#d65c0b] text-white font-bold text-sm transition-all"
                >
                  {isLoading ? "Menyimpan..." : "Simpan Alamat"}
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

            {message && <p className="text-sm text-red-500 mb-4">{message}</p>}

            <form
              className="flex flex-col gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                onSaveEditAddress(selectedAddress.id, {
                  label: editLabel,
                  type: editType,
                  recipient: editRecipient,
                  phone: editPhone,
                  street: editStreet,
                  city: editCity,
                  postalCode: editPostalCode,
                  isDefault: editIsDefault,
                });
              }}
            >
              {/* Address type */}
              <div>
                <label className={labelCls(isDark)}>Jenis Alamat</label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      onSetSelectedAddress({ ...selectedAddress, type: "home" });
                      setEditType("home");
                    }}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-medium transition-all ${
                      editType === "home"
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
                    onClick={() => {
                      onSetSelectedAddress({ ...selectedAddress, type: "office" });
                      setEditType("office");
                    }}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-medium transition-all ${
                      editType === "office"
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
                { label: "Label Alamat", type: "text" },
                { label: "Nama Penerima", type: "text" },
                { label: "Nomor Telepon", type: "tel"  },
              ].map(({ label, type }) => (
                <div key={label}>
                  <label className={labelCls(isDark)}>{label}</label>
                  <input
                    type={type}
                    value={
                      label === "Label Alamat"
                        ? editLabel
                        : label === "Nama Penerima"
                        ? editRecipient
                        : editPhone
                    }
                    onChange={(event) => {
                      if (label === "Label Alamat") setEditLabel(event.target.value);
                      if (label === "Nama Penerima") setEditRecipient(event.target.value);
                      if (label === "Nomor Telepon") setEditPhone(event.target.value);
                    }}
                    className={inputCls(isDark)}
                  />
                </div>
              ))}

              <div>
                <label className={labelCls(isDark)}>Alamat Lengkap</label>
                <textarea
                  rows={3}
                  value={editStreet}
                  onChange={(event) => setEditStreet(event.target.value)}
                  className={`${inputCls(isDark)} resize-none`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={labelCls(isDark)}>Kota</label>
                  <input
                    type="text"
                    value={editCity}
                    onChange={(event) => setEditCity(event.target.value)}
                    className={inputCls(isDark)}
                  />
                </div>
                <div>
                  <label className={labelCls(isDark)}>Kode Pos</label>
                  <input
                    type="text"
                    value={editPostalCode}
                    onChange={(event) => setEditPostalCode(event.target.value)}
                    className={inputCls(isDark)}
                  />
                </div>
              </div>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editIsDefault}
                  onChange={(event) => setEditIsDefault(event.target.checked)}
                  className="w-5 h-5 rounded border-2 text-[#ec6d13] focus:ring-[#ec6d13]"
                />
                <span className={`text-sm ${isDark ? "text-[#b9a89d]" : "text-[#8b7355]"}`}>
                  Jadikan sebagai alamat utama
                </span>
              </label>

              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  disabled={isLoading}
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
                  disabled={isLoading}
                  className="flex-1 py-3 rounded-xl bg-[#ec6d13] hover:bg-[#d65c0b] text-white font-bold text-sm transition-all"
                >
                  {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
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
                disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
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
