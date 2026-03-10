"use client";

import { AlertTriangle, X } from "lucide-react";
import type { Product } from "./InventoryClient";

interface Props {
  product: Product;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ModalDeleteProduct({ product, onClose, onConfirm }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal panel */}
      <div className="relative z-10 w-full max-w-md bg-white dark:bg-[#1a140e] rounded-2xl shadow-2xl border border-gray-200 dark:border-[#3e342b] overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-[#3e342b]">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Hapus Produk</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-[#3e342b] text-gray-500 dark:text-[#8e7f72] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">

          {/* Warning banner */}
          <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-800/30">
            <AlertTriangle
              className="text-red-500 dark:text-red-400 shrink-0 mt-0.5"
              size={20}
            />
            <div>
              <p className="text-sm font-semibold text-red-700 dark:text-red-400">
                Tindakan ini tidak dapat dibatalkan
              </p>
              <p className="text-xs text-red-600/70 dark:text-red-400/70 mt-1 leading-relaxed">
                Produk <strong>&ldquo;{product.name}&rdquo;</strong> (SKU:{" "}
                <span className="font-mono">{product.sku}</span>) akan dihapus
                permanen dari sistem.
              </p>
            </div>
          </div>

          {/* Product preview */}
          <div className="flex items-center gap-3 py-3 px-4 rounded-lg bg-gray-50 dark:bg-[#231910] border border-gray-200 dark:border-[#3e342b]">
            <div className="size-10 rounded-lg bg-gray-200 dark:bg-[#3e342b] flex items-center justify-center text-sm font-bold text-gray-500 dark:text-[#8e7f72] shrink-0">
              {product.name[0].toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900 dark:text-[#EAE0D5] truncate">
                {product.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-[#8e7f72]">
                {product.category}&nbsp;&middot;&nbsp;Stok: {product.stock}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 dark:border-[#3e342b] text-gray-700 dark:text-[#EAE0D5] text-sm font-medium hover:bg-gray-50 dark:hover:bg-[#231910] transition-colors"
            >
              Batal
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-2.5 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-bold shadow-md shadow-red-500/20 transition-all active:scale-95"
            >
              Hapus Produk
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
