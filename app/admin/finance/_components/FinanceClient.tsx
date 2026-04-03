"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { Loader2, Plus, TrendingDown, TrendingUp } from "lucide-react";

type ExpenseItem = {
  id: number;
  tanggal: string;
  keterangan: string;
  nominal: number;
};

type NewExpensePayload = {
  nominal: number;
  keterangan: string;
  tanggal: string;
};

type PaidOrder = {
  _id: string;
  total: number;
  createdAt: string;
};

type OrdersResponse = {
  success: boolean;
  data?: PaidOrder[];
  message?: string;
};

const ModalAddExpense = dynamic(() => import("./ModalAddExpense"), {
  ssr: false,
  loading: () => null,
});

const INITIAL_EXPENSES: ExpenseItem[] = [
  {
    id: 1,
    tanggal: "2026-03-26",
    keterangan: "Pembelian biji kopi bulanan",
    nominal: 2350000,
  },
  {
    id: 2,
    tanggal: "2026-03-27",
    keterangan: "Perawatan mesin espresso",
    nominal: 850000,
  },
  {
    id: 3,
    tanggal: "2026-03-29",
    keterangan: "Biaya listrik dan internet",
    nominal: 1250000,
  },
];

function formatIDR(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

export default function FinanceClient() {
  const [expenses, setExpenses] = useState<ExpenseItem[]>(INITIAL_EXPENSES);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [paidOrders, setPaidOrders] = useState<PaidOrder[]>([]);
  const [loadingIncome, setLoadingIncome] = useState(true);
  const [incomeError, setIncomeError] = useState("");

  useEffect(() => {
    let isCancelled = false;

    const fetchPaidOrders = async () => {
      setLoadingIncome(true);
      setIncomeError("");

      try {
        const response = await fetch("/api/orders?paymentStatus=paid");
        const result: OrdersResponse = (await response.json()) as OrdersResponse;

        if (!response.ok || !result.success) {
          if (!isCancelled) {
            setIncomeError(result.message ?? "Gagal memuat data pendapatan.");
            setPaidOrders([]);
          }
          return;
        }

        if (!isCancelled) {
          setPaidOrders(result.data ?? []);
        }
      } catch {
        if (!isCancelled) {
          setIncomeError("Terjadi kesalahan jaringan saat memuat pendapatan.");
          setPaidOrders([]);
        }
      } finally {
        if (!isCancelled) {
          setLoadingIncome(false);
        }
      }
    };

    void fetchPaidOrders();

    return () => {
      isCancelled = true;
    };
  }, []);

  const totalPengeluaran = useMemo(
    () => expenses.reduce((acc, item) => acc + item.nominal, 0),
    [expenses]
  );

  const totalPemasukan = useMemo(
    () => paidOrders.reduce((acc, order) => acc + order.total, 0),
    [paidOrders]
  );

  const incomeByDate = useMemo(() => {
    const grouped = new Map<string, number>();

    for (const order of paidOrders) {
      const dateKey = new Date(order.createdAt).toISOString().split("T")[0];
      const current = grouped.get(dateKey) ?? 0;
      grouped.set(dateKey, current + order.total);
    }

    return Array.from(grouped.entries())
      .map(([tanggal, total]) => ({ tanggal, total }))
      .sort((a, b) => (a.tanggal < b.tanggal ? 1 : -1));
  }, [paidOrders]);

  const handleAddExpense = (payload: NewExpensePayload) => {
    setExpenses((prev) => {
      const nextId = prev.length > 0 ? Math.max(...prev.map((item) => item.id)) + 1 : 1;
      return [
        {
          id: nextId,
          nominal: payload.nominal,
          keterangan: payload.keterangan,
          tanggal: payload.tanggal,
        },
        ...prev,
      ];
    });
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 sm:px-8 pb-6 sm:pb-12 custom-scrollbar">
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#1a140e] border border-gray-200 dark:border-[#3e342b] rounded-2xl p-6 shadow-sm dark:shadow-none">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-[#8e7f72] font-semibold">
                Total Pemasukan
              </p>
              <h3 className="mt-2 text-2xl font-black text-gray-900 dark:text-white">
                {loadingIncome ? "..." : formatIDR(totalPemasukan)}
              </h3>
            </div>
            <div className="p-2.5 rounded-xl bg-[#0bda16]/10 border border-[#0bda16]/20">
              <TrendingUp size={20} className="text-[#0bda16]" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1a140e] border border-gray-200 dark:border-[#3e342b] rounded-2xl p-6 shadow-sm dark:shadow-none">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-[#8e7f72] font-semibold">
                Total Pengeluaran
              </p>
              <h3 className="mt-2 text-2xl font-black text-gray-900 dark:text-white">
                {formatIDR(totalPengeluaran)}
              </h3>
            </div>
            <div className="p-2.5 rounded-xl bg-[#ec6d13]/10 border border-[#ec6d13]/20">
              <TrendingDown size={20} className="text-[#ec6d13]" />
            </div>
          </div>
        </div>
      </div>

      {incomeError && (
        <div className="mt-6 rounded-lg border px-3 py-2.5 text-xs bg-[#fff4ee] border-[#f2c1ab] text-[#a64822] dark:bg-[#3a1c14]/40 dark:border-[#7a3422] dark:text-[#f2b8a0]">
          {incomeError}
        </div>
      )}

      <div className="mt-6 bg-white dark:bg-[#1a140e] border border-gray-200 dark:border-[#3e342b] rounded-2xl shadow-sm dark:shadow-none overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-[#3e342b]">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Riwayat Pendapatan Order</h3>
          <p className="text-sm text-gray-500 dark:text-[#8e7f72]">
            Akumulasi order berstatus paid berdasarkan tanggal.
          </p>
        </div>

        {loadingIncome ? (
          <div className="px-6 py-8 text-sm text-gray-500 dark:text-[#8e7f72] flex items-center gap-2">
            <Loader2 size={16} className="animate-spin text-[#ec6d13]" />
            Memuat pendapatan order...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-[#231910] border-b border-gray-200 dark:border-[#3e342b]">
                  <th className="text-left px-6 py-3 font-semibold text-gray-500 dark:text-[#8e7f72]">Tanggal</th>
                  <th className="text-right px-6 py-3 font-semibold text-gray-500 dark:text-[#8e7f72]">Total Pendapatan</th>
                </tr>
              </thead>
              <tbody>
                {incomeByDate.map((item) => (
                  <tr
                    key={item.tanggal}
                    className="border-b border-gray-200 dark:border-[#3e342b] last:border-0"
                  >
                    <td className="px-6 py-4 text-gray-700 dark:text-[#EAE0D5] whitespace-nowrap">
                      {formatDate(item.tanggal)}
                    </td>
                    <td className="px-6 py-4 text-right text-[#0bda16] font-bold whitespace-nowrap">
                      {formatIDR(item.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loadingIncome && incomeByDate.length === 0 && (
          <div className="px-6 py-10 text-center text-sm text-gray-500 dark:text-[#8e7f72]">
            Belum ada order paid untuk ditampilkan.
          </div>
        )}
      </div>

      <div className="mt-6 bg-white dark:bg-[#1a140e] border border-gray-200 dark:border-[#3e342b] rounded-2xl shadow-sm dark:shadow-none overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-[#3e342b] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Riwayat Pengeluaran</h3>
            <p className="text-sm text-gray-500 dark:text-[#8e7f72]">
              Catatan biaya operasional toko.
            </p>
          </div>

          <button
            onClick={() => setIsAddExpenseOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#ec6d13] hover:bg-[#d65c0b] text-white text-sm font-bold shadow-lg shadow-[#ec6d13]/20 transition-all"
          >
            <Plus size={16} />
            Catat Pengeluaran
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-[#231910] border-b border-gray-200 dark:border-[#3e342b]">
                <th className="text-left px-6 py-3 font-semibold text-gray-500 dark:text-[#8e7f72]">Tanggal</th>
                <th className="text-left px-6 py-3 font-semibold text-gray-500 dark:text-[#8e7f72]">Keterangan</th>
                <th className="text-right px-6 py-3 font-semibold text-gray-500 dark:text-[#8e7f72]">Nominal</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr
                  key={expense.id}
                  className="border-b border-gray-200 dark:border-[#3e342b] last:border-0"
                >
                  <td className="px-6 py-4 text-gray-700 dark:text-[#EAE0D5] whitespace-nowrap">
                    {formatDate(expense.tanggal)}
                  </td>
                  <td className="px-6 py-4 text-gray-900 dark:text-white">
                    {expense.keterangan}
                  </td>
                  <td className="px-6 py-4 text-right text-[#ec6d13] font-bold whitespace-nowrap">
                    {formatIDR(expense.nominal)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {expenses.length === 0 && (
          <div className="px-6 py-10 text-center text-sm text-gray-500 dark:text-[#8e7f72]">
            Belum ada data pengeluaran.
          </div>
        )}
      </div>

      <ModalAddExpense
        isOpen={isAddExpenseOpen}
        onClose={() => setIsAddExpenseOpen(false)}
        onSubmit={handleAddExpense}
      />
    </div>
  );
}
