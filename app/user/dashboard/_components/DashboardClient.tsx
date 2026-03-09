"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import { Heart, ShoppingCart, ChevronDown, Star } from "lucide-react";
import dynamic from "next/dynamic";
import { useTheme } from "@/context/ThemeContext";
import type { Product } from "./ProductQuickViewModal";

// ─── Lazy-load modal: its JS is only downloaded when the user first clicks a product ───
const ProductQuickViewModal = dynamic(
  () => import("./ProductQuickViewModal"),
  { ssr: false }
);

// ─── Product data (static – defined outside component so it's not recreated) ───
const products: Product[] = [
  {
    id: 1,
    name: "Ethiopian Yirgacheffe",
    priceNum: 280000,
    desc: "Floral aroma with notes of jasmine and lemon. A bright, tea-like body.",
    description:
      "Sourced from the highlands of Yirgacheffe, this single-origin bean is celebrated for its delicate floral notes of jasmine and bergamot, complemented by bright lemon citrus. The cup is light-to-medium bodied with a clean, tea-like finish that lingers beautifully.",
    badge: "Best Seller",
    rating: 4.9,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB06jAOy0e6VpbUp6hOlshceiORePg0Pvs54Ms1qza9ov8vm15VJSj1Eb1JC77MblwiNTKnzB2nPHoFeAxeU4MGM3NBLBP4BJ4p5wWGyqGo9VhyUJcfiLe3UPyu62xbnZ9gDf5Ix_8i4XZzJiO02V51N2DdLf8Lcz0fsub86I5w_CooD2yzLy7W74c0gRgMhXPmyYyVdk6RpoGm__Oobfw8F6ajbFBcleBXcQcupgr37UVMWcWnGKD-LTNbV06oSBM2fWSHaKEwlvEs",
  },
  {
    id: 2,
    name: "Sumatra Mandheling",
    priceNum: 195000,
    desc: "Full body with an intense, earthy aroma and herbal nuances. Low acidity.",
    description:
      "Grown at 1,500 m altitude in the volcanic soils of West Sumatra, Mandheling delivers a signature wet-hulled profile. Expect bold earthiness, dark chocolate undertones, and a syrupy body with remarkably low acidity — perfect for afternoon brewing.",
    badge: null,
    rating: 4.8,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAMFtMAcIKaVPvQYctBLheaTsf6inh5kusmEPv8dAtt5CAkGFWWo3JLMGqvsOnwsKqi028amHlsFfvdsDauUTrhZ4p9KHwImj23Z7D-WDj4SCW4iWt1Wr9Y5Jph1l-Zl1w9ADQaiC2qomr4HoWL21tPCxi1pECQY05QzaoGHraPUvMxPeGzCw9nIA5jlZmDT3WWLtVLtfDZd7rx7UZfDdyOoTFOdZU8CPjMVmrN7-uhc7Sb4fPLXQYgmJ3XVPIw9U61Dcm6pKtOeFUe",
  },
  {
    id: 3,
    name: "Colombia Supremo",
    priceNum: 175000,
    desc: "Smooth and sweet with notes of caramel and fruit. Perfectly balanced.",
    description:
      "Hand-picked from Colombia's premier coffee estates, this Supremo grade bean strikes a perfect balance between sweetness and complexity. Notes of brown sugar, red apple, and milk chocolate make it ideal for any brewing method from pour-over to French press.",
    badge: "Baru",
    rating: 4.7,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD6Rtnqc0knxLE0r6zNwSbxxLmdh0ae94THdw8aYmdqKQHlmXJ92jN4e8Vvv43VKMHu22zHUS2K2ZayLP-iNNcbihw9FoQssku8mEx5G5C53iEWRK0DvM7Z__UYBi5gi57IQfSIZcq51AzlbLhXSOnGSWPMX-D63RhH6tFjUNPe5FMuFy-MoRKJeORdOS_kZ_vwFOBhkxgi1CsVfLoFRxFog7gF6LgsiDFT7-gnY98VwJ5DrXITR2F4rE7qMC_K48Ul714wdJLlFi7X",
  },
  {
    id: 4,
    name: "Espresso House Blend",
    priceNum: 210000,
    desc: "Our signature blend crafted for the perfect crema. Bold, rich, and syrupy.",
    description:
      "Our master blender's signature creation — a precise ratio of Brazilian Santos and Colombian Excelso, designed to pull a perfect espresso with a rich, hazelnut-hued crema. Equally exceptional as a lungo, flat white, or cold brew concentrate.",
    badge: null,
    rating: 4.6,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDqGbCu-PjW8XJl7mlArgoi-f-vnEr1jU24YXaLBZy3GtN0Lpg58p-6XoCoqpy5_AGJSfQG9zMwACIs__tFEvH5DqvoOdJqpZh9TGgDYUVU7Ov0hzL4DFjymyw63rxvgXxfvW0W8yV6BlkRXmF7ehphhQ7ikj-ZRhDBaeOOeqoKncRZmcGf6fZFXo9cjZwnMjJIMuVONl1NXJEyg6Tch3KRqypH06M9t_xZMHsQrEUUt-XNBfLsduQ2W2yfM_itJUavmr_te7l5Kkk",
  },
  {
    id: 5,
    name: "Kenya AA",
    priceNum: 320000,
    desc: "Complex flavor profile with distinct blackcurrant notes and wine-like acidity.",
    description:
      "Kenya AA is the country's highest screen size grade, sourced from the fertile red soil of the Central Province. Bold and wine-like with a pronounced blackcurrant acidity, it finishes with a lingering, grape-like sweetness that coffee connoisseurs treasure.",
    badge: null,
    rating: 4.9,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCg8ODvWlvkdaCvcwj4ZDEyB-nN7KV-94P5awGyPN2gMvB3JGDpnsh0TO1gPLbdCx21TCitKds-hOq5hRVz6XQzCM-Etep_5yy1SY65yJxnRcoHD7ccQCe1XILPKbCA52qnIqTIsAwlyIarKkASw9peo8Gr9ZNXkbsOpedWJQ3nnUM7KBXojrR4JKeXrPqLb-wX7hQMaoT31wgpBKtZTdkIzCqvlpoJGmuERvsL--ezS3KvzkV2hwpVIIWUVErh1MssRTUs_xojG5Ct",
  },
  {
    id: 6,
    name: "Costa Rica Tarrazu",
    priceNum: 240000,
    desc: "Crisp and clean with hints of citrus and chocolate. High altitude grown.",
    description:
      "From the renowned Tarrazu valley — one of Costa Rica's most celebrated micro-regions — this bean is solar-dried and precisely light-roasted to highlight bright grapefruit zest, smooth milk chocolate, and a lingering honey-sweet finish.",
    badge: null,
    rating: 4.5,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvGk1zhDtmMOqQ1x_HziqscnUUvGCn5mHFopvl78tlL12hsu3SzzsueoNdvOgF-eqL5RJG5woPgo4sXYgZtzAqAYKqKHicJF7QzwCDXoVAvz6hc3IuvOkdJ93PGBc7aRTxRT4Bk2FrnndhdIm3e8Y6bxlG8BAardAVERopssnsjru_0RbmwoIUEY4l1KFrTC4YBq721wzRMk5fWlvQIVKvFZ3rdRhneSC1r0AUiOXYy4wCWugITCovUwTCJlvFD2xDyYbqYWo5J84s",
  },
];

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
  const { theme } = useTheme();
  const isDark = theme === "dark";

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

  const sortedProducts = useMemo(() => {
    const arr = [...products];
    if (sortOption === "price-asc")  return arr.sort((a, b) => a.priceNum - b.priceNum);
    if (sortOption === "price-desc") return arr.sort((a, b) => b.priceNum - a.priceNum);
    return arr;
  }, [sortOption]);

  return (
    <>
      {/* --- FILTERS & SORT --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          {["Coffee Based", "Milk Based", "Medium", "Dark", "Decaf"].map((filter, index) => (
            <button
              key={filter}
              className={`px-5 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                index === 0
                  ? "bg-[#ec6d13] text-white shadow-lg shadow-[#ec6d13]/20"
                  : isDark
                  ? "bg-[#1a140e] border border-[#3e342b] text-[#b9a89d] hover:text-white hover:border-[#ec6d13]/50"
                  : "bg-white border border-[#e5ddd5] text-[#8b7355] hover:text-[#1a140e] hover:border-[#ec6d13]/50"
              }`}
            >
              {filter}
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
        {sortedProducts.map((product, index) => (
          <div
            key={product.id}
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
                  onClick={(e) => e.stopPropagation()}
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
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}
