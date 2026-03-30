"use client";

import { useState } from "react";
import { X } from "lucide-react";
import type { Product } from "./InventoryClient";

interface Props {
  product: Product;
  categories: string[];
  onClose: () => void;
  onSubmit: (data: Product) => void;
}

const inputClass =
  "w-full bg-white dark:bg-[#231910] border border-gray-200 dark:border-[#3e342b] rounded-lg px-4 py-2.5 text-gray-900 dark:text-[#EAE0D5] text-sm focus:ring-1 focus:ring-[#ec6d13] focus:border-[#ec6d13] outline-none transition-all placeholder-gray-400 dark:placeholder-[#8e7f72]";

const PRODUCT_NAMES = [
  "Kopi Susu Aren",
  "Americano",
  "Cappuccino",
  "Matcha Latte",
  "Croissant",
  "Kentang Goreng",
  "Brownies",
];

const labelClass =
  "text-xs font-medium text-gray-500 dark:text-[#8e7f72] uppercase tracking-wider";

export default function ModalEditProduct({ product, categories, onClose, onSubmit }: Props) {
  const productNameOptions = PRODUCT_NAMES.includes(product.name)
    ? PRODUCT_NAMES
    : [product.name, ...PRODUCT_NAMES];

  const [name, setName]         = useState(product.name);
  const [category, setCategory] = useState(product.category);
  const [stock, setStock]       = useState(product.stock.toString());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: product.id,
      name,
      category,
      stock: parseInt(stock) || 0,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal panel */}
      <div className="relative z-10 w-full max-w-lg bg-white dark:bg-[#1a140e] rounded-2xl shadow-2xl border border-gray-200 dark:border-[#3e342b] overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-[#3e342b]">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Edit Produk</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-[#3e342b] text-gray-500 dark:text-[#8e7f72] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-4 overflow-y-auto max-h-[calc(100dvh-10rem)] custom-scrollbar"
        >
          {/* Nama Produk */}
          <div className="space-y-1.5">
            <label className={labelClass}>Nama Produk</label>
            <select
              className={inputClass}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            >
              {productNameOptions.map((productName) => (
                <option key={productName} value={productName}>
                  {productName}
                </option>
              ))}
            </select>
          </div>

          {/* Kategori */}
          <div className="space-y-1.5">
            <label className={labelClass}>Kategori</label>
            <select
              className={inputClass}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Stok */}
          <div className="space-y-1.5">
            <label className={labelClass}>Stok</label>
            <input
              className={inputClass}
              type="number"
              min="0"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 dark:border-[#3e342b] text-gray-700 dark:text-[#EAE0D5] text-sm font-medium hover:bg-gray-50 dark:hover:bg-[#231910] transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 rounded-lg bg-[#ec6d13] hover:bg-[#d65c0b] text-white text-sm font-bold shadow-md shadow-[#ec6d13]/20 transition-all active:scale-95"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
