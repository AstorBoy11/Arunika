"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Heart, ShoppingCart, ChevronDown, Star } from "lucide-react";
import dynamic from "next/dynamic";
import { useTheme } from "@/context/ThemeContext";
import type { IProduct } from "@/lib/models";
import type { Product } from "./ProductQuickViewModal";

// ─── Lazy-load modal: its JS is only downloaded when the user first clicks a product ───
const ProductQuickViewModal = dynamic(
  () => import("./ProductQuickViewModal"),
  { ssr: false }
);

type DashboardProduct = Pick<
  IProduct,
  "name" | "price" | "shortDescription" | "longDescription" | "badge" | "rating" | "image" | "roast" | "category"
> & {
  _id: string;
};

type ProductsApiResponse = {
  success: boolean;
  data: DashboardProduct[];
  message?: string;
};

type CategoriesApiResponse = {
  success: boolean;
  data: string[];
  message?: string;
};

type CartStorageItem = {
  _id: string;
  name: string;
  price: number;
  image: string;
  roast: string;
  quantity: number;
};

type SortOption = "default" | "price-asc" | "price-desc";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "default",    label: "Terbaru" },
  { value: "price-asc",  label: "Harga: Termurah ke Termahal" },
  { value: "price-desc", label: "Harga: Termahal ke Termurah" },
];

const formatRupiah = (n: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(n);

// ─────────────────────────────────────────────────────────────────────────────

export default function DashboardClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const selectedCategory = searchParams.get("category") || "all";
  const searchKeyword = searchParams.get("search") || "";

  const [products, setProducts] = useState<DashboardProduct[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [productsError, setProductsError] = useState<string | null>(null);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);

  // ── Sort state ──
  const [sortOption, setSortOption] = useState<SortOption>("default");
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setProductsLoading(true);
        setProductsError(null);

        const params = new URLSearchParams();
        if (selectedCategory !== "all") {
          params.set("category", selectedCategory);
        }
        if (searchKeyword.trim()) {
          params.set("search", searchKeyword.trim());
        }

        const endpoint = params.toString() ? `/api/products?${params.toString()}` : "/api/products";
        const response = await fetch(endpoint, { cache: "no-store" });

        if (!response.ok) {
          throw new Error("Gagal memuat produk");
        }

        const json = (await response.json()) as ProductsApiResponse;
        if (!json.success) {
          throw new Error(json.message || "Gagal memuat produk");
        }

        setProducts(json.data);
      } catch (error) {
        const message = error instanceof Error ? error.message : "Gagal memuat produk";
        setProductsError(message);
        setProducts([]);
      } finally {
        setProductsLoading(false);
      }
    };

    void fetchProducts();
  }, [selectedCategory, searchKeyword]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true);
        setCategoriesError(null);

        const response = await fetch("/api/products/categories", { cache: "no-store" });
        if (!response.ok) {
          throw new Error("Gagal memuat kategori");
        }

        const json = (await response.json()) as CategoriesApiResponse;
        if (!json.success) {
          throw new Error(json.message || "Gagal memuat kategori");
        }

        setCategories(json.data);
      } catch (error) {
        const message = error instanceof Error ? error.message : "Gagal memuat kategori";
        setCategoriesError(message);
        setCategories([]);
      } finally {
        setCategoriesLoading(false);
      }
    };

    void fetchCategories();
  }, []);

  // ── Quick View state ──
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProduct(null);
    };
    if (selectedProduct) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selectedProduct]);

  const upsertQueryParam = (key: "category" | "search", value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!value || value.trim() === "") {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  const handleCategoryChange = (category: string) => {
    if (category === "all") {
      upsertQueryParam("category", null);
      return;
    }

    upsertQueryParam("category", category);
  };

  const toModalProduct = (product: DashboardProduct): Product => ({
    _id: product._id,
    name: product.name,
    priceNum: product.price,
    desc: product.shortDescription,
    description: product.longDescription,
    badge: product.badge || null,
    rating: product.rating || 0,
    image: product.image,
    roast: product.roast || "",
  });

  const addToCart = (product: Product) => {
    const stored = window.localStorage.getItem("arunika-cart");
    let existingItems: CartStorageItem[] = [];

    if (stored) {
      try {
        existingItems = JSON.parse(stored) as CartStorageItem[];
      } catch {
        existingItems = [];
      }
    }

    const existingIndex = existingItems.findIndex((item) => item._id === product._id);
    if (existingIndex >= 0) {
      existingItems[existingIndex] = {
        ...existingItems[existingIndex],
        quantity: existingItems[existingIndex].quantity + 1,
      };
    } else {
      existingItems.push({
        _id: product._id,
        name: product.name,
        price: product.priceNum,
        image: product.image,
        roast: product.roast,
        quantity: 1,
      });
    }

    window.localStorage.setItem("arunika-cart", JSON.stringify(existingItems));
  };

  const sortedProducts = useMemo(() => {
    const arr = [...products];
    if (sortOption === "price-asc")  return arr.sort((a, b) => a.price - b.price);
    if (sortOption === "price-desc") return arr.sort((a, b) => b.price - a.price);
    return arr;
  }, [products, sortOption]);

  const sortedAndMappedProducts = useMemo(
    () => sortedProducts.map((product) => toModalProduct(product)),
    [sortedProducts]
  );

  const filterButtons = ["all", ...categories] as const;

  return (
    <>
      {/* --- FILTERS & SORT --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          {filterButtons.map((filter) => (
            <button
              key={filter}
              onClick={() => handleCategoryChange(filter)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                selectedCategory === filter
                  ? "bg-[#ec6d13] text-white shadow-lg shadow-[#ec6d13]/20"
                  : isDark
                  ? "bg-[#1a140e] border border-[#3e342b] text-[#b9a89d] hover:text-white hover:border-[#ec6d13]/50"
                  : "bg-white border border-[#e5ddd5] text-[#8b7355] hover:text-[#1a140e] hover:border-[#ec6d13]/50"
              }`}
            >
              {filter === "all" ? "Semua" : filter}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div ref={sortRef} className="relative flex items-center gap-2 min-w-fit">
          <span className={`text-sm font-medium ${isDark ? "text-[#b9a89d]" : "text-[#8b7355]"}`}>
            Urutkan:
          </span>
          <button
            onClick={() => setSortOpen((v) => !v)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-semibold transition-all ${
              sortOpen
                ? "border-[#ec6d13] text-[#ec6d13] " + (isDark ? "bg-[#1a140e]" : "bg-white")
                : isDark
                ? "bg-[#1a140e] border-[#3e342b] text-white hover:border-[#ec6d13]/60"
                : "bg-white border-[#e5ddd5] text-[#1a140e] hover:border-[#ec6d13]/60"
            }`}
          >
            {SORT_OPTIONS.find((o) => o.value === sortOption)?.label}
            <ChevronDown
              size={15}
              className={`shrink-0 transition-transform duration-200 ${sortOpen ? "rotate-180" : ""}`}
            />
          </button>

          {sortOpen && (
            <div
              className={`absolute top-full right-0 mt-2 w-60 rounded-2xl border shadow-2xl z-30 overflow-hidden ${
                isDark
                  ? "bg-[#1a140e] border-[#3e342b] shadow-black/50"
                  : "bg-white border-[#e5ddd5] shadow-black/10"
              }`}
            >
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => { setSortOption(opt.value); setSortOpen(false); }}
                  className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors ${
                    sortOption === opt.value
                      ? "text-[#ec6d13] bg-[#ec6d13]/10"
                      : isDark
                      ? "text-[#b9a89d] hover:bg-[#231910] hover:text-white"
                      : "text-[#8b7355] hover:bg-[#f5f0eb] hover:text-[#1a140e]"
                  }`}
                >
                  {opt.label}
                  {sortOption === opt.value && (
                    <span className="w-2 h-2 rounded-full bg-[#ec6d13] shrink-0" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* --- PRODUCT GRID --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {(productsLoading || categoriesLoading) && (
          <div className={`col-span-full text-sm ${isDark ? "text-[#b9a89d]" : "text-[#8b7355]"}`}>
            Memuat produk...
          </div>
        )}

        {!productsLoading && productsError && (
          <div className="col-span-full text-sm text-red-500">{productsError}</div>
        )}

        {!categoriesLoading && categoriesError && (
          <div className="col-span-full text-sm text-red-500">{categoriesError}</div>
        )}

        {!productsLoading && !productsError && sortedAndMappedProducts.length === 0 && (
          <div className={`col-span-full text-sm ${isDark ? "text-[#b9a89d]" : "text-[#8b7355]"}`}>
            Tidak ada produk ditemukan.
          </div>
        )}

        {!productsLoading && !productsError && sortedAndMappedProducts.map((product, index) => (
          <div
            key={product._id}
            onClick={() => setSelectedProduct(product)}
            className={`group rounded-2xl p-3 border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col cursor-pointer ${
              isDark
                ? "bg-[#1a140e] border-[#3e342b] hover:border-[#ec6d13]/50 hover:shadow-black/20"
                : "bg-white border-[#e5ddd5] hover:border-[#ec6d13]/50 hover:shadow-black/10"
            }`}
          >
            {/* Image */}
            <div
              className={`relative aspect-square rounded-xl overflow-hidden mb-4 ${
                isDark ? "bg-[#231910]" : "bg-[#f5f0eb]"
              }`}
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                // Optimised: tell browser which size to serve per breakpoint
                // Grid is 1-col → 2-col → 3-col → 4-col
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                // Only the first two cards are likely above the fold
                priority={index < 2}
              />
              {product.badge && (
                <span
                  className={`absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full shadow-md ${
                    product.badge === "Best Seller"
                      ? "bg-[#ec6d13] text-white"
                      : "bg-emerald-500 text-white"
                  }`}
                >
                  {product.badge}
                </span>
              )}
              <button
                onClick={(e) => e.stopPropagation()}
                className={`absolute top-3 right-3 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 ${
                  isDark
                    ? "bg-black/50 text-white hover:text-red-400"
                    : "bg-white/80 text-[#8b7355] hover:text-red-500"
                }`}
              >
                <Heart size={16} />
              </button>
            </div>

            {/* Details */}
            <div className="flex flex-col gap-1 px-1 flex-1">
              <div className="flex justify-between items-start">
                <h3
                  className={`text-lg font-bold leading-tight group-hover:text-[#ec6d13] transition-colors ${
                    isDark ? "text-white" : "text-[#1a140e]"
                  }`}
                >
                  {product.name}
                </h3>
                <span className="font-bold text-base text-[#ec6d13]">
                  {formatRupiah(product.priceNum)}
                </span>
              </div>

              <div className="flex items-center gap-1 mt-0.5">
                <Star size={14} className="fill-amber-400 text-amber-400" />
                <span className={`text-xs font-semibold ${isDark ? "text-white" : "text-[#1a140e]"}`}>
                  {product.rating}
                </span>
              </div>

              <p className={`text-sm line-clamp-2 mb-4 mt-1 ${isDark ? "text-[#b9a89d]" : "text-[#8b7355]"}`}>
                {product.desc}
              </p>

              <div className="mt-auto">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                  className={`w-full py-2.5 rounded-xl font-bold text-sm hover:bg-[#ec6d13] hover:text-white transition-colors flex items-center justify-center gap-2 group/btn ${
                    isDark ? "bg-white text-[#231910]" : "bg-[#1a140e] text-white"
                  }`}
                >
                  Add to Cart
                  <ShoppingCart size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick View Modal – lazily loaded chunk */}
      {selectedProduct && (
        <ProductQuickViewModal
          product={selectedProduct}
          isDark={isDark}
          onAddToCart={addToCart}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}
