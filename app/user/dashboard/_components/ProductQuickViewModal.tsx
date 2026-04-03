"use client";

import Image from "next/image";
import { X, Star, ShoppingCart } from "lucide-react";

// Shared product type – imported by DashboardClient too
export interface Product {
  _id: string;
  name: string;
  priceNum: number;
  desc: string;
  description: string;
  badge: string | null;
  rating: number;
  image: string;
  roast: string;
}

interface Props {
  product: Product;
  isDark: boolean;
  onAddToCart: (product: Product) => void;
  onClose: () => void;
}

const formatRupiah = (n: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(n);

export default function ProductQuickViewModal({ product, isDark, onAddToCart, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`relative z-10 w-full max-w-2xl max-h-[90dvh] rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-200 ${
          isDark ? "bg-[#1a140e]" : "bg-white"
        }`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 z-20 p-2 rounded-full transition-colors ${
            isDark
              ? "bg-[#231910]/90 text-[#b9a89d] hover:text-white"
              : "bg-white/90 text-[#8b7355] hover:text-[#1a140e]"
          }`}
        >
          <X size={18} />
        </button>

        {/* Image panel */}
        <div
          className={`relative w-full aspect-square md:w-80 md:aspect-auto shrink-0 ${
            isDark ? "bg-[#231910]" : "bg-[#f5f0eb]"
          }`}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 320px"
          />
          {product.badge && (
            <span
              className={`absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full shadow-md ${
                product.badge === "Best Seller"
                  ? "bg-[#ec6d13] text-white"
                  : "bg-emerald-500 text-white"
              }`}
            >
              {product.badge}
            </span>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col gap-4 p-6 flex-1 min-h-0 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {/* Name + Stars */}
          <div>
            <h2
              className={`text-2xl font-bold leading-snug ${
                isDark ? "text-white" : "text-[#1a140e]"
              }`}
            >
              {product.name}
            </h2>
            <div className="flex items-center gap-1.5 mt-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={
                    i < Math.round(product.rating)
                      ? "fill-amber-400 text-amber-400"
                      : isDark
                      ? "fill-[#3e342b] text-[#3e342b]"
                      : "fill-[#e5ddd5] text-[#e5ddd5]"
                  }
                />
              ))}
              <span
                className={`text-xs font-semibold ml-1 ${
                  isDark ? "text-[#b9a89d]" : "text-[#8b7355]"
                }`}
              >
                {product.rating} / 5.0
              </span>
            </div>
          </div>

          {/* Price */}
          <p className="text-2xl font-bold text-[#ec6d13]">
            {formatRupiah(product.priceNum)}
          </p>

          {/* Divider */}
          <div className={`h-px ${isDark ? "bg-[#3e342b]" : "bg-[#e5ddd5]"}`} />

          {/* Description */}
          <p
            className={`text-sm leading-relaxed ${
              isDark ? "text-[#b9a89d]" : "text-[#8b7355]"
            }`}
          >
            {product.description}
          </p>

          <div className="flex-1" />

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className={`px-5 py-3 rounded-xl border font-semibold text-sm transition-all ${
                isDark
                  ? "border-[#3e342b] text-[#b9a89d] hover:bg-[#231910] hover:text-white"
                  : "border-[#e5ddd5] text-[#8b7355] hover:bg-[#f5f0eb] hover:text-[#1a140e]"
              }`}
            >
              Tutup
            </button>
            <button
              onClick={() => onAddToCart(product)}
              className="flex-1 py-3 px-4 rounded-xl bg-[#ec6d13] hover:bg-[#d65c0b] text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#ec6d13]/25"
            >
              <ShoppingCart size={16} />
              Tambah ke Keranjang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
