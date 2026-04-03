"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Loader2, PackageSearch, ArrowRight, ClipboardList } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import OrderDetailModal, {
  type PaymentStatus,
  type UserOrder,
  type OrderStatus,
} from "./_components/OrderDetailModal";

type OrdersApiResponse = {
  success: boolean;
  data?: UserOrder[];
  message?: string;
};

type StoredUser = {
  _id: string;
};

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

const getOrderStatusBadge = (
  status: OrderStatus,
  isDark: boolean
): string => {
  switch (status) {
    case "processing":
      return isDark
        ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
        : "bg-amber-50 text-amber-700 border border-amber-200";
    case "shipped":
      return isDark
        ? "bg-blue-500/20 text-blue-300 border border-blue-500/40"
        : "bg-blue-50 text-blue-700 border border-blue-200";
    case "delivered":
      return isDark
        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
        : "bg-emerald-50 text-emerald-700 border border-emerald-200";
    default:
      return isDark
        ? "bg-zinc-500/20 text-zinc-300 border border-zinc-500/40"
        : "bg-zinc-50 text-zinc-700 border border-zinc-200";
  }
};

const getPaymentStatusBadge = (
  status: PaymentStatus,
  isDark: boolean
): string => {
  if (status === "paid") {
    return isDark
      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
      : "bg-emerald-50 text-emerald-700 border border-emerald-200";
  }

  return isDark
    ? "bg-orange-500/20 text-orange-300 border border-orange-500/40"
    : "bg-orange-50 text-orange-700 border border-orange-200";
};

const getStoredUserId = (): string | null => {
  const raw = window.localStorage.getItem("arunika-user");
  if (!raw) return null;

  try {
    const parsed: unknown = JSON.parse(raw);

    if (
      typeof parsed === "object" &&
      parsed !== null &&
      "_id" in parsed &&
      typeof (parsed as StoredUser)._id === "string"
    ) {
      return (parsed as StoredUser)._id;
    }

    return null;
  } catch {
    return null;
  }
};

export default function UserOrdersPage() {
  const { theme, mounted } = useTheme();
  const isDark = mounted && theme === "dark";

  const [orders, setOrders] = useState<UserOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<UserOrder | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    const fetchOrders = async () => {
      setLoading(true);
      setError("");

      const userId = getStoredUserId();
      if (!userId) {
        if (!isCancelled) {
          setOrders([]);
          setError("User tidak ditemukan. Silakan login kembali.");
          setLoading(false);
        }
        return;
      }

      try {
        const response = await fetch(`/api/orders/user/${userId}`);
        const result: OrdersApiResponse = (await response.json()) as OrdersApiResponse;

        if (!response.ok || !result.success) {
          if (!isCancelled) {
            setError(result.message ?? "Gagal memuat riwayat pesanan.");
            setOrders([]);
          }
          return;
        }

        if (!isCancelled) {
          setOrders(result.data ?? []);
        }
      } catch {
        if (!isCancelled) {
          setError("Terjadi kesalahan jaringan saat mengambil data pesanan.");
          setOrders([]);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    void fetchOrders();

    return () => {
      isCancelled = true;
    };
  }, []);

  const totalOrders = useMemo(() => orders.length, [orders]);

  const openOrderDetail = (order: UserOrder) => {
    setSelectedOrder(order);
    setIsDetailOpen(true);
  };

  if (loading) {
    return (
      <div className="max-w-300 mx-auto w-full py-10">
        <div className="flex items-center gap-3 text-sm">
          <Loader2 size={18} className="animate-spin text-[#ec6d13]" />
          <span className={isDark ? "text-[#b9a89d]" : "text-[#8b7355]"}>Memuat riwayat pesanan...</span>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-300 mx-auto w-full flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className={`p-6 rounded-full mb-6 border ${isDark ? "bg-[#1a140e] border-[#3e342b]" : "bg-[#f5f0eb] border-[#e5ddd5]"}`}>
          <PackageSearch size={48} className="text-[#ec6d13] opacity-60" />
        </div>
        <h2 className={`text-2xl font-bold mb-2 ${isDark ? "text-white" : "text-[#1a140e]"}`}>
          Kamu belum punya pesanan
        </h2>
        <p className={`text-sm max-w-md ${isDark ? "text-[#b9a89d]" : "text-[#8b7355]"}`}>
          Pesanan yang sudah kamu checkout akan tampil di sini.
        </p>
        <Link href="/user/dashboard">
          <button className="mt-6 px-8 py-3 bg-[#ec6d13] text-white font-bold rounded-xl hover:bg-[#d65c0b] transition-colors flex items-center gap-2">
            Mulai Belanja
            <ArrowRight size={18} />
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-300 mx-auto w-full flex flex-col gap-6 pb-20">
      <div className={`mb-2 border-b pb-4 ${isDark ? "border-[#3e342b]" : "border-[#e5ddd5]"}`}>
        <h1 className={`text-3xl font-bold mb-2 ${isDark ? "text-white" : "text-[#1a140e]"}`}>
          Riwayat Pesanan
        </h1>
        <p className={isDark ? "text-[#b9a89d]" : "text-[#8b7355]"}>
          Total <span className="text-[#ec6d13] font-bold">{totalOrders} pesanan</span> yang pernah kamu lakukan.
        </p>
      </div>

      {error && (
        <div
          className={`rounded-lg border px-3 py-2.5 text-xs ${
            isDark
              ? "bg-[#3a1c14]/40 border-[#7a3422] text-[#f2b8a0]"
              : "bg-[#fff4ee] border-[#f2c1ab] text-[#a64822]"
          }`}
        >
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {orders.map((order) => {
          const itemCount = order.items.reduce((acc, item) => acc + item.quantity, 0);

          return (
            <button
              key={order._id}
              onClick={() => openOrderDetail(order)}
              className={`w-full text-left border rounded-2xl p-5 sm:p-6 transition-all ${
                isDark
                  ? "bg-[#1a140e] border-[#3e342b] hover:border-[#ec6d13]/40"
                  : "bg-white border-[#e5ddd5] hover:border-[#ec6d13]/40"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <ClipboardList size={16} className="text-[#ec6d13]" />
                    <p className={`text-base font-bold ${isDark ? "text-white" : "text-[#1a140e]"}`}>
                      {order.orderNumber}
                    </p>
                  </div>
                  <p className={`text-xs ${isDark ? "text-[#9a6c4c]" : "text-[#8b7355]"}`}>
                    {formatDate(order.createdAt)} • {itemCount} item
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <p className="text-[#ec6d13] font-black text-lg">{formatRupiah(order.total)}</p>
                  <p className={`text-xs mt-1 ${isDark ? "text-[#9a6c4c]" : "text-[#8b7355]"}`}>
                    Klik untuk melihat detail
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 mt-4">
                <span
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-full capitalize ${getOrderStatusBadge(
                    order.orderStatus,
                    isDark
                  )}`}
                >
                  {order.orderStatus}
                </span>
                <span
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-full capitalize ${getPaymentStatusBadge(
                    order.paymentStatus,
                    isDark
                  )}`}
                >
                  {order.paymentStatus}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <OrderDetailModal
        isOpen={isDetailOpen}
        order={selectedOrder}
        isDark={isDark}
        onClose={() => setIsDetailOpen(false)}
      />
    </div>
  );
}
