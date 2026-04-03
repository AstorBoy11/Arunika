"use client";

import { useEffect, useMemo, useState } from "react";
import AdminHeader from "@/components/admin-header";
import { useTheme } from "@/context/ThemeContext";
import {
  Download,
  DollarSign,
  TrendingUp,
  Coffee,
  Users,
  Package,
  Droplets,
  Croissant,
} from "lucide-react";

type PaymentStatus = "pending" | "paid";
type OrderStatus = "processing" | "shipped" | "delivered" | "cancelled";

type OrderItem = {
  name?: string;
  product?: {
    name?: string;
  };
};

type Order = {
  _id: string;
  orderNumber: string;
  items: OrderItem[];
  total: number;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  createdAt: string;
};

type Product = {
  _id: string;
  name: string;
  stock: number;
};

type ApiResponse<T> = {
  success: boolean;
  data?: T;
  message?: string;
};

const formatRupiah = (num: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(num);

const formatItems = (items: OrderItem[]) =>
  items
    .map((i) => i.name || i.product?.name || "")
    .filter((name) => name.length > 0)
    .join(", ");

const mapOrderStatus = (
  status: OrderStatus,
): { status: string; color: string } => {
  if (status === "processing") {
    return {
      status: "Brewing",
      color: "text-[#ec6d13] bg-[#ec6d13]/10 border-[#ec6d13]/20",
    };
  }

  if (status === "shipped") {
    return {
      status: "Shipped",
      color: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    };
  }

  if (status === "delivered") {
    return {
      status: "Done",
      color: "text-green-500 bg-green-500/10 border-green-500/20",
    };
  }

  return {
    status: "Pending",
    color: "text-gray-400 bg-gray-500/10 border-gray-500/20",
  };
};

export default function AdminDashboard() {
  const { mounted, theme } = useTheme();
  // isDark is retained only for SVG inline attributes that cannot use CSS classes
  const isDark = mounted && theme === "dark";

  const [orders, setOrders] = useState<Order[]>([]);
  const [paidOrders, setPaidOrders] = useState<Order[]>([]);
  const [lowStockProducts, setLowStockProducts] = useState<Product[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);

  useEffect(() => {
    if (!mounted) return;

    let cancelled = false;

    const fetchDashboardData = async () => {
      setIsDataLoading(true);

      try {
        const [ordersRes, paidOrdersRes, productsRes] = await Promise.all([
          fetch("/api/orders"),
          fetch("/api/orders?paymentStatus=paid"),
          fetch("/api/products"),
        ]);

        const [ordersJson, paidOrdersJson, productsJson] = (await Promise.all([
          ordersRes.json(),
          paidOrdersRes.json(),
          productsRes.json(),
        ])) as [
          ApiResponse<Order[]>,
          ApiResponse<Order[]>,
          ApiResponse<Product[]>,
        ];

        if (!cancelled) {
          setOrders(ordersJson.success ? (ordersJson.data ?? []) : []);
          setPaidOrders(
            paidOrdersJson.success ? (paidOrdersJson.data ?? []) : [],
          );

          const lowStock = (
            productsJson.success ? (productsJson.data ?? []) : []
          )
            .filter((product) => product.stock <= 10)
            .sort((a, b) => a.stock - b.stock)
            .slice(0, 5);
          setLowStockProducts(lowStock);
        }
      } catch {
        if (!cancelled) {
          setOrders([]);
          setPaidOrders([]);
          setLowStockProducts([]);
        }
      } finally {
        if (!cancelled) {
          setIsDataLoading(false);
        }
      }
    };

    void fetchDashboardData();

    return () => {
      cancelled = true;
    };
  }, [mounted]);

  const totalRevenue = useMemo(
    () => paidOrders.reduce((sum, order) => sum + order.total, 0),
    [paidOrders],
  );

  const recentOrders = useMemo(
    () =>
      [...orders]
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
        .slice(0, 4),
    [orders],
  );

  // Render a loading spinner until the client has hydrated to prevent theme flicker
  if (!mounted) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#ec6d13] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <AdminHeader>
        <div className="flex items-center justify-between w-full">
          <div>
            <h2 className="text-[#1a140e] dark:text-[#fcfaf8] text-lg md:text-2xl font-bold tracking-tight">
              Analytics Dashboard
            </h2>
            <p className="text-xs md:text-sm text-[#8b7355] dark:text-[#9a6c4c] hidden sm:block">
              Good Morning. Here's what's brewing.
            </p>
          </div>
        </div>
      </AdminHeader>

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6 md:space-y-8 pb-20 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {/* Stats Row */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Revenue */}
          <div className="bg-white dark:bg-[#1a140e] border-[#e5ddd5] dark:border-[#3e342b] p-6 rounded-xl border shadow-xl shadow-black/20 flex flex-col gap-4 relative overflow-hidden group hover:border-[#ec6d13]/30 transition-colors">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <DollarSign size={80} className="text-[#ec6d13]" />
            </div>
            <div className="flex justify-between items-start z-10">
              <div className="p-2 rounded-lg text-[#ec6d13] bg-[#f5f0eb] dark:bg-[#3e342b]">
                <DollarSign size={24} />
              </div>
            </div>
            <div className="z-10">
              <p className="text-[#8b7355] dark:text-[#9a6c4c] text-sm font-medium mb-1">
                Total Revenue
              </p>
              <h3 className="text-[#1a140e] dark:text-[#fcfaf8] text-3xl font-bold tracking-tight">
                {isDataLoading ? "---" : formatRupiah(totalRevenue)}
              </h3>
            </div>
          </div>

          {/* Orders */}
          <div className="bg-white dark:bg-[#1a140e] border-[#e5ddd5] dark:border-[#3e342b] p-6 rounded-xl border shadow-xl shadow-black/20 flex flex-col gap-4 relative overflow-hidden group hover:border-[#ec6d13]/30 transition-colors">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Coffee size={80} className="text-[#ec6d13]" />
            </div>
            <div className="flex justify-between items-start z-10">
              <div className="p-2 rounded-lg text-[#ec6d13] bg-[#f5f0eb] dark:bg-[#3e342b]">
                <Coffee size={24} />
              </div>
            </div>
            <div className="z-10">
              <p className="text-[#8b7355] dark:text-[#9a6c4c] text-sm font-medium mb-1">
                Total Orders
              </p>
              <h3 className="text-[#1a140e] dark:text-[#fcfaf8] text-3xl font-bold tracking-tight">
                {isDataLoading ? "---" : `${orders.length} Orders`}
              </h3>
            </div>
          </div>
        </section>

        {/* Chart & Table */}
        <section className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 rounded-xl border p-6 shadow-xl shadow-black/20 flex flex-col bg-white dark:bg-[#1a140e] border-[#e5ddd5] dark:border-[#3e342b]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[#1a140e] dark:text-[#fcfaf8] text-lg font-bold">
                Recent Orders
              </h3>
              <button className="text-xs text-[#ec6d13] font-medium hover:underline">
                View All
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-xs border-b text-[#8b7355] dark:text-[#9a6c4c] border-[#e5ddd5] dark:border-[#3e342b]">
                    <th className="py-3 font-medium">Order ID</th>
                    <th className="py-3 font-medium">Items</th>
                    <th className="py-3 font-medium text-right">Amount</th>
                    <th className="py-3 font-medium text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {isDataLoading
                    ? Array.from({ length: 4 }).map((_, index) => (
                        <tr
                          key={`skeleton-${index}`}
                          className="group border-b transition-colors border-[#e5ddd5] dark:border-[#3e342b]/50 hover:bg-[#f5f0eb] dark:hover:bg-[#3e342b]/30"
                        >
                          <td className="py-3 font-medium text-[#1a140e] dark:text-[#fcfaf8]">
                            ---
                          </td>
                          <td className="py-3 text-[#8b7355] dark:text-[#b9a89d]">
                            ---
                          </td>
                          <td className="py-3 text-right font-bold text-[#1a140e] dark:text-[#fcfaf8]">
                            ---
                          </td>
                          <td className="py-3 text-right">
                            <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold border text-gray-400 bg-gray-500/10 border-gray-500/20">
                              ---
                            </span>
                          </td>
                        </tr>
                      ))
                    : recentOrders.map((order) => {
                        const statusMap = mapOrderStatus(order.orderStatus);
                        const itemText = formatItems(order.items);

                        return (
                          <tr
                            key={order._id}
                            className="group border-b transition-colors border-[#e5ddd5] dark:border-[#3e342b]/50 hover:bg-[#f5f0eb] dark:hover:bg-[#3e342b]/30"
                          >
                            <td className="py-3 font-medium text-[#1a140e] dark:text-[#fcfaf8]">
                              {order.orderNumber}
                            </td>
                            <td className="py-3 text-[#8b7355] dark:text-[#b9a89d]">
                              {itemText || "-"}
                            </td>
                            <td className="py-3 text-right font-bold text-[#1a140e] dark:text-[#fcfaf8]">
                              {formatRupiah(order.total)}
                            </td>
                            <td className="py-3 text-right">
                              <span
                                className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold border ${statusMap.color}`}
                              >
                                {statusMap.status}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Inventory */}
        <section className="bg-white dark:bg-[#1a140e] border-[#e5ddd5] dark:border-[#3e342b] rounded-xl border p-6 shadow-xl shadow-black/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-[#ec6d13]/10 rounded-lg text-[#ec6d13]">
              <Package size={20} />
            </div>
            <h3 className="text-[#1a140e] dark:text-[#fcfaf8] text-lg font-bold">
              Low Stock Alerts
            </h3>
          </div>
          <div className="flex flex-wrap gap-4">
            {isDataLoading ? (
              <div className="text-xs text-[#8b7355] dark:text-[#b9a89d]">
                ---
              </div>
            ) : lowStockProducts.length === 0 ? (
              <div className="text-xs text-[#8b7355] dark:text-[#b9a89d]">
                Semua stok aman
              </div>
            ) : (
              lowStockProducts.map((product, index) => {
                const Icon =
                  index % 3 === 0
                    ? Coffee
                    : index % 3 === 1
                      ? Droplets
                      : Croissant;
                const isFirst = index === 0;

                return (
                  <div
                    key={product._id}
                    className={`flex items-center gap-3 p-3 rounded-lg border min-w-[200px] ${
                      isFirst
                        ? "bg-[#f5f0eb] border-[#ec6d13]/20 dark:bg-[#3e342b]/40 dark:border-[#ec6d13]/40"
                        : "bg-[#f5f0eb] border-[#e5ddd5] dark:bg-[#3e342b]/40 dark:border-[#3e342b]"
                    }`}
                  >
                    <div
                      className={`size-10 rounded-md flex items-center justify-center ${
                        isFirst
                          ? "text-[#ec6d13] bg-white dark:bg-[#221810]"
                          : "bg-white text-[#8b7355] dark:bg-[#221810] dark:text-[#9a6c4c]"
                      }`}
                    >
                      <Icon size={20} />
                    </div>
                    <div>
                      <p className="text-[#1a140e] dark:text-[#fcfaf8] text-sm font-medium">
                        {product.name}
                      </p>
                      <p
                        className={`text-xs ${isFirst ? "text-[#ec6d13] font-bold" : "text-[#8b7355] dark:text-[#b9a89d]"}`}
                      >
                        {product.stock} Remaining
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>
      </div>
    </>
  );
}
