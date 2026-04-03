"use client";

import { useState } from "react";
import { X } from "lucide-react";

type Category = { id: number; name: string; description: string };

interface Props {
  category: Category;
  affectedCount: number;
  isLoading?: boolean;
  onClose: () => void;
  onSubmit: (data: Category) => void;
}

const inputClass =
  "w-full bg-white dark:bg-[#231910] border border-gray-200 dark:border-[#3e342b] rounded-lg px-4 py-2.5 text-gray-900 dark:text-[#EAE0D5] text-sm focus:ring-1 focus:ring-[#ec6d13] focus:border-[#ec6d13] outline-none transition-all placeholder-gray-400 dark:placeholder-[#8e7f72]";
const labelClass = "text-xs font-medium text-gray-500 dark:text-[#8e7f72] uppercase tracking-wider";

export default function ModalEditCategory({ category, affectedCount, isLoading = false, onClose, onSubmit }: Props) {
  const [name, setName]               = useState(category.name);
  const [description, setDescription] = useState(category.description);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...category, name, description });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-lg bg-white dark:bg-[#1a140e] rounded-2xl shadow-2xl border border-gray-200 dark:border-[#3e342b] overflow-hidden">

        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-[#3e342b]">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Edit Kategori</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-[#3e342b] text-gray-500 dark:text-[#8e7f72] transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <p className="text-xs text-gray-500 dark:text-[#8e7f72]">
            Kategori ini digunakan oleh {affectedCount} produk.
          </p>
          <div className="space-y-1.5">
            <label className={labelClass}>Nama Kategori</label>
            <input className={inputClass} placeholder="cth: Coffee Based" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="space-y-1.5">
            <label className={labelClass}>Deskripsi</label>
            <textarea className={`${inputClass} resize-none`} rows={3} placeholder="Deskripsi singkat…" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 dark:border-[#3e342b] text-gray-700 dark:text-[#EAE0D5] text-sm font-medium hover:bg-gray-50 dark:hover:bg-[#231910] transition-colors">
              Batal
            </button>
            <button type="submit" disabled={isLoading} className="flex-1 px-4 py-2.5 rounded-lg bg-[#ec6d13] hover:bg-[#d65c0b] text-white text-sm font-bold shadow-md shadow-[#ec6d13]/20 transition-all active:scale-95 disabled:opacity-60">
              {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
