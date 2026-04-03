"use client";

import { AlertTriangle, X } from "lucide-react";

type Category = { id: number; name: string; description: string };

interface Props {
  category: Category;
  affectedCount: number;
  isLoading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ModalDeleteCategory({ category, affectedCount, isLoading = false, onClose, onConfirm }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md bg-white dark:bg-[#1a140e] rounded-2xl shadow-2xl border border-gray-200 dark:border-[#3e342b] overflow-hidden">

        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-[#3e342b]">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Hapus Kategori</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-[#3e342b] text-gray-500 dark:text-[#8e7f72] transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-800/30">
            <AlertTriangle className="text-red-500 dark:text-red-400 shrink-0 mt-0.5" size={20} />
            <div>
              <p className="text-sm font-semibold text-red-700 dark:text-red-400">Tindakan ini tidak dapat dibatalkan</p>
              <p className="text-xs text-red-600/70 dark:text-red-400/70 mt-1 leading-relaxed">
                Kategori <strong>&ldquo;{category.name}&rdquo;</strong> akan dihapus permanen dari sistem. {affectedCount} produk akan dipindahkan ke kategori Uncategorized.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 py-3 px-4 rounded-lg bg-gray-50 dark:bg-[#231910] border border-gray-200 dark:border-[#3e342b]">
            <div className="size-10 rounded-lg bg-[#ec6d13]/10 flex items-center justify-center text-sm font-bold text-[#ec6d13] shrink-0">
              {category.name[0].toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900 dark:text-[#EAE0D5] truncate">{category.name}</p>
              {category.description && (
                <p className="text-xs text-gray-500 dark:text-[#8e7f72] truncate">{category.description}</p>
              )}
            </div>
          </div>

          <div className="flex gap-3 pt-1">
            <button onClick={onClose} className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 dark:border-[#3e342b] text-gray-700 dark:text-[#EAE0D5] text-sm font-medium hover:bg-gray-50 dark:hover:bg-[#231910] transition-colors">
              Batal
            </button>
            <button onClick={onConfirm} disabled={isLoading} className="flex-1 px-4 py-2.5 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-bold shadow-md shadow-red-500/20 transition-all active:scale-95 disabled:opacity-60">
              {isLoading ? "Menghapus..." : "Hapus"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
