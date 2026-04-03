"use client";

import { useState } from "react";
import { X } from "lucide-react";
import type { Product } from "./InventoryClient";

interface Props {
  categories: string[];
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Product, "_id">) => void | Promise<void>;
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

export default function ModalAddProduct({ categories, isSubmitting, onClose, onSubmit }: Props) {
  const [name, setName]         = useState("");
  const [category, setCategory] = useState(categories[0] || "Uncategorized");
  const [stock, setStock] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      category,
      price: 0,
      stock: parseInt(stock) || 0,
      shortDescription: `${name} - deskripsi singkat.`,
      longDescription: `${name} - deskripsi lengkap untuk kebutuhan katalog.`,
      badge: undefined,
      rating: 0,
      image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1000&auto=format&fit=crop",
      roast: "Medium Roast",
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
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Tambah Produk Baru
          </h2>
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
              <option value="" disabled hidden>
                Pilih Nama Produk
              </option>
              {PRODUCT_NAMES.map((productName) => (
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
              {categories.length === 0 ? (
                <option value="Uncategorized">Uncategorized</option>
              ) : (
                categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))
              )}
            </select>
          </div>

          {/* Stok */}
          <div className="space-y-1.5">
            <label className={labelClass}>Stok</label>
            <input
              className={inputClass}
              type="number"
              min="0"
              placeholder="0"
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
              disabled={isSubmitting}
              className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 dark:border-[#3e342b] text-gray-700 dark:text-[#EAE0D5] text-sm font-medium hover:bg-gray-50 dark:hover:bg-[#231910] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !category}
              className="flex-1 px-4 py-2.5 rounded-lg bg-[#ec6d13] hover:bg-[#d65c0b] text-white text-sm font-bold shadow-md shadow-[#ec6d13]/20 transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Menyimpan..." : "Simpan Produk"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
