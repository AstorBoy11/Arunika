"use client";

import AdminHeader from "@/components/admin-header";
import {
  Search,
  Plus,
  Package,
  AlertTriangle,
  XCircle,
  Truck,
  Coffee,
  FlaskConical,
  CupSoda, // Ganti LocalCafe (Gelas Kopi)
  Wine,
  ArrowUpDown, // Ganti ArrowDropDown
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export default function AdminInventory() {
  // Data Dummy untuk Tabel
  const inventoryData = [
    {
      name: "Ethiopian Yirgacheffe",
      sku: "BN-ETH-001",
      category: "Coffee Beans",
      stockPercent: 85,
      stockValue: "42 kg",
      price: "$18.50 / kg",
      status: "In Stock",
      statusColor: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
      dotColor: "bg-emerald-500",
      barColor: "bg-[#ec6d13]", // Aksen Oranye
      icon: Coffee,
    },
    {
      name: "Oatly Barista Edition",
      sku: "MK-OAT-004",
      category: "Dairy Alternative",
      stockPercent: 25,
      stockValue: "12 L",
      price: "$4.20 / L",
      status: "Low Stock",
      statusColor: "text-amber-500 bg-amber-500/10 border-amber-500/20",
      dotColor: "bg-amber-500",
      barColor: "bg-amber-500",
      icon: FlaskConical,
    },
    {
      name: "Paper Cups (12oz)",
      sku: "PG-CUP-12",
      category: "Paper Goods",
      stockPercent: 60,
      stockValue: "300 units",
      price: "$0.12 / unit",
      status: "In Stock",
      statusColor: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
      dotColor: "bg-emerald-500",
      barColor: "bg-[#ec6d13]",
      icon: CupSoda,
    },
    {
      name: "Vanilla Syrup",
      sku: "SY-VAN-001",
      category: "Syrups",
      stockPercent: 92,
      stockValue: "18 btls",
      price: "$8.90 / btl",
      status: "In Stock",
      statusColor: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
      dotColor: "bg-emerald-500",
      barColor: "bg-[#ec6d13]",
      icon: Wine,
    },
    {
      name: "Espresso Blend",
      sku: "BN-ESP-002",
      category: "Coffee Beans",
      stockPercent: 15,
      stockValue: "8 kg",
      price: "$16.00 / kg",
      status: "Critical",
      statusColor: "text-red-500 bg-red-500/10 border-red-500/20",
      dotColor: "bg-red-500",
      barColor: "bg-red-500",
      icon: Coffee,
    },
  ];

  return (
    <div className="flex flex-col h-full w-full">
      {/* 1. HEADER */}
      <AdminHeader
        title="Inventory Stock"
        subtitle="Manage stock levels and supplies"
      >
      </AdminHeader>

      {/* 2. KONTEN UTAMA */}
      <div className="flex-1 overflow-y-auto p-8 pt-4 custom-scrollbar">

        {/* Section 1: Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { label: "Total Items", value: "142", icon: Package, color: "text-emerald-500 bg-emerald-500/10" },
            { label: "Low Stock", value: "8", icon: AlertTriangle, color: "text-amber-500 bg-amber-500/10" },
            { label: "Out of Stock", value: "2", icon: XCircle, color: "text-red-500 bg-red-500/10" },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white dark:bg-[#1a140e] p-4 rounded-xl border border-gray-200 dark:border-[#3e342b] flex items-center gap-4 shadow-sm dark:shadow-none">
              <div className={`size-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-gray-500 dark:text-[#8e7f72] text-xs uppercase tracking-wider font-semibold">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-[#EAE0D5]">{stat.value}</p>
              </div>
            </div>
          ))}

        </div>

        {/* Section 2: Table Container */}
        <div className="bg-white dark:bg-[#1a140e] rounded-xl border border-gray-200 dark:border-[#3e342b] overflow-hidden shadow-sm dark:shadow-black/40 flex flex-col">
          <div className="p-4 border-b border-gray-200 dark:border-[#3e342b] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-gray-500 dark:text-[#8e7f72]">
              <span className="text-xs uppercase font-semibold tracking-wider">Sort by:</span>
              <div className="flex items-center gap-1 cursor-pointer hover:text-gray-900 dark:hover:text-[#EAE0D5]">
                <span className="text-sm font-medium">Stock Level</span>
                <ArrowUpDown size={16} />
              </div>
            </div>
            <button className="flex items-center gap-2 bg-[#ec6d13] hover:bg-[#d65c0b] border border-gray-200 dark:border-[#3e342b] text-white px-5 py-2.5 rounded-lg font-bold shadow-lg shadow-[#ec6d13]/20 transition-all active:scale-95">
              <Plus size={20} />
              <span>Add New Item</span>
            </button>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-[#231910] border-b border-gray-200 dark:border-[#3e342b]">
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-[#8e7f72] w-[25%]">Item Name</th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-[#8e7f72] w-[15%]">Category</th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-[#8e7f72] w-[30%]">Stock Level</th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-[#8e7f72] w-[15%]">Unit Price</th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-[#8e7f72] w-[15%]">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-[#3e342b]">
                {inventoryData.map((item, idx) => (
                  <tr key={idx} className="bg-white dark:bg-[#1a140e] hover:bg-gray-50 dark:hover:bg-[#2a221c] transition-colors group">
                    {/* Item Name Column */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-lg bg-gray-100 dark:bg-[#3e342b] flex items-center justify-center text-gray-500 dark:text-[#8e7f72]">
                          <item.icon size={20} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">{item.name}</p>
                          <p className="text-xs text-gray-500 dark:text-[#8e7f72]">SKU: {item.sku}</p>
                        </div>
                      </div>
                    </td>
                    {/* Category Column */}
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-700 dark:text-[#EAE0D5]">{item.category}</span>
                    </td>
                    {/* Stock Level Column */}
                    <td className="py-4 px-6">
                      <div className="w-full max-w-xs">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-700 dark:text-[#EAE0D5] font-medium">{item.stockPercent}%</span>
                          <span className="text-gray-500 dark:text-[#8e7f72]">{item.stockValue}</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-[#3e342b] rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${item.barColor}`}
                            style={{ width: `${item.stockPercent}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    {/* Price Column */}
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-700 dark:text-[#EAE0D5]">{item.price}</span>
                    </td>
                    {/* Status Column */}
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${item.statusColor}`}>
                        <span className={`size-1.5 rounded-full ${item.dotColor}`}></span>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer / Pagination */}
          <div className="p-4 bg-gray-50 dark:bg-[#231910] border-t border-gray-200 dark:border-[#3e342b] flex items-center justify-between">
            <p className="text-xs text-gray-500 dark:text-[#8e7f72]">
              Showing <span className="text-gray-900 dark:text-[#EAE0D5] font-bold">1-5</span> of <span className="text-gray-900 dark:text-[#EAE0D5] font-bold">142</span> items
            </p>
            <div className="flex gap-2">
              <button className="px-3 py-1 rounded-lg border border-gray-300 dark:border-[#3e342b] text-gray-500 dark:text-[#8e7f72] hover:text-gray-900 dark:hover:text-[#EAE0D5] text-xs font-medium hover:bg-gray-100 dark:hover:bg-[#1a140e] transition-colors disabled:opacity-50" disabled>
                Previous
              </button>
              <button className="px-3 py-1 rounded-lg border border-gray-300 dark:border-[#3e342b] text-gray-500 dark:text-[#8e7f72] hover:text-gray-900 dark:hover:text-[#EAE0D5] text-xs font-medium hover:bg-gray-100 dark:hover:bg-[#1a140e] transition-colors">
                Next
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}