"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Trash2, 
  Minus, 
  Plus, 
  ShoppingBag, 
  ArrowRight,
  Truck
} from "lucide-react";

// Tipe Data & Data Dummy (Sama seperti sebelumnya)
interface CartItem {
  id: number;
  name: string;
  roast: string;
  price: number;
  image: string;
  quantity: number;
}

const initialCart: CartItem[] = [
  {
    id: 1,
    name: "Ethiopian Yirgacheffe",
    roast: "Light Roast",
    price: 22.00,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB06jAOy0e6VpbUp6hOlshceiORePg0Pvs54Ms1qza9ov8vm15VJSj1Eb1JC77MblwiNTKnzB2nPHoFeAxeU4MGM3NBLBP4BJ4p5wWGyqGo9VhyUJcfiLe3UPyu62xbnZ9gDf5Ix_8i4XZzJiO02V51N2DdLf8Lcz0fsub86I5w_CooD2yzLy7W74c0gRgMhXPmyYyVdk6RpoGm__Oobfw8F6ajbFBcleBXcQcupgr37UVMWcWnGKD-LTNbV06oSBM2fWSHaKEwlvEs",
    quantity: 1,
  },
  {
    id: 2,
    name: "Sumatra Mandheling",
    roast: "Dark Roast",
    price: 19.50,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAMFtMAcIKaVPvQYctBLheaTsf6inh5kusmEPv8dAtt5CAkGFWWo3JLMGqvsOnwsKqi028amHlsFfvdsDauUTrhZ4p9KHwImj23Z7D-WDj4SCW4iWt1Wr9Y5Jph1l-Zl1w9ADQaiC2qomr4HoWL21tPCxi1pECQY05QzaoGHraPUvMxPeGzCw9nIA5jlZmDT3WWLtVLtfDZd7rx7UZfDdyOoTFOdZU8CPjMVmrN7-uhc7Sb4fPLXQYgmJ3XVPIw9U61Dcm6pKtOeFUe",
    quantity: 2,
  },
  {
    id: 4,
    name: "Espresso House Blend",
    roast: "Espresso",
    price: 20.00,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDqGbCu-PjW8XJl7mlArgoi-f-vnEr1jU24YXaLBZy3GtN0Lpg58p-6XoCoqpy5_AGJSfQG9zMwACIs__tFEvH5DqvoOdJqpZh9TGgDYUVU7Ov0hzL4DFjymyw63rxvgXxfvW0W8yV6BlkRXmF7ehphhQ7ikj-ZRhDBaeOOeqoKncRZmcGf6fZFXo9cjZwnMjJIMuVONl1NXJEyg6Tch3KRqypH06M9t_xZMHsQrEUUt-XNBfLsduQ2W2yfM_itJUavmr_te7l5Kkk",
    quantity: 1,
  },
  {
    id: 5,
    name: "Kenya AA",
    roast: "Light Roast",
    price: 24.00,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCg8ODvWlvkdaCvcwj4ZDEyB-nN7KV-94P5awGyPN2gMvB3JGDpnsh0TO1gPLbdCx21TCitKds-hOq5hRVz6XQzCM-Etep_5yy1SY65yJxnRcoHD7ccQCe1XILPKbCA52qnIqTIsAwlyIarKkASw9peo8Gr9ZNXkbsOpedWJQ3nnUM7KBXojrR4JKeXrPqLb-wX7hQMaoT31wgpBKtZTdkIzCqvlpoJGmuERvsL--ezS3KvzkV2hwpVIIWUVErh1MssRTUs_xojG5Ct",
    quantity: 1,
  },
  {
    id: 6,
    name: "Costa Rica Tarrazu",
    roast: "Medium Roast",
    price: 21.00,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvGk1zhDtmMOqQ1x_HziqscnUUvGCn5mHFopvl78tlL12hsu3SzzsueoNdvOgF-eqL5RJG5woPgo4sXYgZtzAqAYKqKHicJF7QzwCDXoVAvz6hc3IuvOkdJ93PGBc7aRTxRT4Bk2FrnndhdIm3e8Y6bxlG8BAardAVERopssnsjru_0RbmwoIUEY4l1KFrTC4YBq721wzRMk5fWlvQIVKvFZ3rdRhneSC1r0AUiOXYy4wCWugITCovUwTCJlvFD2xDyYbqYWo5J84s",
    quantity: 1,
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCart);

  const updateQuantity = (id: number, type: "plus" | "minus") => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = type === "plus" ? item.quantity + 1 : item.quantity - 1;
          return { ...item, quantity: newQty < 1 ? 1 : newQty };
        }
        return item;
      })
    );
  };

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = 5.00; 
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="p-6 bg-[#1a140e] rounded-full mb-6 border border-[#3e342b]">
          <ShoppingBag size={48} className="text-[#ec6d13] opacity-50" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Keranjangmu Kosong</h2>
        <Link href="/user/shop">
          <button className="mt-4 px-8 py-3 bg-[#ec6d13] text-white font-bold rounded-xl">
            Mulai Belanja
          </button>
        </Link>
      </div>
    );
  }

  return (
    // PERBAIKAN 1:
    // h-auto: Tinggi otomatis di HP (bisa scroll panjang ke bawah)
    // lg:h-[calc(100vh-8rem)]: Tinggi dikunci hanya di Laptop
    <div className="max-w-[1200px] mx-auto h-auto lg:h-[calc(100vh-8rem)] flex flex-col">
      
      {/* HEADER */}
      <div className="shrink-0 mb-6 border-b border-[#3e342b] pb-4">
        <h1 className="text-3xl font-bold text-white mb-2">Keranjang Belanja</h1>
        <p className="text-[#b9a89d]">
          Kamu memiliki <span className="text-[#ec6d13] font-bold">{cartItems.length} item</span> di dalam keranjang.
        </p>
      </div>

      {/* PERBAIKAN 2:
          lg:overflow-hidden: Hanya hilangkan scroll container utama di laptop
          Di HP biarkan default agar bisa scroll ke bawah sampai footer
      */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-auto lg:h-full lg:overflow-hidden">
        
        {/* KOLOM KIRI: LIST ITEM */}
        {/* PERBAIKAN 3:
            lg:overflow-y-auto: Scroll independen hanya aktif di laptop
            Di HP, dia akan memanjang ke bawah biasa
        */}
        <div className="lg:col-span-2 lg:overflow-y-auto lg:pr-2 lg:pb-20 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="flex flex-col gap-6">
            {cartItems.map((item) => (
              <div 
                key={item.id} 
                className="bg-[#1a140e] border border-[#3e342b] rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row gap-6 group hover:border-[#ec6d13]/30 transition-all"
              >
                {/* Gambar Produk */}
                <div className="relative w-full sm:w-32 h-32 bg-[#231910] rounded-xl overflow-hidden flex-shrink-0">
                  <Image 
                    src={item.image} 
                    alt={item.name} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Detail Produk */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-lg font-bold text-white">{item.name}</h3>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-[#b9a89d] hover:text-red-500 transition-colors p-1"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <p className="text-[#ec6d13] text-sm font-medium mb-4">{item.roast}</p>
                  </div>

                  <div className="flex justify-between items-end">
                    {/* Quantity */}
                    <div className="flex items-center gap-3 bg-[#120d0a] border border-[#3e342b] rounded-lg p-1">
                      <button 
                        onClick={() => updateQuantity(item.id, "minus")}
                        className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-[#2c241b] text-white disabled:opacity-50"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-white font-bold w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, "plus")}
                        className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-[#2c241b] text-white"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <p className="text-xl font-bold text-white">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* KOLOM KANAN: RINGKASAN */}
        {/* Di HP, ini akan muncul di paling bawah (karena grid system) */}
        <div className="lg:col-span-1 lg:h-full">
          <div className="bg-[#1a140e] border border-[#3e342b] rounded-2xl p-6 shadow-xl shadow-black/20">
            <h3 className="text-xl font-bold text-white mb-6">Ringkasan Pesanan</h3>

            <div className="space-y-4 mb-6 border-b border-[#3e342b] pb-6">
              <div className="flex justify-between text-[#b9a89d]">
                <span>Subtotal</span>
                <span className="text-white font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#b9a89d]">
                <span>Pengiriman</span>
                <span className="text-white font-medium">${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#b9a89d]">
                <span>Pajak (10%)</span>
                <span className="text-white font-medium">${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-8">
              <span className="text-white font-bold text-lg">Total</span>
              <span className="text-[#ec6d13] font-black text-2xl">${total.toFixed(2)}</span>
            </div>

            <div className="bg-[#2a221b]/50 p-3 rounded-lg flex items-start gap-3 mb-6">
               <Truck size={20} className="text-[#ec6d13] mt-0.5" />
               <p className="text-xs text-[#b9a89d]">
                 Gratis ongkir untuk pesanan di atas $50.
               </p>
            </div>

            <button className="w-full py-4 bg-[#ec6d13] hover:bg-[#d65c0b] text-white font-bold rounded-xl shadow-lg shadow-[#ec6d13]/20 transition-all hover:scale-[1.02] flex items-center justify-center gap-2">
              Checkout Sekarang
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}