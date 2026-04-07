"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import useSWR from "swr";
import { CalendarDays, Loader2, Plus, Trash2, TrendingDown, TrendingUp } from "lucide-react";
import type { IExpense } from "@/lib/models";
import { fetcher } from "@/lib/fetcher";

type ExpenseItem = Pick<IExpense, "keterangan" | "nominal"> & {
  _id: string;
  tanggal: string;
};

type NewExpensePayload = {
  nominal: number;
  keterangan: string;
  tanggal: string;
};

type ExpenseApiItem = Pick<IExpense, "keterangan" | "nominal"> & {
  _id: string;
  tanggal: string | Date;
};

type ExpensesResponse = {
  success: boolean;
  data?: ExpenseApiItem[];
  message?: string;
};

type ExpenseResponse = {
  success: boolean;
  data?: ExpenseApiItem;
  message?: string;
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

function normalizeTanggal(value: string | Date): string {
  if (value instanceof Date) {
    return value.toISOString().split("T")[0];
  }

  const parsed = new Date(value);
  if (!Number.isNaN(parsed.getTime())) {
    return parsed.toISOString().split("T")[0];
  }

  return value;
}

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

function isWithinDateRange(dateValue: string, startDate: string, endDate: string): boolean {
  const target = new Date(dateValue);
  if (Number.isNaN(target.getTime())) {
    return false;
  }

  const targetKey = target.toISOString().slice(0, 10);
  if (startDate && targetKey < startDate) {
    return false;
  }
  if (endDate && targetKey > endDate) {
    return false;
  }

  return true;
}

export default function FinanceClient() {
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [expenseActionError, setExpenseActionError] = useState("");
  const [savingExpense, setSavingExpense] = useState(false);
  const [deletingExpenseId, setDeletingExpenseId] = useState<string | null>(null);
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");

  const {
    data: expensesData,
    error: expensesFetchError,
    isLoading: loadingExpenses,
    mutate: mutateExpenses,
  } = useSWR<ExpensesResponse>("/api/expenses", fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 10_000,
  });

  const {
    data: ordersData,
    error: incomeFetchError,
    isLoading: loadingIncome,
  } = useSWR<OrdersResponse>("/api/orders?paymentStatus=paid", fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 10_000,
  });

  const expenses: ExpenseItem[] = useMemo(
    () =>
      (expensesData?.data ?? []).map((item) => ({
        _id: item._id,
        keterangan: item.keterangan,
        nominal: item.nominal,
        tanggal: normalizeTanggal(item.tanggal),
      })),
    [expensesData?.data]
  );

  const paidOrders = useMemo(() => ordersData?.data ?? [], [ordersData?.data]);

  const filteredExpenses = useMemo(
    () =>
      expenses.filter((expense) =>
        isWithinDateRange(expense.tanggal, filterStartDate, filterEndDate)
      ),
    [expenses, filterEndDate, filterStartDate]
  );

  const filteredPaidOrders = useMemo(
    () =>
      paidOrders.filter((order) =>
        isWithinDateRange(order.createdAt, filterStartDate, filterEndDate)
      ),
    [filterEndDate, filterStartDate, paidOrders]
  );

  const incomeError = incomeFetchError instanceof Error ? incomeFetchError.message : "";
  const expenseError = expenseActionError || (expensesFetchError instanceof Error ? expensesFetchError.message : "");

  const totalPengeluaran = useMemo(
    () => filteredExpenses.reduce((acc, item) => acc + item.nominal, 0),
    [filteredExpenses]
  );

  const totalPemasukan = useMemo(
    () => filteredPaidOrders.reduce((acc, order) => acc + order.total, 0),
    [filteredPaidOrders]
  );

  const incomeByDate = useMemo(() => {
    const grouped = new Map<string, number>();

    for (const order of filteredPaidOrders) {
      const dateKey = new Date(order.createdAt).toISOString().split("T")[0];
      const current = grouped.get(dateKey) ?? 0;
      grouped.set(dateKey, current + order.total);
    }

    return Array.from(grouped.entries())
      .map(([tanggal, total]) => ({ tanggal, total }))
      .sort((a, b) => (a.tanggal < b.tanggal ? 1 : -1));
  }, [filteredPaidOrders]);

  const handleAddExpense = async (payload: NewExpensePayload): Promise<boolean> => {
    setSavingExpense(true);
    setExpenseActionError("");

    try {
      const response = await fetch("/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result: ExpenseResponse = (await response.json()) as ExpenseResponse;

      if (!response.ok || !result.success) {
        setExpenseActionError(result.message ?? "Gagal menyimpan pengeluaran.");
        return false;
      }

      setIsAddExpenseOpen(false);
      await mutateExpenses();
      return true;
    } catch {
      setExpenseActionError("Terjadi kesalahan jaringan saat menyimpan pengeluaran.");
      return false;
    } finally {
      setSavingExpense(false);
    }
  };

  const handleDeleteExpense = async (expenseId: string) => {
    const confirmed = window.confirm("Hapus pengeluaran ini?");
    if (!confirmed) {
      return;
    }

    setDeletingExpenseId(expenseId);
    setExpenseActionError("");

    try {
      const response = await fetch(`/api/expenses/${expenseId}`, {
        method: "DELETE",
      });

      const result: { success: boolean; message?: string } = (await response.json()) as {
        success: boolean;
        message?: string;
      };

      if (!response.ok || !result.success) {
        setExpenseActionError(result.message ?? "Gagal menghapus pengeluaran.");
        return;
      }

      await mutateExpenses();
    } catch {
      setExpenseActionError("Terjadi kesalahan jaringan saat menghapus pengeluaran.");
    } finally {
      setDeletingExpenseId(null);
    }
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
                {loadingIncome ? (
                  <span className="inline-block h-8 w-28 rounded-lg bg-gray-200 dark:bg-[#3e342b] animate-pulse" />
                ) : (
                  formatIDR(totalPemasukan)
                )}
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
                {loadingExpenses ? (
                  <span className="inline-block h-8 w-28 rounded-lg bg-gray-200 dark:bg-[#3e342b] animate-pulse" />
                ) : (
                  formatIDR(totalPengeluaran)
                )}
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

      {expenseError && (
        <div className="mt-6 rounded-lg border px-3 py-2.5 text-xs bg-[#fff4ee] border-[#f2c1ab] text-[#a64822] dark:bg-[#3a1c14]/40 dark:border-[#7a3422] dark:text-[#f2b8a0]">
          {expenseError}
        </div>
      )}

      <div className="mt-6">
        <p className="mb-2 text-xs uppercase tracking-wider text-gray-500 dark:text-[#8e7f72] font-semibold">
          Filter
        </p>
      <div className="bg-white dark:bg-[#1a140e] border border-gray-200 dark:border-[#3e342b] rounded-2xl p-4 sm:p-5 shadow-sm dark:shadow-none">
        <div className="flex flex-col sm:flex-row sm:items-end gap-3 sm:gap-4">
          <div className="flex-1">
            <label className="text-xs uppercase tracking-wider text-gray-500 dark:text-[#8e7f72] font-semibold">
              Dari Tanggal
            </label>
            <div className="mt-1.5 relative">
              <CalendarDays
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-[#8e7f72]"
              />
              <input
                type="date"
                value={filterStartDate}
                onChange={(event) => setFilterStartDate(event.target.value)}
                className="w-full bg-white dark:bg-[#231910] border border-gray-200 dark:border-[#3e342b] rounded-lg pl-10 pr-3 py-2.5 text-gray-900 dark:text-[#EAE0D5] text-sm focus:ring-1 focus:ring-[#ec6d13] focus:border-[#ec6d13] outline-none transition-all"
              />
            </div>
          </div>
          <div className="flex-1">
            <label className="text-xs uppercase tracking-wider text-gray-500 dark:text-[#8e7f72] font-semibold">
              Sampai Tanggal
            </label>
            <div className="mt-1.5 relative">
              <CalendarDays
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-[#8e7f72]"
              />
              <input
                type="date"
                value={filterEndDate}
                onChange={(event) => setFilterEndDate(event.target.value)}
                className="w-full bg-white dark:bg-[#231910] border border-gray-200 dark:border-[#3e342b] rounded-lg pl-10 pr-3 py-2.5 text-gray-900 dark:text-[#EAE0D5] text-sm focus:ring-1 focus:ring-[#ec6d13] focus:border-[#ec6d13] outline-none transition-all"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setFilterStartDate("");
              setFilterEndDate("");
            }}
            className="h-11 px-4 rounded-lg border border-gray-200 dark:border-[#3e342b] text-gray-700 dark:text-[#EAE0D5] text-sm font-medium hover:bg-gray-50 dark:hover:bg-[#231910] transition-colors"
          >
            Reset Filter
          </button>
        </div>
      </div>
      </div>

      <div className="mt-6 bg-white dark:bg-[#1a140e] border border-gray-200 dark:border-[#3e342b] rounded-2xl shadow-sm dark:shadow-none overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-[#3e342b]">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Riwayat Pendapatan Order</h3>
          <p className="text-sm text-gray-500 dark:text-[#8e7f72]">
            Akumulasi order berstatus paid berdasarkan tanggal.
          </p>
        </div>

        {loadingIncome ? (
          <div className="px-6 py-6 space-y-3">
            {[0, 1, 2].map((row) => (
              <div key={row} className="grid grid-cols-2 gap-4">
                <div className="h-5 rounded bg-gray-200 dark:bg-[#3e342b] animate-pulse" />
                <div className="h-5 rounded bg-gray-200 dark:bg-[#3e342b] animate-pulse" />
              </div>
            ))}
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
            Belum ada data pendapatan pada rentang tanggal ini.
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
                <th className="text-right px-6 py-3 font-semibold text-gray-500 dark:text-[#8e7f72]">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loadingExpenses ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-5"
                  >
                    <div className="space-y-3">
                      {[0, 1, 2].map((row) => (
                        <div key={row} className="grid grid-cols-4 gap-4">
                          <div className="h-5 rounded bg-gray-200 dark:bg-[#3e342b] animate-pulse" />
                          <div className="h-5 rounded bg-gray-200 dark:bg-[#3e342b] animate-pulse" />
                          <div className="h-5 rounded bg-gray-200 dark:bg-[#3e342b] animate-pulse" />
                          <div className="h-5 rounded bg-gray-200 dark:bg-[#3e342b] animate-pulse" />
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              ) : (
                filteredExpenses.map((expense) => (
                  <tr
                    key={expense._id}
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
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => void handleDeleteExpense(expense._id)}
                        disabled={deletingExpenseId === expense._id}
                        className="inline-flex items-center justify-center p-2 rounded-lg border border-gray-200 dark:border-[#3e342b] text-gray-500 dark:text-[#8e7f72] hover:bg-gray-50 dark:hover:bg-[#231910] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                        aria-label="Hapus pengeluaran"
                      >
                        {deletingExpenseId === expense._id ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : (
                          <Trash2 size={14} />
                        )}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {!loadingExpenses && filteredExpenses.length === 0 && (
          <div className="px-6 py-10 text-center text-sm text-gray-500 dark:text-[#8e7f72]">
            Belum ada data pengeluaran pada rentang tanggal ini.
          </div>
        )}
      </div>

      <ModalAddExpense
        isOpen={isAddExpenseOpen}
        onClose={() => setIsAddExpenseOpen(false)}
        onSubmit={handleAddExpense}
        isLoading={savingExpense}
      />
    </div>
  );
}
