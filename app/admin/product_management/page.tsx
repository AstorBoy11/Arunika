"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import AdminHeader from "@/components/admin-header";
import Image from "next/image";
import { Plus, Search, Edit, ChevronLeft, ChevronRight, Tag, Pencil, Trash2 } from "lucide-react";

type Category = { id: number; name: string; description: string };

type ProductApi = {
  _id: string;
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

type ProductView = {
  id: string;
  name: string;
  desc: string;
  rawPrice: number;
  price: string;
  image: string;
  stock: number;
  category: string;
  shortDescription: string;
  longDescription: string;
  roast?: string;
  badge?: string;
  visible: boolean;
};

type ApiResponse<T> = {
  success: boolean;
  data?: T;
  message?: string;
};

type AddCatProps = { onClose: () => void; onSubmit: (data: Omit<Category, "id">) => void };
type EditCatProps = {
  category: Category;
  affectedCount: number;
  isLoading?: boolean;
  onClose: () => void;
  onSubmit: (data: Category) => void;
};
type DeleteCatProps = {
  category: Category;
  affectedCount: number;
  isLoading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
};
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
type AddProductProps = {
  categories: string[];
  onClose: () => void;
  onSubmit: (data: ProductPayload) => Promise<void>;
};
type EditProductModel = {
  id: string;
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
type EditProductProps = {
  product: EditProductModel;
  onClose: () => void;
  onSubmit: (data: EditProductModel) => Promise<void>;
};

const ModalAddCategory = dynamic<AddCatProps>(() => import("./_components/ModalAddCategory"));
const ModalEditCategory = dynamic<EditCatProps>(() => import("./_components/ModalEditCategory"));
const ModalDeleteCategory = dynamic<DeleteCatProps>(() => import("./_components/ModalDeleteCategory"));
const ModalAddProductPM = dynamic<AddProductProps>(() => import("./_components/ModalAddProductPM"));
const ModalEditProduct = dynamic<EditProductProps>(() => import("./_components/ModalEditProduct"));

const formatRupiah = (num: number): string =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(num);

const defaultCategoryDescription = (name: string): string => `Kategori ${name}`;

export default function AdminProducts() {
  const cardClass =
    "bg-white dark:bg-[#1a140e] border border-gray-200 dark:border-[#3e342b] rounded-xl shadow-sm dark:shadow-none transition-colors";

  const [products, setProducts] = useState<ProductView[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [customCategories, setCustomCategories] = useState<Category[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [isOperationLoading, setIsOperationLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [selectedCat, setSelectedCat] = useState<Category | null>(null);
  const [affectedCount, setAffectedCount] = useState(0);

  const [isOpenAddProduct, setIsOpenAddProduct] = useState(false);
  const [isOpenEditProduct, setIsOpenEditProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<EditProductModel | null>(null);

  const fetchProducts = async (): Promise<void> => {
    setIsLoadingProducts(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/products");
      const result: ApiResponse<ProductApi[]> = (await response.json()) as ApiResponse<ProductApi[]>;

      if (!response.ok || !result.success) {
        throw new Error(result.message ?? "Gagal memuat produk");
      }

      const mappedProducts = (result.data ?? []).map((product) => ({
        id: product._id,
        name: product.name,
        desc: product.shortDescription,
        rawPrice: product.price,
        price: formatRupiah(product.price),
        image: product.image,
        stock: product.stock,
        category: product.category,
        shortDescription: product.shortDescription,
        longDescription: product.longDescription,
        roast: product.roast,
        badge: product.badge,
        visible: product.stock > 0,
      }));

      setProducts(mappedProducts);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Gagal memuat produk";
      setErrorMessage(message);
      setProducts([]);
    } finally {
      setIsLoadingProducts(false);
    }
  };

  const fetchCategories = async (): Promise<void> => {
    try {
      const response = await fetch("/api/products/categories");
      const result: ApiResponse<string[]> = (await response.json()) as ApiResponse<string[]>;

      if (!response.ok || !result.success) {
        throw new Error(result.message ?? "Gagal memuat kategori");
      }

      const baseCategories = (result.data ?? []).map((name, index) => ({
        id: index + 1,
        name,
        description: defaultCategoryDescription(name),
      }));

      setCategories(baseCategories);
    } catch {
      setCategories([]);
    }
  };

  const refreshAll = async (): Promise<void> => {
    await Promise.all([fetchProducts(), fetchCategories()]);
  };

  const getProductsByCategory = async (categoryName: string): Promise<ProductApi[]> => {
    const response = await fetch(`/api/products?category=${encodeURIComponent(categoryName)}`);
    const result: ApiResponse<ProductApi[]> = (await response.json()) as ApiResponse<ProductApi[]>;

    if (!response.ok || !result.success) {
      throw new Error(result.message ?? "Gagal mengambil produk kategori");
    }

    return result.data ?? [];
  };

  const openCategoryEdit = async (category: Category): Promise<void> => {
    setSelectedCat(category);
    setIsOpenEdit(true);

    try {
      const affected = await getProductsByCategory(category.name);
      setAffectedCount(affected.length);
    } catch {
      setAffectedCount(0);
    }
  };

  const openCategoryDelete = async (category: Category): Promise<void> => {
    setSelectedCat(category);
    setIsOpenDelete(true);

    try {
      const affected = await getProductsByCategory(category.name);
      setAffectedCount(affected.length);
    } catch {
      setAffectedCount(0);
    }
  };

  const handleAddCat = (data: Omit<Category, "id">) => {
    setCustomCategories((prev) => {
      const exists = prev.some((category) => category.name.toLowerCase() === data.name.toLowerCase());
      if (exists) return prev;
      return [...prev, { ...data, id: Date.now() }];
    });
    setIsOpenAdd(false);
  };

  const handleEditCat = async (data: Category) => {
    if (!selectedCat) return;

    setIsOperationLoading(true);
    setErrorMessage("");

    try {
      const affected = await getProductsByCategory(selectedCat.name);
      const proceed = window.confirm(
        `Kategori ini dipakai oleh ${affected.length} produk. Lanjut ubah nama kategori?`
      );

      if (!proceed) return;

      await Promise.all(
        affected.map(async (product) => {
          const response = await fetch(`/api/products/${product._id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ category: data.name }),
          });

          const result: ApiResponse<ProductApi> = (await response.json()) as ApiResponse<ProductApi>;
          if (!response.ok || !result.success) {
            throw new Error(result.message ?? "Gagal rename kategori");
          }
        })
      );

      setCustomCategories((prev) =>
        prev.map((category) =>
          category.name === selectedCat.name ? { ...category, name: data.name, description: data.description } : category
        )
      );

      setIsOpenEdit(false);
      setSelectedCat(null);
      await refreshAll();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Gagal mengubah kategori";
      setErrorMessage(message);
    } finally {
      setIsOperationLoading(false);
    }
  };

  const handleDeleteCat = async () => {
    if (!selectedCat) return;

    setIsOperationLoading(true);
    setErrorMessage("");

    try {
      const affected = await getProductsByCategory(selectedCat.name);
      await Promise.all(
        affected.map(async (product) => {
          const response = await fetch(`/api/products/${product._id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ category: "Uncategorized" }),
          });

          const result: ApiResponse<ProductApi> = (await response.json()) as ApiResponse<ProductApi>;
          if (!response.ok || !result.success) {
            throw new Error(result.message ?? "Gagal menghapus kategori");
          }
        })
      );

      setCustomCategories((prev) => prev.filter((category) => category.name !== selectedCat.name));
      setIsOpenDelete(false);
      setSelectedCat(null);
      await refreshAll();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Gagal menghapus kategori";
      setErrorMessage(message);
    } finally {
      setIsOperationLoading(false);
    }
  };

  const handleAddProduct = async (payload: ProductPayload): Promise<void> => {
    setIsOperationLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result: ApiResponse<ProductApi> = (await response.json()) as ApiResponse<ProductApi>;
      if (!response.ok || !result.success) {
        throw new Error(result.message ?? "Gagal menambah produk");
      }

      setIsOpenAddProduct(false);
      await refreshAll();
    } finally {
      setIsOperationLoading(false);
    }
  };

  const handleEditProduct = async (payload: EditProductModel): Promise<void> => {
    setIsOperationLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch(`/api/products/${payload.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: payload.name,
          category: payload.category,
          price: payload.price,
          stock: payload.stock,
          shortDescription: payload.shortDescription,
          longDescription: payload.longDescription,
          image: payload.image,
          roast: payload.roast,
          badge: payload.badge,
        }),
      });

      const result: ApiResponse<ProductApi> = (await response.json()) as ApiResponse<ProductApi>;
      if (!response.ok || !result.success) {
        throw new Error(result.message ?? "Gagal edit produk");
      }

      setIsOpenEditProduct(false);
      setSelectedProduct(null);
      await refreshAll();
    } finally {
      setIsOperationLoading(false);
    }
  };

  const allCategories = useMemo(() => {
    const merged = [...categories, ...customCategories];
    const deduplicated = merged.filter(
      (category, index) =>
        merged.findIndex((candidate) => candidate.name.toLowerCase() === category.name.toLowerCase()) === index
    );
    return deduplicated;
  }, [categories, customCategories]);

  const categoryNames = useMemo(() => allCategories.map((category) => category.name), [allCategories]);

  const filteredProducts = useMemo(() => {
    const keyword = searchQuery.trim().toLowerCase();
    if (!keyword) return products;

    return products.filter((product) => product.name.toLowerCase().includes(keyword));
  }, [products, searchQuery]);

  const pageSize = 8;
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredProducts.slice(start, start + pageSize);
  }, [filteredProducts, currentPage]);

  const startIndex = filteredProducts.length === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endIndex = filteredProducts.length === 0 ? 0 : Math.min(currentPage * pageSize, filteredProducts.length);

  useEffect(() => {
    void refreshAll();
  }, []);

  return (
    <div className="flex flex-col h-full w-full bg-gray-50 dark:bg-[#120d0a]">
      {/* 1. HEADER */}
      <AdminHeader
        title="Product Management"
        subtitle="Manage your coffee inventory and visibility."
      >
      </AdminHeader>

      {/* 2. MAIN CONTENT */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10 pb-20 custom-scrollbar">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-6">

          {errorMessage && (
            <p className="text-xs text-red-500">{errorMessage}</p>
          )}

          {/* Search & Filters */}
          <div className={`${cardClass} p-4 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between`}>

            {/* Search Bar */}
            <div className="relative w-full md:w-96 group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="text-gray-400 dark:text-[#b9a89d] group-focus-within:text-[#ec6d13] transition-colors" size={20} />
              </div>
              <input
                className="block w-full pl-10 pr-3 py-2.5 border-none rounded-lg leading-5 bg-gray-100 dark:bg-[#2c241e] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-[#b9a89d] focus:outline-none focus:ring-2 focus:ring-[#ec6d13] transition-all sm:text-sm"
                placeholder="Search coffee products..."
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
            </div>

            {/* Filter Chips */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
              <button onClick={() => setIsOpenAddProduct(true)} className="flex items-center gap-2 bg-[#ec6d13] hover:bg-[#d65c0b] text-white font-bold py-2.5 px-5 rounded-lg transition-all shadow-lg shadow-[#ec6d13]/20 active:scale-95">
                <Plus size={20} />
                <span>Add New Product</span>
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {isLoadingProducts
              ? Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={`skeleton-${index}`}
                  className="group relative flex flex-col bg-white dark:bg-[#1a140e] border border-gray-200 dark:border-[#3e342b] rounded-2xl overflow-hidden hover:border-[#ec6d13]/50 transition-all duration-300 hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-black/20 hover:-translate-y-1"
                >
                  <div className="relative aspect-square w-full overflow-hidden bg-gray-100 dark:bg-[#2c241e]" />
                  <div className="flex flex-1 flex-col p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">...</h3>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-[#b9a89d] mb-4 line-clamp-2">...</p>
                    <div className="mt-auto pt-4 border-t border-gray-100 dark:border-[#392f28] flex items-center justify-between">
                      <span className="text-xl font-bold text-gray-900 dark:text-white">...</span>
                      <div className="flex items-center gap-3">
                        <button className="text-gray-400 dark:text-[#b9a89d] p-1 rounded-full" title="Edit Product">
                          <Edit size={20} />
                        </button>
                        <label className="relative inline-flex items-center cursor-pointer" title="Toggle Visibility">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-9 h-5 bg-gray-300 dark:bg-[#392f28] rounded-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white dark:after:bg-[#EAE0D5] after:border-gray-300 dark:after:border-[#5a4d42] after:border after:rounded-full after:h-4 after:w-4" />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              ))
              : paginatedProducts.map((product) => (
                <div
                  key={product.id}
                  className={`group relative flex flex-col bg-white dark:bg-[#1a140e] border border-gray-200 dark:border-[#3e342b] rounded-2xl overflow-hidden hover:border-[#ec6d13]/50 transition-all duration-300 hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-black/20 hover:-translate-y-1 ${!product.visible ? "opacity-75 hover:opacity-100" : ""}`}
                >

                  {/* Image Container */}
                  <div className="relative aspect-square w-full overflow-hidden bg-gray-100 dark:bg-[#2c241e]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className={`object-cover transition-transform duration-500 group-hover:scale-105 ${!product.visible ? "grayscale-[50%] group-hover:grayscale-0" : ""}`}
                    />

                    {/* Hidden Overlay */}
                    {!product.visible && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center pointer-events-none opacity-100 group-hover:opacity-0 transition-opacity">
                        <span className="bg-black/60 text-white px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">HIDDEN</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">{product.name}</h3>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-[#b9a89d] mb-4 line-clamp-2">{product.desc}</p>

                    <div className="mt-auto pt-4 border-t border-gray-100 dark:border-[#392f28] flex items-center justify-between">
                      <span className="text-xl font-bold text-gray-900 dark:text-white">{product.price}</span>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => {
                            setSelectedProduct({
                              id: product.id,
                              name: product.name,
                              category: product.category,
                              price: product.rawPrice,
                              stock: product.stock,
                              shortDescription: product.shortDescription,
                              longDescription: product.longDescription,
                              image: product.image,
                              roast: product.roast,
                              badge: product.badge,
                            });
                            setIsOpenEditProduct(true);
                          }}
                          className="text-gray-400 dark:text-[#b9a89d] hover:text-gray-900 dark:hover:text-white p-1 rounded-full hover:bg-gray-100 dark:hover:bg-[#392f28] transition-colors"
                          title="Edit Product"
                        >
                          <Edit size={20} />
                        </button>

                        {/* Toggle Switch */}
                        <label className="relative inline-flex items-center cursor-pointer" title="Edit stok di form edit produk">
                          <input
                            type="checkbox"
                            checked={product.visible}
                            onChange={() => {
                              setSelectedProduct({
                                id: product.id,
                                name: product.name,
                                category: product.category,
                                price: product.rawPrice,
                                stock: product.stock,
                                shortDescription: product.shortDescription,
                                longDescription: product.longDescription,
                                image: product.image,
                                roast: product.roast,
                                badge: product.badge,
                              });
                              setIsOpenEditProduct(true);
                            }}
                            className="sr-only peer"
                          />
                          <div className="w-9 h-5 bg-gray-300 dark:bg-[#392f28] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white dark:after:bg-[#EAE0D5] after:border-gray-300 dark:after:border-[#5a4d42] after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#ec6d13]"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* Pagination */}
          <div className={`${cardClass} mt-6 p-4 flex justify-between items-center`}>
            <span className="text-sm text-gray-500 dark:text-[#b9a89d]">Showing <span className="text-gray-900 dark:text-white font-semibold">{startIndex}-{endIndex}</span> of <span className="text-gray-900 dark:text-white font-semibold">{filteredProducts.length}</span> products</span>
            <div className="flex gap-2">
              <button
                className="px-2 py-1 rounded-lg border border-gray-200 dark:border-[#392f28] text-gray-400 dark:text-[#b9a89d] hover:bg-gray-100 dark:hover:bg-[#392f28] hover:text-gray-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              >
                <ChevronLeft size={20} />
              </button>

              {Array.from({ length: totalPages }).map((_, index) => {
                const page = index + 1;
                const isActive = page === currentPage;

                if (totalPages > 7 && page !== 1 && page !== totalPages && Math.abs(page - currentPage) > 1) {
                  if (page === currentPage - 2 || page === currentPage + 2) {
                    return (
                      <button key={`ellipsis-${page}`} className="px-3 py-1 rounded-lg border border-gray-200 dark:border-[#392f28] text-gray-500 dark:text-[#b9a89d] hover:bg-gray-100 dark:hover:bg-[#392f28] hover:text-gray-900 dark:hover:text-white transition-colors">
                        ...
                      </button>
                    );
                  }
                  return null;
                }

                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded-lg border border-gray-200 dark:border-[#392f28] transition-colors ${
                      isActive
                        ? "text-white bg-[#ec6d13] hover:bg-[#d65c0b]"
                        : "text-gray-500 dark:text-[#b9a89d] hover:bg-gray-100 dark:hover:bg-[#392f28] hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                className="px-2 py-1 rounded-lg border border-gray-200 dark:border-[#392f28] text-gray-500 dark:text-[#b9a89d] hover:bg-gray-100 dark:hover:bg-[#392f28] hover:text-gray-900 dark:hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* ── Manajemen Kategori ─────────────────────────────────────────── */}
          <div className={`${cardClass} overflow-hidden`}>

            {/* Card header */}
            <div className="p-4 border-b border-gray-200 dark:border-[#3e342b] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Tag size={17} className="text-[#ec6d13]" />
                  Manajemen Kategori
                </h2>
                <p className="text-xs text-gray-500 dark:text-[#8e7f72] mt-0.5">
                  Kelola jenis/kategori produk yang tersedia
                </p>
                <p className="text-xs text-gray-500 dark:text-[#8e7f72] mt-0.5">
                  Kategori tersedia di dropdown saat tambah produk
                </p>
              </div>
              <button
                onClick={() => setIsOpenAdd(true)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#ec6d13] hover:bg-[#d65c0b] text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md shadow-[#ec6d13]/20 transition-all active:scale-95"
              >
                <Plus size={16} />
                <span>Tambah Kategori</span>
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-[#231910] border-b border-gray-200 dark:border-[#3e342b]">
                    <th className="py-3 px-6 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-[#8e7f72] min-w-48">Nama Kategori</th>
                    <th className="py-3 px-6 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-[#8e7f72] min-w-72">Deskripsi</th>
                    <th className="py-3 px-6 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-[#8e7f72] min-w-24 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-[#3e342b]">
                  {allCategories.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="py-10 text-center">
                        <Tag size={28} className="mx-auto mb-2 text-gray-300 dark:text-[#4a3f35]" />
                        <p className="text-sm text-gray-400 dark:text-[#8e7f72]">Belum ada kategori.</p>
                      </td>
                    </tr>
                  ) : (
                    allCategories.map((cat) => (
                      <tr key={cat.id} className="hover:bg-gray-50 dark:hover:bg-[#2a221c] transition-colors">
                        <td className="py-3 px-6">
                          <div className="flex items-center gap-3">
                            <div className="size-8 rounded-lg bg-[#ec6d13]/10 flex items-center justify-center shrink-0">
                              <Tag size={13} className="text-[#ec6d13]" />
                            </div>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">{cat.name}</p>
                          </div>
                        </td>
                        <td className="py-3 px-6">
                          <p className="text-sm text-gray-500 dark:text-[#8e7f72] line-clamp-1">
                            {cat.description || <span className="italic text-gray-400 dark:text-[#4a3f35]">Tidak ada deskripsi</span>}
                          </p>
                        </td>
                        <td className="py-3 px-6">
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={() => {
                                void openCategoryEdit(cat);
                              }}
                              className="p-1.5 rounded-lg text-gray-500 dark:text-[#8e7f72] hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                              title="Edit kategori"
                            >
                              <Pencil size={14} />
                            </button>
                            <button
                              onClick={() => {
                                void openCategoryDelete(cat);
                              }}
                              className="p-1.5 rounded-lg text-gray-500 dark:text-[#8e7f72] hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                              title="Hapus kategori"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>

      {/* ── Category Modals ────────────────────────────────────────────────── */}
      {isOpenAdd && (
        <ModalAddCategory
          onClose={() => setIsOpenAdd(false)}
          onSubmit={handleAddCat}
        />
      )}
      {isOpenEdit && selectedCat && (
        <ModalEditCategory
          category={selectedCat}
          affectedCount={affectedCount}
          isLoading={isOperationLoading}
          onClose={() => { setIsOpenEdit(false); setSelectedCat(null); }}
          onSubmit={(data) => {
            void handleEditCat(data);
          }}
        />
      )}
      {isOpenDelete && selectedCat && (
        <ModalDeleteCategory
          category={selectedCat}
          affectedCount={affectedCount}
          isLoading={isOperationLoading}
          onClose={() => { setIsOpenDelete(false); setSelectedCat(null); }}
          onConfirm={() => {
            void handleDeleteCat();
          }}
        />
      )}

      {isOpenAddProduct && (
        <ModalAddProductPM
          categories={categoryNames}
          onClose={() => setIsOpenAddProduct(false)}
          onSubmit={handleAddProduct}
        />
      )}

      {isOpenEditProduct && selectedProduct && (
        <ModalEditProduct
          product={selectedProduct}
          onClose={() => {
            setIsOpenEditProduct(false);
            setSelectedProduct(null);
          }}
          onSubmit={handleEditProduct}
        />
      )}
    </div>
  );
}
