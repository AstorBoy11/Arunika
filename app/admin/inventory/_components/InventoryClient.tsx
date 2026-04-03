"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import {
  Plus,
  Package,
  AlertTriangle,
  XCircle,
  Search,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { IProduct } from "@/lib/models";

// Type-only imports give the TS language server an explicit module→type link,
// which fixes "Cannot find module" false positives when using next/dynamic.
import type ModalAddProductType    from "@/app/admin/inventory/_components/ModalAddProduct";
import type ModalEditProductType   from "@/app/admin/inventory/_components/ModalEditProduct";
import type ModalDeleteProductType from "@/app/admin/inventory/_components/ModalDeleteProduct";

// Lazy-load modals — chunks are only fetched when the modal first opens.
const ModalAddProduct    = dynamic(() => import("@/app/admin/inventory/_components/ModalAddProduct"))    as typeof ModalAddProductType;
const ModalEditProduct   = dynamic(() => import("@/app/admin/inventory/_components/ModalEditProduct"))   as typeof ModalEditProductType;
const ModalDeleteProduct = dynamic(() => import("@/app/admin/inventory/_components/ModalDeleteProduct")) as typeof ModalDeleteProductType;

// ─── Shared types & constants (exported for use in modal files) ──────────────

export type Product = {
  _id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  shortDescription: string;
  longDescription: string;
  badge?: string;
  rating?: number;
  image: string;
  roast?: string;
};

type InventoryProduct = Pick<
  IProduct,
  "name" | "category" | "price" | "stock" | "shortDescription" | "longDescription" | "badge" | "rating" | "image" | "roast"
> & {
  _id: string;
};

type ProductsApiResponse = {
  success: boolean;
  data: InventoryProduct[];
  message?: string;
};

// Thumbnail colour per category
const CATEGORY_COLORS: Record<string, string> = {
  "Coffee Beans": "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  "Dairy Alternative": "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  Syrups: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  "Paper Goods": "bg-slate-500/10 text-slate-600 dark:text-slate-400",
  Equipment: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
};

function getStockStatus(stock: number) {
  if (stock === 0)
    return {
      label: "Habis",
      colorClass: "text-red-500 bg-red-500/10 border-red-500/20",
      dotClass: "bg-red-500",
    };
  return {
    label: "Tersedia",
    colorClass: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    dotClass: "bg-emerald-500",
  };
}

// ─── Main component ────────────────────────────────────────────────────────────

export default function InventoryClient() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories = useMemo(
    () => Array.from(new Set(products.map((product) => product.category))),
    [products]
  );

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch("/api/products", { cache: "no-store" });
      if (!response.ok) {
        throw new Error("Gagal memuat data inventory");
      }

      const json = (await response.json()) as ProductsApiResponse;
      if (!json.success) {
        throw new Error(json.message || "Gagal memuat data inventory");
      }

      setProducts(json.data);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Gagal memuat data inventory";
      setError(message);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchProducts();
  }, []);

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = async (data: Omit<Product, "_id">) => {
    try {
      setIsSubmitting(true);
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Gagal menambahkan produk");
      }

      setIsOpenAdd(false);
      await fetchProducts();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Gagal menambahkan produk";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = async (data: Product) => {
    try {
      setIsSubmitting(true);
      const response = await fetch(`/api/products/${data._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          category: data.category,
          stock: data.stock,
        }),
      });

      if (!response.ok) {
        throw new Error("Gagal memperbarui produk");
      }

      setIsOpenEdit(false);
      setSelectedProduct(null);
      await fetchProducts();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Gagal memperbarui produk";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedProduct) return;

    try {
      setIsSubmitting(true);
      const response = await fetch(`/api/products/${selectedProduct._id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Gagal menghapus produk");
      }

      setIsOpenDelete(false);
      setSelectedProduct(null);
      await fetchProducts();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Gagal menghapus produk";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const lowStockCount = products.filter((p) => p.stock > 0 && p.stock < 15).length;
  const outOfStockCount = products.filter((p) => p.stock === 0).length;

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-8 pt-4 custom-scrollbar">

      {/* ── Stats Grid ─────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {[
          { label: "Total Produk",  value: products.length.toString(),    icon: Package,       color: "text-[#ec6d13] bg-[#ec6d13]/10" },
          { label: "Stok Habis",    value: outOfStockCount.toString(),     icon: XCircle,       color: "text-red-500 bg-red-500/10"      },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-[#1a140e] p-4 rounded-xl border border-gray-200 dark:border-[#3e342b] flex items-center gap-4 shadow-sm dark:shadow-none"
          >
            <div className={`size-12 rounded-lg flex items-center justify-center ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-gray-500 dark:text-[#8e7f72] text-xs uppercase tracking-wider font-semibold">
                {stat.label}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-[#EAE0D5]">
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {error && (
        <div className="mb-4 text-sm text-red-500">{error}</div>
      )}

      {/* ── Table Card ─────────────────────────────────────────────────────── */}
      <div className="bg-white dark:bg-[#1a140e] rounded-xl border border-gray-200 dark:border-[#3e342b] overflow-hidden shadow-sm dark:shadow-black/40 flex flex-col">

        {/* Toolbar */}
        <div className="p-4 border-b border-gray-200 dark:border-[#3e342b] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-2.5 text-gray-400 dark:text-[#8e7f72]" size={16} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama atau kategori…"
              className="w-full bg-gray-50 dark:bg-[#231910] border border-gray-200 dark:border-[#3e342b] rounded-lg pl-9 pr-4 py-2 text-sm text-gray-900 dark:text-[#EAE0D5] focus:ring-1 focus:ring-[#ec6d13] focus:border-[#ec6d13] outline-none transition-all placeholder-gray-400 dark:placeholder-[#8e7f72]"
            />
          </div>
          <button
            disabled={isSubmitting}
            onClick={() => setIsOpenAdd(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#ec6d13] hover:bg-[#d65c0b] text-white px-5 py-2.5 rounded-lg font-bold shadow-lg shadow-[#ec6d13]/20 transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <Plus size={20} />
            <span>{isSubmitting ? "Memproses..." : "Tambah Produk"}</span>
          </button>
        </div>

        {/* Table — overflow-x-auto ensures horizontal scroll on mobile */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-[#231910] border-b border-gray-200 dark:border-[#3e342b]">
                <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-[#8e7f72] min-w-55">Produk</th>
                <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-[#8e7f72] min-w-37.5">Kategori</th>
                <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-[#8e7f72] min-w-22.5">Stok</th>
                <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-[#8e7f72] min-w-30">Status</th>
                <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-[#8e7f72] min-w-22.5 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-[#3e342b]">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-16 text-center">
                    <p className="text-sm text-gray-400 dark:text-[#8e7f72]">Memuat data inventory...</p>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-16 text-center">
                    <Package size={32} className="mx-auto mb-3 text-gray-300 dark:text-[#4a3f35]" />
                    <p className="text-sm text-gray-400 dark:text-[#8e7f72]">Tidak ada produk ditemukan.</p>
                  </td>
                </tr>
              ) : (
                filtered.map((product) => {
                  const status    = getStockStatus(product.stock);
                  const thumbColor = CATEGORY_COLORS[product.category] ?? "bg-gray-100 text-gray-500";
                  return (
                    <tr
                      key={product._id}
                      className="bg-white dark:bg-[#1a140e] hover:bg-gray-50 dark:hover:bg-[#2a221c] transition-colors"
                    >
                      {/* Produk */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className={`size-10 rounded-lg flex items-center justify-center shrink-0 font-bold text-sm ${thumbColor}`}>
                            {product.name[0].toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">{product.name}</p>
                          </div>
                        </div>
                      </td>

                      {/* Kategori */}
                      <td className="py-4 px-6 text-sm text-gray-700 dark:text-[#EAE0D5]">
                        {product.category}
                      </td>

                      {/* Stok */}
                      <td className="py-4 px-6 text-sm font-medium text-gray-900 dark:text-[#EAE0D5]">
                        {product.stock}
                      </td>

                      {/* Status */}
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${status.colorClass}`}>
                          <span className={`size-1.5 rounded-full ${status.dotClass}`} />
                          {status.label}
                        </span>
                      </td>

                      {/* Aksi */}
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            disabled={isSubmitting}
                            onClick={() => { setSelectedProduct(product); setIsOpenEdit(true); }}
                            className="p-2 rounded-lg text-gray-500 dark:text-[#8e7f72] hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Edit produk"
                          >
                            <Pencil size={15} />
                          </button>
                          <button
                            disabled={isSubmitting}
                            onClick={() => { setSelectedProduct(product); setIsOpenDelete(true); }}
                            className="p-2 rounded-lg text-gray-500 dark:text-[#8e7f72] hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 dark:hover:text-red-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Hapus produk"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 bg-gray-50 dark:bg-[#231910] border-t border-gray-200 dark:border-[#3e342b] flex items-center justify-between">
          <p className="text-xs text-gray-500 dark:text-[#8e7f72]">
            Menampilkan{" "}
            <span className="font-bold text-gray-900 dark:text-[#EAE0D5]">{filtered.length}</span>
            {" "}dari{" "}
            <span className="font-bold text-gray-900 dark:text-[#EAE0D5]">{products.length}</span>
            {" "}produk
          </p>
          <div className="flex gap-2">
            <button
              disabled
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-300 dark:border-[#3e342b] text-xs font-medium text-gray-400 dark:text-[#8e7f72] disabled:opacity-50"
            >
              <ChevronLeft size={14} /> Sebelumnya
            </button>
            <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-300 dark:border-[#3e342b] text-xs font-medium text-gray-500 dark:text-[#8e7f72] hover:text-gray-900 dark:hover:text-[#EAE0D5] hover:bg-gray-100 dark:hover:bg-[#1a140e] transition-colors">
              Berikutnya <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Modals ─────────────────────────────────────────────────────────── */}
      {isOpenAdd && (
        <ModalAddProduct
          categories={categories}
          isSubmitting={isSubmitting}
          onClose={() => setIsOpenAdd(false)}
          onSubmit={handleAdd}
        />
      )}
      {isOpenEdit && selectedProduct && (
        <ModalEditProduct
          product={selectedProduct}
          categories={categories}
          isSubmitting={isSubmitting}
          onClose={() => setIsOpenEdit(false)}
          onSubmit={handleEdit}
        />
      )}
      {isOpenDelete && selectedProduct && (
        <ModalDeleteProduct
          product={selectedProduct}
          isSubmitting={isSubmitting}
          onClose={() => { setIsOpenDelete(false); setSelectedProduct(null); }}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}
