"use client";

import { useMemo, useState } from "react";
import { X } from "lucide-react";

type ProductPayload = {
  name: string;
  category: string;
  price: number;
  stock: number;
  shortDescription: string;
  longDescription: string;
  image: string;
  roast?: string;
  badge?: string;
};

interface Props {
  categories: string[];
  onClose: () => void;
  onSubmit: (data: ProductPayload) => Promise<void>;
}

const inputClass =
  "w-full bg-white dark:bg-[#231910] border border-gray-200 dark:border-[#3e342b] rounded-lg px-4 py-2.5 text-gray-900 dark:text-[#EAE0D5] text-sm focus:ring-1 focus:ring-[#ec6d13] focus:border-[#ec6d13] outline-none transition-all placeholder-gray-400 dark:placeholder-[#8e7f72]";
const labelClass = "text-xs font-medium text-gray-500 dark:text-[#8e7f72] uppercase tracking-wider";

export default function ModalAddProductPM({ categories, onClose, onSubmit }: Props) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState(categories[0] ?? "");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [image, setImage] = useState("");
  const [roast, setRoast] = useState("");
  const [badge, setBadge] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const categoryOptions = useMemo(() => categories.filter((value) => value.trim().length > 0), [categories]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      await onSubmit({
        name,
        category,
        price,
        stock,
        shortDescription,
        longDescription,
        image,
        roast: roast.trim() || undefined,
        badge: badge.trim() || undefined,
      });
    } catch (submitError: unknown) {
      const message = submitError instanceof Error ? submitError.message : "Gagal menambahkan produk";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-2xl bg-white dark:bg-[#1a140e] rounded-2xl shadow-2xl border border-gray-200 dark:border-[#3e342b] overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-[#3e342b]">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Tambah Produk</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-[#3e342b] text-gray-500 dark:text-[#8e7f72] transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {error && <p className="text-xs text-red-500">{error}</p>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className={labelClass}>Nama Produk</label>
              <input className={inputClass} value={name} onChange={(event) => setName(event.target.value)} required />
            </div>

            <div className="space-y-1.5">
              <label className={labelClass}>Kategori</label>
              <input className={inputClass} list="categories-add-product" value={category} onChange={(event) => setCategory(event.target.value)} required />
              <datalist id="categories-add-product">
                {categoryOptions.map((option) => (
                  <option key={option} value={option} />
                ))}
              </datalist>
            </div>

            <div className="space-y-1.5">
              <label className={labelClass}>Harga</label>
              <input type="number" className={inputClass} value={price} min={0} onChange={(event) => setPrice(Number(event.target.value))} required />
            </div>

            <div className="space-y-1.5">
              <label className={labelClass}>Stok</label>
              <input type="number" className={inputClass} value={stock} min={0} onChange={(event) => setStock(Number(event.target.value))} required />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className={labelClass}>URL Gambar</label>
              <input type="url" className={inputClass} value={image} onChange={(event) => setImage(event.target.value)} required />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className={labelClass}>Deskripsi Singkat</label>
              <input className={inputClass} value={shortDescription} onChange={(event) => setShortDescription(event.target.value)} required />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className={labelClass}>Deskripsi Panjang</label>
              <textarea className={`${inputClass} resize-none`} rows={4} value={longDescription} onChange={(event) => setLongDescription(event.target.value)} required />
            </div>

            <div className="space-y-1.5">
              <label className={labelClass}>Roast (opsional)</label>
              <input className={inputClass} value={roast} onChange={(event) => setRoast(event.target.value)} />
            </div>

            <div className="space-y-1.5">
              <label className={labelClass}>Badge (opsional)</label>
              <input className={inputClass} value={badge} onChange={(event) => setBadge(event.target.value)} />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 dark:border-[#3e342b] text-gray-700 dark:text-[#EAE0D5] text-sm font-medium hover:bg-gray-50 dark:hover:bg-[#231910] transition-colors">
              Batal
            </button>
            <button type="submit" disabled={isSubmitting} className="flex-1 px-4 py-2.5 rounded-lg bg-[#ec6d13] hover:bg-[#d65c0b] text-white text-sm font-bold shadow-md shadow-[#ec6d13]/20 transition-all active:scale-95 disabled:opacity-60">
              {isSubmitting ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
