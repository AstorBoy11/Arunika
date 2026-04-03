"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Trash2,
  Minus,
  Plus,
  ShoppingBag,
  ArrowRight,
  Truck,
  X,
  MapPin,
  Wallet,
  CheckCircle2,
  QrCode,
  Banknote,
  ChevronRight,
  Package,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

// Tipe Data & Data Dummy
interface CartItem {
  _id: string;
  name: string;
  roast: string;
  price: number;
  image: string;
  quantity: number;
}

// ─── Dummy data untuk modal ───────────────────────────────────────────────────

interface Address {
  id: string;
  label: string;
  recipient: string;
  phone: string;
  full: string;
}

const ADDRESSES: Address[] = [
  {
    id: "addr-1",
    label: "Rumah",
    recipient: "Budi Santoso",
    phone: "+62 812-3456-7890",
    full: "Jl. Melati No. 12, Kel. Sukamaju, Kec. Cilandak, Jakarta Selatan, 12560",
  },
  {
    id: "addr-2",
    label: "Kantor",
    recipient: "Budi Santoso",
    phone: "+62 812-3456-7890",
    full: "Gedung Anindita Lt. 5, Jl. Sudirman Kav. 25, Jakarta Pusat, 10220",
  },
];

type PaymentMethod = "cash" | "qris" | null;

// ─── Checkout Modal ───────────────────────────────────────────────────────────

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

function CheckoutModal({
  isOpen,
  onClose,
  items,
  subtotal,
  shipping,
  tax,
  total,
}: CheckoutModalProps) {
  const { theme, mounted } = useTheme();
  const isDark = mounted && theme === "dark";

  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>(null);
  const [confirmed, setConfirmed] = useState(false);

  const canConfirm = selectedAddress !== null && selectedPayment !== null;

  const handleConfirm = () => {
    if (!canConfirm) return;
    setConfirmed(true);
  };

  const handleClose = () => {
    // Reset state saat modal ditutup
    setSelectedAddress(null);
    setSelectedPayment(null);
    setConfirmed(false);
    onClose();
  };

  if (!isOpen) return null;

  // ── Success screen ────────────────────────────────────────────────────────
  if (confirmed) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <div
          className={`relative w-full max-w-md rounded-2xl p-8 text-center shadow-2xl border transition-all animate-in zoom-in-95 duration-300 ${
            isDark ? "bg-[#1a140e] border-[#3e342b]" : "bg-white border-[#e5ddd5]"
          }`}
        >
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full bg-[#ec6d13]/10 flex items-center justify-center">
              <CheckCircle2 size={44} className="text-[#ec6d13]" />
            </div>
          </div>
          <h2 className={`text-2xl font-black mb-2 ${isDark ? "text-white" : "text-[#1a140e]"}`}>
            Pesanan Dikonfirmasi!
          </h2>
          <p className={`text-sm mb-1 ${isDark ? "text-[#b9a89d]" : "text-[#8b7355]"}`}>
            Nomor Pesanan
          </p>
          <p className="text-[#ec6d13] font-bold text-lg mb-4">
            #ARN-{Math.floor(100000 + Math.random() * 900000)}
          </p>
          <p className={`text-sm mb-6 ${isDark ? "text-[#b9a89d]" : "text-[#8b7355]"}`}>
            Terima kasih! Pesananmu sedang diproses dan akan segera dikirim ke alamat yang kamu pilih.
          </p>
          <button
            onClick={handleClose}
            className="w-full py-3 bg-[#ec6d13] hover:bg-[#d65c0b] text-white font-bold rounded-xl transition-colors"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  // ── Main modal ────────────────────────────────────────────────────────────
  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div
        className={`relative w-full sm:max-w-2xl max-h-[92dvh] flex flex-col rounded-t-3xl sm:rounded-2xl shadow-2xl border overflow-hidden animate-in slide-in-from-bottom-4 sm:zoom-in-95 duration-300 ${
          isDark ? "bg-[#120d0a] border-[#3e342b]" : "bg-[#f5f0eb] border-[#e5ddd5]"
        }`}
      >
        {/* ── Modal Header ── */}
        <div
          className={`shrink-0 flex items-center justify-between px-6 py-4 border-b ${
            isDark ? "border-[#3e342b] bg-[#1a140e]" : "border-[#e5ddd5] bg-white"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#ec6d13]/10">
              <Package size={20} className="text-[#ec6d13]" />
            </div>
            <div>
              <h2 className={`font-black text-base ${isDark ? "text-white" : "text-[#1a140e]"}`}>
                Konfirmasi Pesanan
              </h2>
              <p className={`text-xs ${isDark ? "text-[#9a6c4c]" : "text-[#8b7355]"}`}>
                {items.length} item · Total{" "}
                <span className="text-[#ec6d13] font-bold">${total.toFixed(2)}</span>
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className={`p-2 rounded-lg transition-colors ${
              isDark ? "hover:bg-[#3e342b] text-[#b9a89d]" : "hover:bg-[#f5f0eb] text-[#8b7355]"
            }`}
          >
            <X size={20} />
          </button>
        </div>

        {/* ── Scrollable body ── */}
        <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

          {/* ─ Rincian Belanja ─ */}
          <section className="px-6 pt-5 pb-4">
            <h3
              className={`flex items-center gap-2 text-sm font-bold mb-3 ${
                isDark ? "text-[#fcfaf8]" : "text-[#1a140e]"
              }`}
            >
              <ShoppingBag size={15} className="text-[#ec6d13]" />
              Rincian Belanja
            </h3>

            <div
              className={`rounded-xl border divide-y overflow-hidden ${
                isDark ? "border-[#3e342b] divide-[#3e342b]" : "border-[#e5ddd5] divide-[#e5ddd5]"
              }`}
            >
              {items.map((item) => (
                <div
                  key={item._id}
                  className={`flex items-center gap-3 px-4 py-3 ${
                    isDark ? "bg-[#1a140e]" : "bg-white"
                  }`}
                >
                  <div
                    className={`relative w-10 h-10 rounded-lg overflow-hidden shrink-0 ${
                      isDark ? "bg-[#231910]" : "bg-[#f5f0eb]"
                    }`}
                  >
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-semibold truncate ${
                        isDark ? "text-white" : "text-[#1a140e]"
                      }`}
                    >
                      {item.name}
                    </p>
                    <p className={`text-xs ${isDark ? "text-[#9a6c4c]" : "text-[#8b7355]"}`}>
                      {item.roast}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p
                      className={`text-sm font-bold ${
                        isDark ? "text-white" : "text-[#1a140e]"
                      }`}
                    >
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <p className={`text-xs ${isDark ? "text-[#9a6c4c]" : "text-[#8b7355]"}`}>
                      {item.quantity} × ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}

              {/* Cost summary inside the same card */}
              <div className={`px-4 py-3 space-y-2 ${isDark ? "bg-[#1a140e]" : "bg-white"}`}>
                {[
                  { label: "Subtotal", value: subtotal },
                  { label: "Pengiriman", value: shipping },
                  { label: "Pajak (10%)", value: tax },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between text-xs">
                    <span className={isDark ? "text-[#9a6c4c]" : "text-[#8b7355]"}>{label}</span>
                    <span className={isDark ? "text-[#b9a89d]" : "text-[#5a4535]"}>
                      ${value.toFixed(2)}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-2 border-t border-dashed border-[#ec6d13]/30">
                  <span className={`text-sm font-bold ${isDark ? "text-white" : "text-[#1a140e]"}`}>
                    Total
                  </span>
                  <span className="text-[#ec6d13] font-black text-base">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </section>

          {/* ─ Pilih Alamat ─ */}
          <section className="px-6 pb-4">
            <h3
              className={`flex items-center gap-2 text-sm font-bold mb-3 ${
                isDark ? "text-[#fcfaf8]" : "text-[#1a140e]"
              }`}
            >
              <MapPin size={15} className="text-[#ec6d13]" />
              Alamat Pengiriman
              {!selectedAddress && (
                <span className="ml-auto text-[10px] font-normal text-red-400 bg-red-400/10 px-2 py-0.5 rounded-full">
                  Wajib dipilih
                </span>
              )}
            </h3>

            <div className="flex flex-col gap-3">
              {ADDRESSES.map((addr) => {
                const isSelected = selectedAddress === addr.id;
                return (
                  <button
                    key={addr.id}
                    onClick={() => setSelectedAddress(addr.id)}
                    className={`w-full text-left rounded-xl border-2 p-4 transition-all duration-200 group relative ${
                      isSelected
                        ? "border-[#ec6d13] bg-[#ec6d13]/5 shadow-md shadow-[#ec6d13]/10"
                        : isDark
                        ? "border-[#3e342b] bg-[#1a140e] hover:border-[#ec6d13]/40"
                        : "border-[#e5ddd5] bg-white hover:border-[#ec6d13]/40"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Custom radio */}
                      <div
                        className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                          isSelected
                            ? "border-[#ec6d13] bg-[#ec6d13]"
                            : isDark
                            ? "border-[#3e342b]"
                            : "border-[#c5b8aa]"
                        }`}
                      >
                        {isSelected && (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                              isSelected
                                ? "bg-[#ec6d13] text-white"
                                : isDark
                                ? "bg-[#3e342b] text-[#b9a89d]"
                                : "bg-[#f5f0eb] text-[#8b7355]"
                            }`}
                          >
                            {addr.label}
                          </span>
                          <span
                            className={`text-sm font-semibold ${
                              isDark ? "text-white" : "text-[#1a140e]"
                            }`}
                          >
                            {addr.recipient}
                          </span>
                        </div>
                        <p
                          className={`text-xs leading-relaxed ${
                            isDark ? "text-[#9a6c4c]" : "text-[#8b7355]"
                          }`}
                        >
                          {addr.full}
                        </p>
                        <p
                          className={`text-xs mt-1 font-medium ${
                            isSelected ? "text-[#ec6d13]" : isDark ? "text-[#b9a89d]" : "text-[#8b7355]"
                          }`}
                        >
                          {addr.phone}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* ─ Metode Pembayaran ─ */}
          <section className="px-6 pb-6">
            <h3
              className={`flex items-center gap-2 text-sm font-bold mb-3 ${
                isDark ? "text-[#fcfaf8]" : "text-[#1a140e]"
              }`}
            >
              <Wallet size={15} className="text-[#ec6d13]" />
              Metode Pembayaran
              {!selectedPayment && (
                <span className="ml-auto text-[10px] font-normal text-red-400 bg-red-400/10 px-2 py-0.5 rounded-full">
                  Wajib dipilih
                </span>
              )}
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {/* Cash */}
              <button
                onClick={() => setSelectedPayment("cash")}
                className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 ${
                  selectedPayment === "cash"
                    ? "border-[#ec6d13] bg-[#ec6d13]/5 shadow-md shadow-[#ec6d13]/10"
                    : isDark
                    ? "border-[#3e342b] bg-[#1a140e] hover:border-[#ec6d13]/40"
                    : "border-[#e5ddd5] bg-white hover:border-[#ec6d13]/40"
                }`}
              >
                {selectedPayment === "cash" && (
                  <CheckCircle2
                    size={16}
                    className="absolute top-2.5 right-2.5 text-[#ec6d13]"
                  />
                )}
                <div
                  className={`p-3 rounded-xl ${
                    selectedPayment === "cash"
                      ? "bg-[#ec6d13]/15"
                      : isDark
                      ? "bg-[#3e342b]"
                      : "bg-[#f5f0eb]"
                  }`}
                >
                  <Banknote
                    size={28}
                    className={selectedPayment === "cash" ? "text-[#ec6d13]" : isDark ? "text-[#b9a89d]" : "text-[#8b7355]"}
                  />
                </div>
                <span
                  className={`text-sm font-bold ${
                    selectedPayment === "cash"
                      ? "text-[#ec6d13]"
                      : isDark
                      ? "text-white"
                      : "text-[#1a140e]"
                  }`}
                >
                  Cash
                </span>
                <span
                  className={`text-[10px] text-center ${isDark ? "text-[#9a6c4c]" : "text-[#8b7355]"}`}
                >
                  Bayar saat terima
                </span>
              </button>

              {/* QRIS */}
              <button
                onClick={() => setSelectedPayment("qris")}
                className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 ${
                  selectedPayment === "qris"
                    ? "border-[#ec6d13] bg-[#ec6d13]/5 shadow-md shadow-[#ec6d13]/10"
                    : isDark
                    ? "border-[#3e342b] bg-[#1a140e] hover:border-[#ec6d13]/40"
                    : "border-[#e5ddd5] bg-white hover:border-[#ec6d13]/40"
                }`}
              >
                {selectedPayment === "qris" && (
                  <CheckCircle2
                    size={16}
                    className="absolute top-2.5 right-2.5 text-[#ec6d13]"
                  />
                )}
                <div
                  className={`p-3 rounded-xl ${
                    selectedPayment === "qris"
                      ? "bg-[#ec6d13]/15"
                      : isDark
                      ? "bg-[#3e342b]"
                      : "bg-[#f5f0eb]"
                  }`}
                >
                  <QrCode
                    size={28}
                    className={selectedPayment === "qris" ? "text-[#ec6d13]" : isDark ? "text-[#b9a89d]" : "text-[#8b7355]"}
                  />
                </div>
                <span
                  className={`text-sm font-bold ${
                    selectedPayment === "qris"
                      ? "text-[#ec6d13]"
                      : isDark
                      ? "text-white"
                      : "text-[#1a140e]"
                  }`}
                >
                  QRIS
                </span>
                <span
                  className={`text-[10px] text-center ${isDark ? "text-[#9a6c4c]" : "text-[#8b7355]"}`}
                >
                  GoPay, OVO, Dana, dll.
                </span>
              </button>
            </div>

            {/* QRIS preview placeholder */}
            {selectedPayment === "qris" && (
              <div
                className={`mt-4 p-4 rounded-xl border flex flex-col items-center gap-3 animate-in fade-in duration-200 ${
                  isDark ? "border-[#3e342b] bg-[#1a140e]" : "border-[#e5ddd5] bg-white"
                }`}
              >
                {/* Simple decorative QR placeholder */}
                <div className="relative w-28 h-28">
                  <div
                    className={`w-full h-full rounded-lg grid grid-cols-7 gap-0.5 p-2 ${
                      isDark ? "bg-[#231910]" : "bg-[#f5f0eb]"
                    }`}
                  >
                    {Array.from({ length: 49 }).map((_, i) => (
                      <div
                        key={i}
                        className={`rounded-sm ${
                          [0,1,2,3,4,5,6,7,14,21,28,35,42,43,44,45,46,47,48,
                           8,9,10,12,15,22,16,23,24,25,26,17,30,31,32,33,34,
                           36,38,40,11,18,20,27].includes(i)
                            ? "bg-[#ec6d13]"
                            : isDark ? "bg-[#3e342b]/30" : "bg-[#e5ddd5]/50"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="text-center">
                  <p className={`text-xs font-semibold ${isDark ? "text-white" : "text-[#1a140e]"}`}>
                    Scan untuk membayar
                  </p>
                </div>
              </div>
            )}
          </section>
        </div>

        {/* ── Sticky Footer ── */}
        <div
          className={`shrink-0 px-6 py-4 border-t flex gap-3 ${
            isDark ? "border-[#3e342b] bg-[#1a140e]" : "border-[#e5ddd5] bg-white"
          }`}
        >
          <button
            onClick={handleClose}
            className={`flex-1 py-3 rounded-xl font-bold text-sm border transition-colors ${
              isDark
                ? "border-[#3e342b] text-[#b9a89d] hover:bg-[#3e342b] hover:text-white"
                : "border-[#e5ddd5] text-[#8b7355] hover:bg-[#f5f0eb] hover:text-[#1a140e]"
            }`}
          >
            Batal
          </button>

          <button
            onClick={handleConfirm}
            disabled={!canConfirm}
            className={`flex-2 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
              canConfirm
                ? "bg-[#ec6d13] hover:bg-[#d65c0b] text-white shadow-lg shadow-[#ec6d13]/25 hover:scale-[1.02]"
                : "bg-[#ec6d13]/30 text-white/50 cursor-not-allowed"
            }`}
          >
            {!canConfirm && (
              <span className="text-[11px] font-normal">
                {!selectedAddress && !selectedPayment
                  ? "Pilih alamat & pembayaran"
                  : !selectedAddress
                  ? "Pilih alamat dahulu"
                  : "Pilih metode pembayaran"}
              </span>
            )}
            {canConfirm && (
              <>
                Konfirmasi Pesanan
                <ChevronRight size={16} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Cart Page ────────────────────────────────────────────────────────────────

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [hasHydratedCart, setHasHydratedCart] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const { theme, mounted } = useTheme();
  const isDark = mounted && theme === "dark";

  useEffect(() => {
    const stored = window.localStorage.getItem("arunika-cart");
    if (!stored) {
      setHasHydratedCart(true);
      return;
    }

    try {
      const parsed = JSON.parse(stored) as CartItem[];
      setCartItems(parsed);
    } catch {
      setCartItems([]);
    }

    setHasHydratedCart(true);
  }, []);

  useEffect(() => {
    if (!hasHydratedCart) return;
    window.localStorage.setItem("arunika-cart", JSON.stringify(cartItems));
  }, [cartItems, hasHydratedCart]);

  const updateQuantity = (_id: string, type: "plus" | "minus") => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item._id === _id) {
          const newQty = type === "plus" ? item.quantity + 1 : item.quantity - 1;
          return { ...item, quantity: newQty < 1 ? 1 : newQty };
        }
        return item;
      })
    );
  };

  const removeItem = (_id: string) => {
    setCartItems((prev) => prev.filter((item) => item._id !== _id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = 5.00;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;
  const OPEN_HOUR = 8;
  const CLOSE_HOUR = 22;
  const currentHour = new Date().getHours();
  const isStoreClosed = currentHour < OPEN_HOUR || currentHour >= CLOSE_HOUR;

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className={`p-6 rounded-full mb-6 border ${isDark ? "bg-[#1a140e] border-[#3e342b]" : "bg-[#f5f0eb] border-[#e5ddd5]"
          }`}>
          <ShoppingBag size={48} className="text-[#ec6d13] opacity-50" />
        </div>
        <h2 className={`text-2xl font-bold mb-2 ${isDark ? "text-white" : "text-[#1a140e]"}`}>
          Keranjang kosong
        </h2>
        <Link href="/user/dashboard">
          <button className="mt-4 px-8 py-3 bg-[#ec6d13] text-white font-bold rounded-xl hover:bg-[#d65c0b] transition-colors">
            Mulai Belanja
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-300 mx-auto h-auto lg:h-[calc(100vh-8rem)] flex flex-col">

      {/* HEADER */}
      <div className={`shrink-0 mb-6 border-b pb-4 ${isDark ? "border-[#3e342b]" : "border-[#e5ddd5]"}`}>
        <h1 className={`text-3xl font-bold mb-2 ${isDark ? "text-white" : "text-[#1a140e]"}`}>
          Keranjang Belanja
        </h1>
        <p className={isDark ? "text-[#b9a89d]" : "text-[#8b7355]"}>
          Kamu memiliki <span className="text-[#ec6d13] font-bold">{cartItems.length} item</span> di dalam keranjang.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-auto lg:h-full lg:overflow-hidden">

        {/* KOLOM KIRI: LIST ITEM */}
        <div className="lg:col-span-2 lg:overflow-y-auto lg:pr-2 lg:pb-20 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="flex flex-col gap-6">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className={`border rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row gap-6 group transition-all ${isDark
                    ? "bg-[#1a140e] border-[#3e342b] hover:border-[#ec6d13]/30"
                    : "bg-white border-[#e5ddd5] hover:border-[#ec6d13]/30"
                  }`}
              >
                {/* Gambar Produk */}
                <div className={`relative w-full sm:w-32 h-32 rounded-xl overflow-hidden shrink-0 ${isDark ? "bg-[#231910]" : "bg-[#f5f0eb]"
                  }`}>
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
                      <h3 className={`text-lg font-bold ${isDark ? "text-white" : "text-[#1a140e]"}`}>
                        {item.name}
                      </h3>
                      <button
                        onClick={() => removeItem(item._id)}
                        className={`transition-colors p-1 ${isDark ? "text-[#b9a89d] hover:text-red-500" : "text-[#8b7355] hover:text-red-500"
                          }`}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <p className="text-[#ec6d13] text-sm font-medium mb-4">{item.roast}</p>
                  </div>

                  <div className="flex justify-between items-end">
                    {/* Quantity */}
                    <div className={`flex items-center gap-3 border rounded-lg p-1 ${isDark
                        ? "bg-[#120d0a] border-[#3e342b]"
                        : "bg-[#f5f0eb] border-[#e5ddd5]"
                      }`}>
                      <button
                        onClick={() => updateQuantity(item._id, "minus")}
                        className={`w-8 h-8 flex items-center justify-center rounded-md disabled:opacity-50 ${isDark
                            ? "hover:bg-[#2c241b] text-white"
                            : "hover:bg-[#ebe3db] text-[#1a140e]"
                          }`}
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={14} />
                      </button>
                      <span className={`font-bold w-4 text-center ${isDark ? "text-white" : "text-[#1a140e]"}`}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item._id, "plus")}
                        className={`w-8 h-8 flex items-center justify-center rounded-md ${isDark
                            ? "hover:bg-[#2c241b] text-white"
                            : "hover:bg-[#ebe3db] text-[#1a140e]"
                          }`}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <p className={`text-xl font-bold ${isDark ? "text-white" : "text-[#1a140e]"}`}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* KOLOM KANAN: RINGKASAN */}
        <div className="lg:col-span-1 lg:h-full">
          <div className={`border rounded-2xl p-6 shadow-xl ${isDark
              ? "bg-[#1a140e] border-[#3e342b] shadow-black/20"
              : "bg-white border-[#e5ddd5] shadow-black/5"
            }`}>
            <h3 className={`text-xl font-bold mb-6 ${isDark ? "text-white" : "text-[#1a140e]"}`}>
              Ringkasan Pesanan
            </h3>

            <div className={`space-y-4 mb-6 border-b pb-6 ${isDark ? "border-[#3e342b]" : "border-[#e5ddd5]"}`}>
              <div className={`flex justify-between ${isDark ? "text-[#b9a89d]" : "text-[#8b7355]"}`}>
                <span>Subtotal</span>
                <span className={`font-medium ${isDark ? "text-white" : "text-[#1a140e]"}`}>
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className={`flex justify-between ${isDark ? "text-[#b9a89d]" : "text-[#8b7355]"}`}>
                <span>Pengiriman</span>
                <span className={`font-medium ${isDark ? "text-white" : "text-[#1a140e]"}`}>
                  ${shipping.toFixed(2)}
                </span>
              </div>
              <div className={`flex justify-between ${isDark ? "text-[#b9a89d]" : "text-[#8b7355]"}`}>
                <span>Pajak (10%)</span>
                <span className={`font-medium ${isDark ? "text-white" : "text-[#1a140e]"}`}>
                  ${tax.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-8">
              <span className={`font-bold text-lg ${isDark ? "text-white" : "text-[#1a140e]"}`}>Total</span>
              <span className="text-[#ec6d13] font-black text-2xl">${total.toFixed(2)}</span>
            </div>

            <div className={`p-3 rounded-lg flex items-start gap-3 mb-4 ${isDark ? "bg-[#2a221b]/50" : "bg-[#fdf5ee]"
              }`}>
              <Truck size={20} className="text-[#ec6d13] mt-0.5 shrink-0" />
              <div className="w-full">
                <p className={`text-xs mb-2 ${isDark ? "text-[#b9a89d]" : "text-[#8b7355]"}`}>
                  {subtotal >= 50
                    ? "Kamu mendapat gratis ongkir!"
                    : `Belanja $${(50 - subtotal).toFixed(2)} lagi untuk gratis ongkir.`}
                </p>
                <div className={`w-full h-1.5 rounded-full overflow-hidden ${isDark ? "bg-[#3e342b]" : "bg-[#e5ddd5]"}`}>
                  <div
                    className="h-full bg-[#ec6d13] rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((subtotal / 50) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </div>

            {isStoreClosed && (
              <div
                className={`mb-4 rounded-lg border px-3 py-2.5 text-xs ${
                  isDark
                    ? "bg-[#3a1c14]/40 border-[#7a3422] text-[#f2b8a0]"
                    : "bg-[#fff4ee] border-[#f2c1ab] text-[#a64822]"
                }`}
              >
                Toko Tutup. Anda tidak dapat melakukan pesanan di luar jam operasional (08:00 - 22:00)
              </div>
            )}

            <button
              onClick={() => setIsCheckoutOpen(true)}
              disabled={isStoreClosed}
              className={`w-full py-4 text-white font-bold rounded-xl shadow-lg shadow-[#ec6d13]/20 transition-all flex items-center justify-center gap-2 mb-3 ${
                isStoreClosed
                  ? "bg-[#ec6d13] opacity-50 cursor-not-allowed"
                  : "bg-[#ec6d13] hover:bg-[#d65c0b] hover:scale-[1.02]"
              }`}
            >
              Checkout Sekarang
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Checkout Modal ── */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        subtotal={subtotal}
        shipping={shipping}
        tax={tax}
        total={total}
      />
    </div>
  );
}