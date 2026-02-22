"use client";

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
    Croissant
} from "lucide-react";

export default function AdminDashboard() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <>
            <AdminHeader>
                <div className="flex items-center justify-between w-full">
                    <div>
                        <h2 className={`${isDark ? "text-[#fcfaf8]" : "text-[#1a140e]"} text-lg md:text-2xl font-bold tracking-tight`}>Analytics Dashboard</h2>
                        <p className={`text-xs md:text-sm ${isDark ? "text-[#9a6c4c]" : "text-[#8b7355]"} hidden sm:block`}>Good Morning. Here's what's brewing.</p>
                    </div>
                </div>
            </AdminHeader>

            <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6 md:space-y-8 pb-20 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

                {/* Stats Row */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Revenue */}
                    <div className={`${isDark ? "bg-[#1a140e] border-[#3e342b]" : "bg-white border-[#e5ddd5]"} p-6 rounded-xl border shadow-xl shadow-black/20 flex flex-col gap-4 relative overflow-hidden group hover:border-[#ec6d13]/30 transition-colors`}>
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <DollarSign size={80} className="text-[#ec6d13]" />
                        </div>
                        <div className="flex justify-between items-start z-10">
                            <div className={`p-2 rounded-lg text-[#ec6d13] ${isDark ? "bg-[#3e342b]" : "bg-[#f5f0eb]"}`}>
                                <DollarSign size={24} />
                            </div>
                        </div>
                        <div className="z-10">
                            <p className={`${isDark ? "text-[#9a6c4c]" : "text-[#8b7355]"} text-sm font-medium mb-1`}>Total Revenue</p>
                            <h3 className={`${isDark ? "text-[#fcfaf8]" : "text-[#1a140e]"} text-3xl font-bold tracking-tight`}>$12,450.00</h3>
                            <span className="flex items-center w-1/6 gap-1 text-[#0bda16] bg-[#0bda16]/10 px-2 py-1 rounded-md text-xs font-bold">
                                <TrendingUp size={14} /> +12%
                            </span>
                        </div>
                    </div>

                    {/* Orders */}
                    <div className={`${isDark ? "bg-[#1a140e] border-[#3e342b]" : "bg-white border-[#e5ddd5]"} p-6 rounded-xl border shadow-xl shadow-black/20 flex flex-col gap-4 relative overflow-hidden group hover:border-[#ec6d13]/30 transition-colors`}>
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Coffee size={80} className="text-[#ec6d13]" />
                        </div>
                        <div className="flex justify-between items-start z-10">
                            <div className={`p-2 rounded-lg text-[#ec6d13] ${isDark ? "bg-[#3e342b]" : "bg-[#f5f0eb]"}`}>
                                <Coffee size={24} />
                            </div>
                        </div>
                        <div className="z-10">
                            <p className={`${isDark ? "text-[#9a6c4c]" : "text-[#8b7355]"} text-sm font-medium mb-1`}>Total Orders</p>
                            <h3 className={`${isDark ? "text-[#fcfaf8]" : "text-[#1a140e]"} text-3xl font-bold tracking-tight`}>1,240 Cups</h3>
                            <span className="flex items-center w-1/6 gap-1 text-[#0bda16] bg-[#0bda16]/10 px-2 py-1 rounded-md text-xs font-bold">
                                <TrendingUp size={14} /> +12%
                            </span>
                        </div>
                    </div>
                </section>

                {/* Chart & Table */}
                <section className="flex flex-col lg:flex-row gap-6">
                    <div className={`flex-[2] rounded-xl border p-6 shadow-xl shadow-black/20 ${isDark ? "bg-[#1a140e] border-[#3e342b]" : "bg-white border-[#e5ddd5]"}`}>
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className={`${isDark ? "text-[#fcfaf8]" : "text-[#1a140e]"} text-lg font-bold`}>Revenue Overview</h3>
                                <p className={`text-xs ${isDark ? "text-[#9a6c4c]" : "text-[#8b7355]"}`}>Last 30 Days Performance</p>
                            </div>
                            <div className="flex gap-2 items-center">
                                <span className="w-3 h-3 rounded-full bg-[#ec6d13]"></span>
                                <span className={`text-xs font-medium ${isDark ? "text-[#fcfaf8]" : "text-[#1a140e]"}`}>Sales</span>
                            </div>
                        </div>
                        <div className="w-full h-[300px] relative">
                            <svg className="w-full h-full overflow-visible" viewBox="0 0 800 300">
                                <defs>
                                    <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                                        <stop offset="0%" stopColor="#ec6d13" stopOpacity="0.2"></stop>
                                        <stop offset="100%" stopColor="#ec6d13" stopOpacity="0"></stop>
                                    </linearGradient>
                                </defs>
                                <line stroke={isDark ? "#3e342b" : "#e5ddd5"} strokeDasharray="4" strokeWidth="1" x1="0" x2="800" y1="250" y2="250"></line>
                                <line stroke={isDark ? "#3e342b" : "#e5ddd5"} strokeDasharray="4" strokeWidth="1" x1="0" x2="800" y1="175" y2="175"></line>
                                <line stroke={isDark ? "#3e342b" : "#e5ddd5"} strokeDasharray="4" strokeWidth="1" x1="0" x2="800" y1="100" y2="100"></line>
                                <line stroke={isDark ? "#3e342b" : "#e5ddd5"} strokeDasharray="4" strokeWidth="1" x1="0" x2="800" y1="25" y2="25"></line>
                                <path d="M0,200 C100,200 150,100 250,120 C350,140 400,220 500,180 C600,140 650,50 800,80" fill="none" stroke="#ec6d13" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></path>
                                <path d="M0,200 C100,200 150,100 250,120 C350,140 400,220 500,180 C600,140 650,50 800,80 L800,250 L0,250 Z" fill="url(#gradient)" opacity="0.6"></path>
                                <circle cx="250" cy="120" fill={isDark ? "#1a140e" : "white"} r="4" stroke="#ec6d13" strokeWidth="2"></circle>
                                <circle cx="500" cy="180" fill={isDark ? "#1a140e" : "white"} r="4" stroke="#ec6d13" strokeWidth="2"></circle>
                                <circle cx="800" cy="80" fill={isDark ? "#1a140e" : "white"} r="4" stroke="#ec6d13" strokeWidth="2"></circle>
                            </svg>
                        </div>
                    </div>

                    <div className={`flex-1 rounded-xl border p-6 shadow-xl shadow-black/20 flex flex-col ${isDark ? "bg-[#1a140e] border-[#3e342b]" : "bg-white border-[#e5ddd5]"}`}>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className={`${isDark ? "text-[#fcfaf8]" : "text-[#1a140e]"} text-lg font-bold`}>Recent Orders</h3>
                            <button className="text-xs text-[#ec6d13] font-medium hover:underline">View All</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className={`text-xs border-b ${isDark ? "text-[#9a6c4c] border-[#3e342b]" : "text-[#8b7355] border-[#e5ddd5]"}`}>
                                        <th className="py-3 font-medium">Order ID</th>
                                        <th className="py-3 font-medium">Items</th>
                                        <th className="py-3 font-medium text-right">Amount</th>
                                        <th className="py-3 font-medium text-right">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {[
                                        { id: "#1024", items: "Latte, Croissant", amount: "$12.50", status: "Done", color: "text-green-500 bg-green-500/10 border-green-500/20" },
                                        { id: "#1025", items: "Espresso x2", amount: "$6.00", status: "Brewing", color: "text-[#ec6d13] bg-[#ec6d13]/10 border-[#ec6d13]/20" },
                                        { id: "#1026", items: "Cappuccino", amount: "$4.50", status: "Brewing", color: "text-[#ec6d13] bg-[#ec6d13]/10 border-[#ec6d13]/20" },
                                        { id: "#1027", items: "Cold Brew", amount: "$5.00", status: "Pending", color: "text-gray-400 bg-gray-500/10 border-gray-500/20" },
                                    ].map((order) => (
                                        <tr key={order.id} className={`group border-b transition-colors ${isDark ? "border-[#3e342b]/50 hover:bg-[#3e342b]/30" : "border-[#e5ddd5] hover:bg-[#f5f0eb]"}`}>
                                            <td className={`py-3 font-medium ${isDark ? "text-[#fcfaf8]" : "text-[#1a140e]"}`}>{order.id}</td>
                                            <td className={`py-3 ${isDark ? "text-[#b9a89d]" : "text-[#8b7355]"}`}>{order.items}</td>
                                            <td className={`py-3 text-right font-bold ${isDark ? "text-[#fcfaf8]" : "text-[#1a140e]"}`}>{order.amount}</td>
                                            <td className="py-3 text-right">
                                                <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold border ${order.color}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* Inventory */}
                <section className={`${isDark ? "bg-[#1a140e] border-[#3e342b]" : "bg-white border-[#e5ddd5]"} rounded-xl border p-6 shadow-xl shadow-black/20`}>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-[#ec6d13]/10 rounded-lg text-[#ec6d13]">
                            <Package size={20} />
                        </div>
                        <h3 className={`${isDark ? "text-[#fcfaf8]" : "text-[#1a140e]"} text-lg font-bold`}>Low Stock Alerts</h3>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        <div className={`flex items-center gap-3 p-3 rounded-lg border min-w-[200px] ${isDark ? "bg-[#3e342b]/40 border-[#ec6d13]/40" : "bg-[#f5f0eb] border-[#ec6d13]/20"}`}>
                            <div className={`size-10 rounded-md flex items-center justify-center text-[#ec6d13] ${isDark ? "bg-[#221810]" : "bg-white"}`}>
                                <Coffee size={20} />
                            </div>
                            <div>
                                <p className={`${isDark ? "text-[#fcfaf8]" : "text-[#1a140e]"} text-sm font-medium`}>Arabica Beans</p>
                                <p className="text-xs text-[#ec6d13] font-bold">2kg Remaining</p>
                            </div>
                        </div>
                        <div className={`flex items-center gap-3 p-3 rounded-lg border min-w-[200px] ${isDark ? "bg-[#3e342b]/40 border-[#3e342b]" : "bg-[#f5f0eb] border-[#e5ddd5]"}`}>
                            <div className={`size-10 rounded-md flex items-center justify-center ${isDark ? "bg-[#221810] text-[#9a6c4c]" : "bg-white text-[#8b7355]"}`}>
                                <Droplets size={20} />
                            </div>
                            <div>
                                <p className={`${isDark ? "text-[#fcfaf8]" : "text-[#1a140e]"} text-sm font-medium`}>Oat Milk</p>
                                <p className={`text-xs ${isDark ? "text-[#b9a89d]" : "text-[#8b7355]"}`}>12 Cartons</p>
                            </div>
                        </div>
                        <div className={`flex items-center gap-3 p-3 rounded-lg border min-w-[200px] ${isDark ? "bg-[#3e342b]/40 border-[#3e342b]" : "bg-[#f5f0eb] border-[#e5ddd5]"}`}>
                            <div className={`size-10 rounded-md flex items-center justify-center ${isDark ? "bg-[#221810] text-[#9a6c4c]" : "bg-white text-[#8b7355]"}`}>
                                <Croissant size={20} />
                            </div>
                            <div>
                                <p className={`${isDark ? "text-[#fcfaf8]" : "text-[#1a140e]"} text-sm font-medium`}>Croissants</p>
                                <p className={`text-xs ${isDark ? "text-[#b9a89d]" : "text-[#8b7355]"}`}>15 Units</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
