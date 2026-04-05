"use client";

import { useMemo, useState } from "react";
import useSWR from "swr";
import AdminHeader from "@/components/admin-header";
import { fetcher } from "@/lib/fetcher";
import { ClipboardList, Save, Trash2, RefreshCw } from "lucide-react";

type PaymentStatus = "pending" | "paid";
type OrderStatus = "processing" | "shipped" | "delivered";

type OrderItem = {
  _id: string;
  name: string;
  quantity: number;
};

type ShippingAddress = {
  recipient: string;
  street: string;
  city: string;
  province: string;
  postalCode?: string;
  phone: string;
};

type Order = {
  _id: string;
  orderNumber: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: "cash" | "qris";
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  total: number;
  createdAt: string;
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

const formatDateTime = (value: string) =>
  new Date(value).toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const getStatusClass = (status: OrderStatus) => {
  if (status === "delivered") {
    return "text-green-500 bg-green-500/10 border-green-500/20";
  }

  if (status === "shipped") {
    return "text-blue-500 bg-blue-500/10 border-blue-500/20";
  }

  return "text-[#ec6d13] bg-[#ec6d13]/10 border-[#ec6d13]/20";
};

const getPaymentClass = (status: PaymentStatus) => {
  if (status === "paid") {
    return "text-green-500 bg-green-500/10 border-green-500/20";
  }

  return "text-amber-500 bg-amber-500/10 border-amber-500/20";
};

export default function AdminOrdersPage() {
  const [statusFilter, setStatusFilter] = useState<"all" | OrderStatus>("all");
  const [paymentFilter, setPaymentFilter] = useState<"all" | PaymentStatus>("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<Record<string, { orderStatus: OrderStatus; paymentStatus: PaymentStatus }>>({});
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackType, setFeedbackType] = useState<"success" | "error" | "">("");

  const { data, error, isLoading, mutate } = useSWR<ApiResponse<Order[]>>(
    "/api/orders",
    fetcher<ApiResponse<Order[]>>,
    {
      revalidateOnFocus: true,
      dedupingInterval: 5000,
    }
  );

  const orders = data?.data ?? [];

  const filteredOrders = useMemo(
    () =>
      orders.filter((order) => {
        const byStatus = statusFilter === "all" || order.orderStatus === statusFilter;
        const byPayment = paymentFilter === "all" || order.paymentStatus === paymentFilter;
        return byStatus && byPayment;
      }),
    [orders, paymentFilter, statusFilter]
  );

  const onDraftChange = (
    orderId: string,
    key: "orderStatus" | "paymentStatus",
    value: OrderStatus | PaymentStatus
  ) => {
    const current = drafts[orderId] ?? {
      orderStatus: orders.find((item) => item._id === orderId)?.orderStatus ?? "processing",
      paymentStatus: orders.find((item) => item._id === orderId)?.paymentStatus ?? "pending",
    };

    setDrafts((prev) => ({
      ...prev,
      [orderId]: {
        ...current,
        [key]: value,
      },
    }));
  };

  const saveOrder = async (order: Order) => {
    const draft = drafts[order._id];
    if (!draft) {
      return;
    }

    if (draft.orderStatus === order.orderStatus && draft.paymentStatus === order.paymentStatus) {
      setFeedbackType("success");
      setFeedbackMessage("Tidak ada perubahan untuk disimpan.");
      return;
    }

    try {
      setUpdatingId(order._id);
      setFeedbackType("");
      setFeedbackMessage("");

      const response = await fetch(`/api/orders/${order._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderStatus: draft.orderStatus,
          paymentStatus: draft.paymentStatus,
        }),
      });

      const json = (await response.json()) as ApiResponse<Order>;

      if (!response.ok || !json.success) {
        throw new Error(json.message ?? "Gagal memperbarui order");
      }

      setFeedbackType("success");
      setFeedbackMessage(`Order ${order.orderNumber} berhasil diperbarui.`);
      setDrafts((prev) => {
        const next = { ...prev };
        delete next[order._id];
        return next;
      });
      await mutate();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Gagal memperbarui order";
      setFeedbackType("error");
      setFeedbackMessage(message);
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteOrder = async (order: Order) => {
    const confirmed = window.confirm(`Hapus order ${order.orderNumber}? Stok produk akan dikembalikan.`);
    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(order._id);
      setFeedbackType("");
      setFeedbackMessage("");

      const response = await fetch(`/api/orders/${order._id}`, {
        method: "DELETE",
      });

      const json = (await response.json()) as ApiResponse<null>;
      if (!response.ok || !json.success) {
        throw new Error(json.message ?? "Gagal menghapus order");
      }

      setFeedbackType("success");
      setFeedbackMessage(`Order ${order.orderNumber} berhasil dihapus.`);
      await mutate();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Gagal menghapus order";
      setFeedbackType("error");
      setFeedbackMessage(message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-gray-50 dark:bg-[#120d0a]">
      <AdminHeader title="Orders Management" subtitle="Kelola order dari user, update status, dan hapus order bila diperlukan." />

      <div className="flex-1 overflow-y-auto p-6 md:p-8 pb-24 custom-scrollbar">
        <div className="max-w-7xl mx-auto space-y-6">
          {(error || feedbackMessage) && (
            <div
              className={`rounded-lg border px-4 py-3 text-sm ${
                error || feedbackType === "error"
                  ? "bg-[#fff4ee] border-[#f2c1ab] text-[#a64822] dark:bg-[#3a1c14]/40 dark:border-[#7a3422] dark:text-[#f2b8a0]"
                  : "bg-[#eefaf0] border-[#bde6c4] text-[#1f7a34] dark:bg-[#17331e] dark:border-[#2d6a3a] dark:text-[#97e0aa]"
              }`}
            >
              {error instanceof Error ? error.message : feedbackMessage}
            </div>
          )}

          <section className="bg-white dark:bg-[#1a140e] border border-gray-200 dark:border-[#3e342b] rounded-xl p-4 md:p-5 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#ec6d13]/10 text-[#ec6d13]">
                  <ClipboardList size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-[#b9a89d]">Total Order</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{orders.length}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value as "all" | OrderStatus)}
                  className="bg-white dark:bg-[#2a221b] border border-gray-200 dark:border-[#3e342b] rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white"
                >
                  <option value="all">Semua Status Order</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>

                <select
                  value={paymentFilter}
                  onChange={(event) => setPaymentFilter(event.target.value as "all" | PaymentStatus)}
                  className="bg-white dark:bg-[#2a221b] border border-gray-200 dark:border-[#3e342b] rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white"
                >
                  <option value="all">Semua Status Pembayaran</option>
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                </select>

                <button
                  type="button"
                  onClick={() => void mutate()}
                  className="inline-flex items-center gap-2 bg-[#ec6d13] hover:bg-[#d65c0b] text-white px-3 py-2 rounded-lg text-sm font-semibold"
                >
                  <RefreshCw size={16} />
                  Refresh
                </button>
              </div>
            </div>
          </section>

          <section className="bg-white dark:bg-[#1a140e] border border-gray-200 dark:border-[#3e342b] rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[980px] text-left border-collapse">
                <thead className="bg-gray-50 dark:bg-[#2a221b]">
                  <tr>
                    <th className="p-4 text-xs font-semibold text-gray-500 dark:text-[#b9a89d] uppercase tracking-wider">Order</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 dark:text-[#b9a89d] uppercase tracking-wider">User & Alamat</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 dark:text-[#b9a89d] uppercase tracking-wider">Total</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 dark:text-[#b9a89d] uppercase tracking-wider">Status</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 dark:text-[#b9a89d] uppercase tracking-wider">Pembayaran</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 dark:text-[#b9a89d] uppercase tracking-wider text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-[#392f28]">
                  {isLoading ? (
                    Array.from({ length: 4 }).map((_, index) => (
                      <tr key={`orders-skeleton-${index}`}>
                        <td className="p-4"><span className="inline-block h-4 w-28 rounded bg-gray-200 dark:bg-[#3e342b] animate-pulse" /></td>
                        <td className="p-4"><span className="inline-block h-4 w-52 rounded bg-gray-200 dark:bg-[#3e342b] animate-pulse" /></td>
                        <td className="p-4"><span className="inline-block h-4 w-20 rounded bg-gray-200 dark:bg-[#3e342b] animate-pulse" /></td>
                        <td className="p-4"><span className="inline-block h-8 w-32 rounded bg-gray-200 dark:bg-[#3e342b] animate-pulse" /></td>
                        <td className="p-4"><span className="inline-block h-8 w-32 rounded bg-gray-200 dark:bg-[#3e342b] animate-pulse" /></td>
                        <td className="p-4 text-right"><span className="inline-block h-8 w-28 rounded bg-gray-200 dark:bg-[#3e342b] animate-pulse" /></td>
                      </tr>
                    ))
                  ) : filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-sm text-gray-500 dark:text-[#b9a89d]">
                        Tidak ada order yang cocok dengan filter.
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((order) => {
                      const draft = drafts[order._id] ?? {
                        orderStatus: order.orderStatus,
                        paymentStatus: order.paymentStatus,
                      };

                      return (
                        <tr key={order._id} className="hover:bg-gray-50 dark:hover:bg-[#2a221b] transition-colors">
                          <td className="p-4 align-top">
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">{order.orderNumber}</p>
                            <p className="text-xs text-gray-500 dark:text-[#b9a89d] mt-1">{formatDateTime(order.createdAt)}</p>
                            <p className="text-xs text-gray-500 dark:text-[#b9a89d] mt-1">
                              {order.items.length} item
                            </p>
                          </td>

                          <td className="p-4 align-top">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{order.shippingAddress.recipient}</p>
                            <p className="text-xs text-gray-500 dark:text-[#b9a89d] mt-1">
                              {order.shippingAddress.street}, {order.shippingAddress.city}
                              {order.shippingAddress.postalCode ? ` ${order.shippingAddress.postalCode}` : ""}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-[#b9a89d] mt-1">{order.shippingAddress.phone}</p>
                          </td>

                          <td className="p-4 align-top">
                            <p className="text-sm font-bold text-gray-900 dark:text-white">{formatRupiah(order.total)}</p>
                            <p className="text-xs text-gray-500 dark:text-[#b9a89d] mt-1 uppercase">{order.paymentMethod}</p>
                          </td>

                          <td className="p-4 align-top">
                            <span className={`inline-flex mb-2 px-2 py-1 rounded text-[11px] font-semibold border ${getStatusClass(order.orderStatus)}`}>
                              {order.orderStatus}
                            </span>
                            <select
                              value={draft.orderStatus}
                              onChange={(event) =>
                                onDraftChange(order._id, "orderStatus", event.target.value as OrderStatus)
                              }
                              className="block w-full bg-white dark:bg-[#2a221b] border border-gray-200 dark:border-[#3e342b] rounded-md px-2 py-1.5 text-xs text-gray-900 dark:text-white"
                            >
                              <option value="processing">processing</option>
                              <option value="shipped">shipped</option>
                              <option value="delivered">delivered</option>
                            </select>
                          </td>

                          <td className="p-4 align-top">
                            <span className={`inline-flex mb-2 px-2 py-1 rounded text-[11px] font-semibold border ${getPaymentClass(order.paymentStatus)}`}>
                              {order.paymentStatus}
                            </span>
                            <select
                              value={draft.paymentStatus}
                              onChange={(event) =>
                                onDraftChange(order._id, "paymentStatus", event.target.value as PaymentStatus)
                              }
                              className="block w-full bg-white dark:bg-[#2a221b] border border-gray-200 dark:border-[#3e342b] rounded-md px-2 py-1.5 text-xs text-gray-900 dark:text-white"
                            >
                              <option value="pending">pending</option>
                              <option value="paid">paid</option>
                            </select>
                          </td>

                          <td className="p-4 align-top">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                type="button"
                                disabled={updatingId === order._id || deletingId === order._id}
                                onClick={() => void saveOrder(order)}
                                className="inline-flex items-center gap-1.5 bg-[#ec6d13] hover:bg-[#d65c0b] text-white px-3 py-2 rounded-md text-xs font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
                              >
                                <Save size={14} />
                                {updatingId === order._id ? "Menyimpan..." : "Simpan"}
                              </button>

                              <button
                                type="button"
                                disabled={updatingId === order._id || deletingId === order._id}
                                onClick={() => void deleteOrder(order)}
                                className="inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-xs font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
                              >
                                <Trash2 size={14} />
                                {deletingId === order._id ? "Menghapus..." : "Hapus"}
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
