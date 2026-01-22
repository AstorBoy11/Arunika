"use client";

import AdminHeader from "@/components/admin-header";
import {
  Bell,
  HelpCircle,
  Calendar,
  Store,
  ChevronDown,
  Download,
  DollarSign,
  TrendingUp,
  TrendingDown,
  FileText,
  ShoppingBasket,
  MoreHorizontal,
  Filter,
  ChevronRight
} from "lucide-react";

export default function AdminReports() {
  return (
    <>
      {/* 1. HEADER: Menggunakan komponen AdminHeader yang sudah kita buat */}
      <AdminHeader
        title="Sales & Performance"
        subtitle="Real-time insights across all your locations."
      >
        {/* Tombol Aksi di Header Kanan */}
        <div className="flex items-center gap-3">
          <button className="size-10 rounded-full bg-[#1a140e] border border-[#3e342b] flex items-center justify-center text-[#b9a89d] hover:text-white hover:border-[#ec6d13]/50 transition-all">
            <Bell size={20} />
          </button>
          <button className="size-10 rounded-full bg-[#1a140e] border border-[#3e342b] flex items-center justify-center text-[#b9a89d] hover:text-white hover:border-[#ec6d13]/50 transition-all">
            <HelpCircle size={20} />
          </button>
        </div>
      </AdminHeader>

      <div className="flex-1 overflow-y-auto px-8 pb-12 z-10 no-scrollbar relative">

        {/* Dekorasi Gradient Background */}
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#ec6d13]/5 to-transparent pointer-events-none -z-10"></div>

        <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4 mb-8 mt-6">
          <div className="flex flex-col md:flex-row items-center gap-3 w-full xl:w-auto">
            <button className="w-full md:w-auto flex items-center justify-between gap-2 h-10 px-4 rounded-xl bg-white dark:bg-[#1a140e] border border-gray-200 dark:border-[#3e342b] text-gray-700 dark:text-[#EAE0D5] hover:border-[#ec6d13]/50 transition-all shadow-sm dark:shadow-none">
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span className="text-sm font-medium">Oct 1 - Oct 31</span>
              </div>
              <ChevronDown size={16} className="text-gray-400 dark:text-[#b9a89d]" />
            </button>
          </div>
          
          <button className="w-full xl:w-auto flex items-center justify-center gap-2 h-10 px-5 rounded-xl bg-[#ec6d13] hover:bg-[#d65c0b] text-white shadow-[0_4px_12px_rgba(236,109,19,0.3)] transition-all">
            <Download size={18} />
            <span className="text-sm font-bold">Export Spreadsheet</span>
          </button>
        </div>

        {/* --- SECTION 2: STATS CARDS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

          {/* Revenue */}
          <div className="bg-white dark:bg-[#1a140e] border border-gray-200 dark:border-[#3e342b] rounded-xl p-6 relative overflow-hidden group shadow-sm dark:shadow-none">
            <div className="absolute right-0 top-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <DollarSign size={80} className="text-[#ec6d13]" />
            </div>
            <div className="flex flex-col gap-1 relative z-10">
              <p className="text-gray-500 dark:text-[#b9a89d] text-sm font-medium uppercase tracking-wider">Total Revenue</p>
              <h3 className="text-gray-900 dark:text-white text-3xl font-black tracking-tight">$12,450</h3>
              <div className="flex items-center gap-2 mt-2">
                <div className="px-2 py-0.5 rounded-full bg-[#0bda16]/10 border border-[#0bda16]/20 flex items-center gap-1">
                  <TrendingUp size={14} className="text-[#0bda16]" />
                  <span className="text-[#0bda16] text-xs font-bold">+12%</span>
                </div>
                <span className="text-gray-500 dark:text-[#6d5f55] text-xs">vs last month</span>
              </div>
            </div>
          </div>

          {/* Orders */}
          <div className="bg-white dark:bg-[#1a140e] border border-gray-200 dark:border-[#3e342b] rounded-xl p-6 relative overflow-hidden group shadow-sm dark:shadow-none">
            <div className="absolute right-0 top-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <FileText size={80} className="text-white dark:text-white" />
            </div>
            <div className="flex flex-col gap-1 relative z-10">
              <p className="text-gray-500 dark:text-[#b9a89d] text-sm font-medium uppercase tracking-wider">Total Orders This Month</p>
              <h3 className="text-gray-900 dark:text-white text-3xl font-black tracking-tight">840</h3>
              <div className="flex items-center gap-2 mt-2">
                <div className="px-2 py-0.5 rounded-full bg-[#0bda16]/10 border border-[#0bda16]/20 flex items-center gap-1">
                  <TrendingUp size={14} className="text-[#0bda16]" />
                  <span className="text-[#0bda16] text-xs font-bold">+5%</span>
                </div>
                <span className="text-gray-500 dark:text-[#6d5f55] text-xs">vs last month</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- SECTION 4: DETAILED REPORTS (ACCORDION) --- */}
        <div className="w-full mb-8">
          <div className="bg-white dark:bg-[#1a140e] border border-gray-200 dark:border-[#3e342b] rounded-xl flex flex-col overflow-hidden shadow-sm dark:shadow-none">
            <div className="p-6 border-b border-gray-200 dark:border-[#3e342b] flex justify-between items-start">
              <div>
                <h3 className="text-gray-900 dark:text-white text-lg font-bold">Detailed Sales Report</h3>
                <p className="text-gray-500 dark:text-[#8e7f72] text-sm">Recent transactions and itemized breakdowns.</p>
              </div>
              <button className="p-2 text-gray-400 dark:text-[#b9a89d] hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors">
                <Filter size={20} />
              </button>
            </div>

            <div className="overflow-x-auto">
              <div className="w-full min-w-[600px] text-left text-sm">
                <div className="bg-gray-50 dark:bg-[#231810] text-gray-500 dark:text-[#8e7f72] font-semibold px-6 py-3 grid grid-cols-12 gap-4 border-b border-gray-200 dark:border-[#3e342b]">
                  <div className="col-span-3">Customer</div>
                  <div className="col-span-3">Date</div>
                  <div className="col-span-2">Amount</div>
                  <div className="col-span-3">Payment</div>
                  <div className="col-span-1 text-center"></div>
                </div>

                {/* Looping Item Accordion */}
                {[
                  { name: "John Doe", date: "Oct 24, 10:42 AM", amount: "$24.50", pay: "Cash", payColor: "text-[#0bda16] bg-[#0bda16]/10 border-[#0bda16]/20", initial: "JD", color: "bg-gray-200 dark:bg-[#3e342b] text-gray-700 dark:text-[#EAE0D5]" },
                  { name: "Sarah Lee", date: "Oct 24, 09:15 AM", amount: "$18.75", pay: "Card ending 4242", payColor: "text-[#ec6d13] bg-[#ec6d13]/10 border-[#ec6d13]/20", initial: "SL", color: "bg-[#ec6d13]/20 text-[#ec6d13]" },
                  { name: "Alice B.", date: "Oct 23, 02:10 PM", amount: "$32.10", pay: "Card ending 1198", payColor: "text-[#ec6d13] bg-[#ec6d13]/10 border-[#ec6d13]/20", initial: "AB", color: "bg-gray-200 dark:bg-[#3e342b] text-gray-700 dark:text-[#EAE0D5]" },
                ].map((item, idx) => (
                  <details key={idx} className="group border-b border-gray-200 dark:border-[#3e342b] last:border-0 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors duration-200">
                    <summary className="px-6 py-4 grid grid-cols-12 gap-4 items-center cursor-pointer list-none">
                      <div className="col-span-3 flex items-center gap-3">
                        <div className={`size-8 rounded-full flex items-center justify-center text-xs font-bold ${item.color}`}>
                          {item.initial}
                        </div>
                        <span className="text-gray-900 dark:text-white font-medium">{item.name}</span>
                      </div>
                      <div className="col-span-3 text-gray-500 dark:text-[#b9a89d]">{item.date}</div>
                      <div className="col-span-2 text-gray-900 dark:text-white font-bold">{item.amount}</div>
                      <div className="col-span-3">
                        <span className={`px-2 py-1 rounded text-xs font-medium border ${item.payColor}`}>{item.pay}</span>
                      </div>
                      <div className="col-span-1 text-center flex justify-center">
                        <ChevronDown className="text-gray-400 dark:text-[#b9a89d] group-hover:text-[#ec6d13] transition-transform duration-300 group-open:rotate-180" size={18} />
                      </div>
                    </summary>

                    {/* Isi Accordion */}
                    <div className="px-6 pb-6 pt-2 bg-gray-50 dark:bg-[#140f0a] border-t border-gray-200 dark:border-[#3e342b]/30">
                      <h4 className="text-gray-500 dark:text-[#8e7f72] text-xs uppercase tracking-wider mb-3 font-semibold">Order Details</h4>
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="text-gray-500 dark:text-[#6d5f55] border-b border-gray-200 dark:border-white/5">
                            <th className="text-left py-2 font-medium">Product</th>
                            <th className="text-center py-2 font-medium">Qty</th>
                            <th className="text-right py-2 font-medium">Price</th>
                          </tr>
                        </thead>
                        <tbody className="text-gray-700 dark:text-[#EAE0D5]">
                          <tr className="border-b border-gray-200 dark:border-white/5 last:border-0">
                            <td className="py-2">Example Product</td>
                            <td className="text-center py-2 text-gray-500 dark:text-[#b9a89d]">2</td>
                            <td className="text-right py-2">$10.00</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}