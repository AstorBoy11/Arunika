"use client";

import { useState } from "react";
import { X, UploadCloud } from "lucide-react";
import type { Product } from "./InventoryClient";

interface Props {
  categories: string[];
  onClose: () => void;
  onSubmit: (data: Omit<Product, "id">) => void;
}

const inputClass =
  "w-full bg-white dark:bg-[#231910] border border-gray-200 dark:border-[#3e342b] rounded-lg px-4 py-2.5 text-gray-900 dark:text-[#EAE0D5] text-sm focus:ring-1 focus:ring-[#ec6d13] focus:border-[#ec6d13] outline-none transition-all placeholder-gray-400 dark:placeholder-[#8e7f72]";

const labelClass =
  "text-xs font-medium text-gray-500 dark:text-[#8e7f72] uppercase tracking-wider";

export default function ModalAddProduct({ categories, onClose, onSubmit }: Props) {
  const [name, setName]         = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [price, setPrice]       = useState("");
  const [stock, setStock]       = useState("");
  const [sku, setSku]           = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      category,
      price: parseFloat(price) || 0,
      stock: parseInt(stock)   || 0,
      sku,
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
          {/* Image upload placeholder */}
          <div className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 dark:border-[#3e342b] rounded-xl py-5 cursor-pointer hover:border-[#ec6d13] dark:hover:border-[#ec6d13] transition-colors group">
            <UploadCloud
              size={28}
              className="text-gray-300 dark:text-[#4a3f35] group-hover:text-[#ec6d13] transition-colors"
            />
            <p className="text-xs text-gray-400 dark:text-[#8e7f72]">Klik untuk upload gambar produk</p>
            <p className="text-[10px] text-gray-300 dark:text-[#4a3f35]">PNG, JPG maks. 2MB</p>
          </div>

          {/* Nama Produk */}
          <div className="space-y-1.5">
            <label className={labelClass}>Nama Produk</label>
            <input
              className={inputClass}
              placeholder="cth: Ethiopian Yirgacheffe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Kategori + SKU */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            <div className="space-y-1.5">
              <label className={labelClass}>SKU</label>
              <input
                className={inputClass}
                placeholder="cth: BN-ETH-001"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Harga + Stok */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className={labelClass}>Harga ($)</label>
              <input
                className={inputClass}
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
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
              Simpan Produk
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
