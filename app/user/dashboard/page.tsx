"use client";

import Image from "next/image";
import {
  Heart,
  ShoppingCart,
  ChevronDown,
  Star,
  Coffee,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

// Data Dummy Produk
const products = [
  {
    id: 1,
    name: "Ethiopian Yirgacheffe",
    price: "$22.00",
    desc: "Floral aroma with notes of jasmine and lemon. A bright, tea-like body.",
    badge: "Best Seller",
    rating: 4.9,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB06jAOy0e6VpbUp6hOlshceiORePg0Pvs54Ms1qza9ov8vm15VJSj1Eb1JC77MblwiNTKnzB2nPHoFeAxeU4MGM3NBLBP4BJ4p5wWGyqGo9VhyUJcfiLe3UPyu62xbnZ9gDf5Ix_8i4XZzJiO02V51N2DdLf8Lcz0fsub86I5w_CooD2yzLy7W74c0gRgMhXPmyYyVdk6RpoGm__Oobfw8F6ajbFBcleBXcQcupgr37UVMWcWnGKD-LTNbV06oSBM2fWSHaKEwlvEs",
  },
  {
    id: 2,
    name: "Sumatra Mandheling",
    price: "$19.50",
    desc: "Full body with an intense, earthy aroma and herbal nuances. Low acidity.",
    badge: null,
    rating: 4.8,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAMFtMAcIKaVPvQYctBLheaTsf6inh5kusmEPv8dAtt5CAkGFWWo3JLMGqvsOnwsKqi028amHlsFfvdsDauUTrhZ4p9KHwImj23Z7D-WDj4SCW4iWt1Wr9Y5Jph1l-Zl1w9ADQaiC2qomr4HoWL21tPCxi1pECQY05QzaoGHraPUvMxPeGzCw9nIA5jlZmDT3WWLtVLtfDZd7rx7UZfDdyOoTFOdZU8CPjMVmrN7-uhc7Sb4fPLXQYgmJ3XVPIw9U61Dcm6pKtOeFUe",
  },
  {
    id: 3,
    name: "Colombia Supremo",
    price: "$18.00",
    desc: "Smooth and sweet with notes of caramel and fruit. Perfectly balanced.",
    badge: "Baru",
    rating: 4.7,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD6Rtnqc0knxLE0r6zNwSbxxLmdh0ae94THdw8aYmdqKQHlmXJ92jN4e8Vvv43VKMHu22zHUS2K2ZayLP-iNNcbihw9FoQssku8mEx5G5C53iEWRK0DvM7Z__UYBi5gi57IQfSIZcq51AzlbLhXSOnGSWPMX-D63RhH6tFjUNPe5FMuFy-MoRKJeORdOS_kZ_vwFOBhkxgi1CsVfLoFRxFog7gF6LgsiDFT7-gnY98VwJ5DrXITR2F4rE7qMC_K48Ul714wdJLlFi7X",
  },
  {
    id: 4,
    name: "Espresso House Blend",
    price: "$20.00",
    desc: "Our signature blend crafted for the perfect crema. Bold, rich, and syrupy.",
    badge: null,
    rating: 4.6,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDqGbCu-PjW8XJl7mlArgoi-f-vnEr1jU24YXaLBZy3GtN0Lpg58p-6XoCoqpy5_AGJSfQG9zMwACIs__tFEvH5DqvoOdJqpZh9TGgDYUVU7Ov0hzL4DFjymyw63rxvgXxfvW0W8yV6BlkRXmF7ehphhQ7ikj-ZRhDBaeOOeqoKncRZmcGf6fZFXo9cjZwnMjJIMuVONl1NXJEyg6Tch3KRqypH06M9t_xZMHsQrEUUt-XNBfLsduQ2W2yfM_itJUavmr_te7l5Kkk",
  },
  {
    id: 5,
    name: "Kenya AA",
    price: "$24.00",
    desc: "Complex flavor profile with distinct blackcurrant notes and wine-like acidity.",
    badge: null,
    rating: 4.9,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCg8ODvWlvkdaCvcwj4ZDEyB-nN7KV-94P5awGyPN2gMvB3JGDpnsh0TO1gPLbdCx21TCitKds-hOq5hRVz6XQzCM-Etep_5yy1SY65yJxnRcoHD7ccQCe1XILPKbCA52qnIqTIsAwlyIarKkASw9peo8Gr9ZNXkbsOpedWJQ3nnUM7KBXojrR4JKeXrPqLb-wX7hQMaoT31wgpBKtZTdkIzCqvlpoJGmuERvsL--ezS3KvzkV2hwpVIIWUVErh1MssRTUs_xojG5Ct",
  },
  {
    id: 6,
    name: "Costa Rica Tarrazu",
    price: "$21.00",
    desc: "Crisp and clean with hints of citrus and chocolate. High altitude grown.",
    badge: null,
    rating: 4.5,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvGk1zhDtmMOqQ1x_HziqscnUUvGCn5mHFopvl78tlL12hsu3SzzsueoNdvOgF-eqL5RJG5woPgo4sXYgZtzAqAYKqKHicJF7QzwCDXoVAvz6hc3IuvOkdJ93PGBc7aRTxRT4Bk2FrnndhdIm3e8Y6bxlG8BAardAVERopssnsjru_0RbmwoIUEY4l1KFrTC4YBq721wzRMk5fWlvQIVKvFZ3rdRhneSC1r0AUiOXYy4wCWugITCovUwTCJlvFD2xDyYbqYWo5J84s",
  },
];

export default function UserDashboard() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="flex flex-col gap-8 pb-20">
      {/* --- WELCOME HEADER --- */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Coffee size={20} className="text-[#ec6d13]" />
            <span className={`text-sm font-medium ${isDark ? "text-[#b9a89d]" : "text-[#8b7355]"}`}>Koleksi Kopi Kami</span>
          </div>
          <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? "text-white" : "text-[#1a140e]"}`}>
            Jelajahi <span className="text-[#ec6d13]">Produk</span>
          </h1>
        </div>
        <p className={`text-sm max-w-md ${isDark ? "text-[#b9a89d]" : "text-[#8b7355]"}`}>
          Temukan biji kopi premium yang dipanggang sempurna dari seluruh penjuru dunia.
        </p>
      </div>

      {/* --- FILTERS & SORT --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          {["All Roasts", "Light", "Medium", "Dark", "Decaf"].map((filter, index) => (
            <button
              key={filter}
              className={`px-5 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${index === 0
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
        <div className="flex items-center gap-2 min-w-fit">
          <span className={`text-sm ${isDark ? "text-[#b9a89d]" : "text-[#8b7355]"}`}>Sort by:</span>
          <button className={`flex items-center gap-1 text-sm font-medium hover:text-[#ec6d13] transition-colors ${isDark ? "text-white" : "text-[#1a140e]"
            }`}>
            Featured
            <ChevronDown size={18} />
          </button>
        </div>
      </div>

      {/* --- PRODUCT GRID --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className={`group rounded-2xl p-3 border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col ${isDark
              ? "bg-[#1a140e] border-[#3e342b] hover:border-[#ec6d13]/50 hover:shadow-black/20"
              : "bg-white border-[#e5ddd5] hover:border-[#ec6d13]/50 hover:shadow-black/10"
              }`}
          >
            {/* Product Image Container */}
            <div className={`relative aspect-square rounded-xl overflow-hidden mb-4 ${isDark ? "bg-[#231910]" : "bg-[#f5f0eb]"
              }`}>
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* Badge */}
              {product.badge && (
                <span className={`absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full shadow-md ${
                  product.badge === "Best Seller"
                    ? "bg-[#ec6d13] text-white"
                    : "bg-emerald-500 text-white"
                }`}>
                  {product.badge}
                </span>
              )}

              {/* Wishlist Heart */}
              <button className={`absolute top-3 right-3 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 ${
                isDark
                  ? "bg-black/50 text-white hover:text-red-400"
                  : "bg-white/80 text-[#8b7355] hover:text-red-500"
              }`}>
                <Heart size={16} />
              </button>
            </div>

            {/* Product Details */}
            <div className="flex flex-col gap-1 px-1 flex-1">
              <div className="flex justify-between items-start">
                <h3 className={`text-lg font-bold leading-tight group-hover:text-[#ec6d13] transition-colors ${isDark ? "text-white" : "text-[#1a140e]"
                  }`}>
                  {product.name}
                </h3>
                <span className={`font-bold text-lg ${isDark ? "text-white" : "text-[#1a140e]"}`}>
                  {product.price}
                </span>
              </div>

              {/* Star Rating */}
              <div className="flex items-center gap-1 mt-0.5">
                <Star size={14} className="fill-amber-400 text-amber-400" />
                <span className={`text-xs font-semibold ${isDark ? "text-white" : "text-[#1a140e]"}`}>{product.rating}</span>
              </div>

              <p className={`text-sm line-clamp-2 mb-4 mt-1 ${isDark ? "text-[#b9a89d]" : "text-[#8b7355]"}`}>
                {product.desc}
              </p>

              {/* Add to Cart Button */}
              <div className="mt-auto">
                <button className={`w-full py-2.5 rounded-xl font-bold text-sm hover:bg-[#ec6d13] hover:text-white transition-colors flex items-center justify-center gap-2 group/btn ${isDark
                  ? "bg-white text-[#231910]"
                  : "bg-[#1a140e] text-white"
                  }`}>
                  Add to Cart
                  <ShoppingCart size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}