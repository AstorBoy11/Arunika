"use client";

import { X, Package, MapPin, CreditCard, CircleDollarSign } from "lucide-react";

export type OrderStatus = "processing" | "shipped" | "delivered" | "cancelled";
export type PaymentStatus = "pending" | "paid";

export interface OrderItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface ShippingAddress {
  recipient: string;
  street: string;
  city: string;
  province: string;
  postalCode?: string;
  phone: string;
}

export interface UserOrder {
  _id: string;
  orderNumber: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: "cash" | "qris";
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  createdAt: string;
}

interface OrderDetailModalProps {
  isOpen: boolean;
  order: UserOrder | null;
  isDark: boolean;
  onClose: () => void;
}

const formatRupiah = (value: number): string =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

const formatDate = (dateString: string): string =>
  new Date(dateString).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

export default function OrderDetailModal({
  isOpen,
  order,
  isDark,
  onClose,
}: OrderDetailModalProps) {
  if (!isOpen || !order) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm"
      onClick={(event) => event.target === event.currentTarget && onClose()}
    >
      <div
        className={`relative w-full sm:max-w-3xl max-h-[92dvh] flex flex-col rounded-t-3xl sm:rounded-2xl shadow-2xl border overflow-hidden ${
          isDark ? "bg-[#120d0a] border-[#3e342b]" : "bg-[#f5f0eb] border-[#e5ddd5]"
        }`}
      >
        <div
          className={`shrink-0 flex items-center justify-between px-6 py-4 border-b ${
            isDark ? "border-[#3e342b] bg-[#1a140e]" : "border-[#e5ddd5] bg-white"
          }`}
        >
          <div>
            <h2 className={`font-black text-base ${isDark ? "text-white" : "text-[#1a140e]"}`}>
              Detail Pesanan
            </h2>
            <p className={`text-xs ${isDark ? "text-[#9a6c4c]" : "text-[#8b7355]"}`}>
              {order.orderNumber} • {formatDate(order.createdAt)}
            </p>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${
              isDark ? "hover:bg-[#3e342b] text-[#b9a89d]" : "hover:bg-[#f5f0eb] text-[#8b7355]"
            }`}
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <section className="px-6 pt-5 pb-4">
            <h3
              className={`flex items-center gap-2 text-sm font-bold mb-3 ${
                isDark ? "text-[#fcfaf8]" : "text-[#1a140e]"
              }`}
            >
              <Package size={15} className="text-[#ec6d13]" />
              Item Pesanan
            </h3>

            <div
              className={`rounded-xl border divide-y overflow-hidden ${
                isDark ? "border-[#3e342b] divide-[#3e342b]" : "border-[#e5ddd5] divide-[#e5ddd5]"
              }`}
            >
              {order.items.map((item) => (
                <div
                  key={item._id}
                  className={`px-4 py-3 ${isDark ? "bg-[#1a140e]" : "bg-white"}`}
                >
                  <div className="flex justify-between items-start gap-3">
                    <div className="min-w-0">
                      <p className={`text-sm font-semibold ${isDark ? "text-white" : "text-[#1a140e]"}`}>
                        {item.name}
                      </p>
                      <p className={`text-xs ${isDark ? "text-[#9a6c4c]" : "text-[#8b7355]"}`}>
                        {item.quantity} x {formatRupiah(item.price)}
                      </p>
                    </div>
                    <p className={`text-sm font-bold ${isDark ? "text-white" : "text-[#1a140e]"}`}>
                      {formatRupiah(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="px-6 pb-4">
            <h3
              className={`text-sm font-bold mb-3 ${isDark ? "text-[#fcfaf8]" : "text-[#1a140e]"}`}
            >
              Ringkasan Harga
            </h3>
            <div
              className={`rounded-xl border p-4 space-y-2 ${
                isDark ? "bg-[#1a140e] border-[#3e342b]" : "bg-white border-[#e5ddd5]"
              }`}
            >
              <div className="flex justify-between text-xs">
                <span className={isDark ? "text-[#9a6c4c]" : "text-[#8b7355]"}>Subtotal</span>
                <span className={isDark ? "text-[#b9a89d]" : "text-[#5a4535]"}>{formatRupiah(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className={isDark ? "text-[#9a6c4c]" : "text-[#8b7355]"}>Ongkir</span>
                <span className={isDark ? "text-[#b9a89d]" : "text-[#5a4535]"}>{formatRupiah(order.shipping)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className={isDark ? "text-[#9a6c4c]" : "text-[#8b7355]"}>Pajak (11%)</span>
                <span className={isDark ? "text-[#b9a89d]" : "text-[#5a4535]"}>{formatRupiah(order.tax)}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-dashed border-[#ec6d13]/30">
                <span className={`text-sm font-bold ${isDark ? "text-white" : "text-[#1a140e]"}`}>Total</span>
                <span className="text-[#ec6d13] font-black text-base">{formatRupiah(order.total)}</span>
              </div>
            </div>
          </section>

          <section className="px-6 pb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              className={`rounded-xl border p-4 ${
                isDark ? "bg-[#1a140e] border-[#3e342b]" : "bg-white border-[#e5ddd5]"
              }`}
            >
              <h4
                className={`flex items-center gap-2 text-sm font-bold mb-3 ${
                  isDark ? "text-white" : "text-[#1a140e]"
                }`}
              >
                <MapPin size={15} className="text-[#ec6d13]" />
                Alamat Pengiriman
              </h4>
              <p className={`text-sm font-semibold ${isDark ? "text-white" : "text-[#1a140e]"}`}>
                {order.shippingAddress.recipient}
              </p>
              <p className={`text-xs mt-1 ${isDark ? "text-[#9a6c4c]" : "text-[#8b7355]"}`}>
                {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.province}
                {order.shippingAddress.postalCode ? `, ${order.shippingAddress.postalCode}` : ""}
              </p>
              <p className={`text-xs mt-1 ${isDark ? "text-[#9a6c4c]" : "text-[#8b7355]"}`}>
                {order.shippingAddress.phone}
              </p>
            </div>

            <div
              className={`rounded-xl border p-4 space-y-4 ${
                isDark ? "bg-[#1a140e] border-[#3e342b]" : "bg-white border-[#e5ddd5]"
              }`}
            >
              <div>
                <h4
                  className={`flex items-center gap-2 text-sm font-bold mb-1 ${
                    isDark ? "text-white" : "text-[#1a140e]"
                  }`}
                >
                  <CreditCard size={15} className="text-[#ec6d13]" />
                  Metode Pembayaran
                </h4>
                <p className={`text-xs uppercase ${isDark ? "text-[#b9a89d]" : "text-[#8b7355]"}`}>
                  {order.paymentMethod}
                </p>
              </div>

              <div>
                <h4
                  className={`flex items-center gap-2 text-sm font-bold mb-1 ${
                    isDark ? "text-white" : "text-[#1a140e]"
                  }`}
                >
                  <CircleDollarSign size={15} className="text-[#ec6d13]" />
                  Status
                </h4>
                <p className={`text-xs capitalize ${isDark ? "text-[#b9a89d]" : "text-[#8b7355]"}`}>
                  Order: {order.orderStatus}
                </p>
                <p className={`text-xs capitalize ${isDark ? "text-[#b9a89d]" : "text-[#8b7355]"}`}>
                  Pembayaran: {order.paymentStatus}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
