"use client";

import { useState } from "react";
import { CalendarDays, FileText, Wallet, X } from "lucide-react";

type AddExpensePayload = {
  nominal: number;
  keterangan: string;
  tanggal: string;
};

interface ModalAddExpenseProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AddExpensePayload) => void;
}

const inputClass =
  "w-full bg-white dark:bg-[#231910] border border-gray-200 dark:border-[#3e342b] rounded-lg px-4 py-2.5 text-gray-900 dark:text-[#EAE0D5] text-sm focus:ring-1 focus:ring-[#ec6d13] focus:border-[#ec6d13] outline-none transition-all placeholder-gray-400 dark:placeholder-[#8e7f72]";

const labelClass =
  "text-xs font-medium text-gray-500 dark:text-[#8e7f72] uppercase tracking-wider";

const todayDate = new Date().toISOString().slice(0, 10);

export default function ModalAddExpense({ isOpen, onClose, onSubmit }: ModalAddExpenseProps) {
  const [nominal, setNominal] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [tanggal, setTanggal] = useState(todayDate);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      nominal: Number(nominal) || 0,
      keterangan,
      tanggal,
    });

    setNominal("");
    setKeterangan("");
    setTanggal(todayDate);
    onClose();
  };

  const handleClose = () => {
    setNominal("");
    setKeterangan("");
    setTanggal(todayDate);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />

      <div className="relative z-10 w-full max-w-lg bg-white dark:bg-[#1a140e] rounded-2xl shadow-2xl border border-gray-200 dark:border-[#3e342b] overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-[#3e342b]">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Catat Pengeluaran</h2>
            <p className="text-xs text-gray-500 dark:text-[#8e7f72] mt-0.5">
              Input biaya operasional harian
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-[#3e342b] text-gray-500 dark:text-[#8e7f72] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-4 overflow-y-auto max-h-[calc(100dvh-10rem)] custom-scrollbar"
        >
          <div className="space-y-1.5">
            <label className={labelClass}>Nominal</label>
            <div className="relative">
              <Wallet
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-[#8e7f72]"
              />
              <input
                type="number"
                min="0"
                className={`${inputClass} pl-10`}
                placeholder="Contoh: 250000"
                value={nominal}
                onChange={(e) => setNominal(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className={labelClass}>Keterangan</label>
            <div className="relative">
              <FileText
                size={16}
                className="absolute left-3 top-3 text-gray-400 dark:text-[#8e7f72]"
              />
              <textarea
                className={`${inputClass} min-h-24 resize-y pl-10`}
                placeholder="Tulis detail pengeluaran..."
                value={keterangan}
                onChange={(e) => setKeterangan(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className={labelClass}>Tanggal</label>
            <div className="relative">
              <CalendarDays
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-[#8e7f72]"
              />
              <input
                type="date"
                className={`${inputClass} pl-10`}
                value={tanggal}
                onChange={(e) => setTanggal(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 dark:border-[#3e342b] text-gray-700 dark:text-[#EAE0D5] text-sm font-medium hover:bg-gray-50 dark:hover:bg-[#231910] transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 rounded-lg bg-[#ec6d13] hover:bg-[#d65c0b] text-white text-sm font-bold shadow-md shadow-[#ec6d13]/20 transition-all active:scale-95"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
