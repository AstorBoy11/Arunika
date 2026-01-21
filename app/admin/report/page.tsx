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
  MoreHorizontal 
} from "lucide-react";

export default function AdminReports() {
  return (
    <>
      {/* Menggunakan AdminHeader Reusable */}
      <AdminHeader 
        title="Sales & Performance" 
        subtitle="Real-time insights across all your locations."
      >
        {/* Tombol Header Kanan */}
        <div className="flex items-center gap-3">
          <button className="size-10 rounded-full bg-[#1a140e] border border-[#3e342b] flex items-center justify-center text-[#b9a89d] hover:text-white hover:border-[#f16d0e]/50 transition-all">
            <Bell size={20} />
          </button>
          <button className="size-10 rounded-full bg-[#1a140e] border border-[#3e342b] flex items-center justify-center text-[#b9a89d] hover:text-white hover:border-[#f16d0e]/50 transition-all">
            <HelpCircle size={20} />
          </button>
        </div>
      </AdminHeader>

      {/* Main Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-8 pb-12 z-10 custom-scrollbar relative">
        
        {/* Decorative Gradient Background */}
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#f16d0e]/5 to-transparent pointer-events-none -z-10"></div>

        {/* Filters & Controls */}
        <div className="flex flex-wrap items-center gap-3 mb-8 mt-6">
          <div className="flex items-center bg-[#1a140e] rounded-xl border border-[#3e342b] p-1">
            <button className="px-4 py-2 rounded-lg bg-[#3e342b]/50 text-white text-sm font-medium shadow-sm">Overview</button>
            <button className="px-4 py-2 rounded-lg text-[#b9a89d] hover:text-white text-sm font-medium transition-colors">By Store</button>
            <button className="px-4 py-2 rounded-lg text-[#b9a89d] hover:text-white text-sm font-medium transition-colors">By Product</button>
          </div>
          
          <div className="h-8 w-px bg-[#3e342b] mx-2 hidden md:block"></div>
          
          <button className="flex items-center gap-2 h-10 px-4 rounded-xl bg-[#1a140e] border border-[#3e342b] text-[#EAE0D5] hover:border-[#f16d0e]/50 transition-all">
            <Calendar size={18} />
            <span className="text-sm font-medium">Oct 1 - Oct 31</span>
            <ChevronDown size={16} className="text-[#b9a89d]" />
          </button>
          
          <button className="flex items-center gap-2 h-10 px-4 rounded-xl bg-[#1a140e] border border-[#3e342b] text-[#EAE0D5] hover:border-[#f16d0e]/50 transition-all">
            <Store size={18} />
            <span className="text-sm font-medium">All Locations</span>
            <ChevronDown size={16} className="text-[#b9a89d]" />
          </button>
          
          <div className="flex-1"></div>
          
          <button className="flex items-center gap-2 h-10 px-5 rounded-xl bg-[#f16d0e] hover:bg-[#d65a08] text-white shadow-[0_4px_12px_rgba(241,109,14,0.3)] transition-all">
            <Download size={18} />
            <span className="text-sm font-bold">Export CSV</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* Card 1: Revenue */}
          <div className="bg-[#1a140e] border border-[#3e342b] rounded-xl p-6 relative overflow-hidden group">
            <div className="absolute right-0 top-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <DollarSign size={80} className="text-[#f16d0e]" />
            </div>
            <div className="flex flex-col gap-1 relative z-10">
              <p className="text-[#b9a89d] text-sm font-medium uppercase tracking-wider">Total Revenue</p>
              <h3 className="text-white text-3xl font-black tracking-tight">$12,450</h3>
              <div className="flex items-center gap-2 mt-2">
                <div className="px-2 py-0.5 rounded-full bg-[#0bda16]/10 border border-[#0bda16]/20 flex items-center gap-1">
                  <TrendingUp size={14} className="text-[#0bda16]" />
                  <span className="text-[#0bda16] text-xs font-bold">+12%</span>
                </div>
                <span className="text-[#6d5f55] text-xs">vs last month</span>
              </div>
            </div>
          </div>

          {/* Card 2: Orders */}
          <div className="bg-[#1a140e] border border-[#3e342b] rounded-xl p-6 relative overflow-hidden group">
            <div className="absolute right-0 top-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <FileText size={80} className="text-white" />
            </div>
            <div className="flex flex-col gap-1 relative z-10">
              <p className="text-[#b9a89d] text-sm font-medium uppercase tracking-wider">Total Orders</p>
              <h3 className="text-white text-3xl font-black tracking-tight">840</h3>
              <div className="flex items-center gap-2 mt-2">
                <div className="px-2 py-0.5 rounded-full bg-[#0bda16]/10 border border-[#0bda16]/20 flex items-center gap-1">
                  <TrendingUp size={14} className="text-[#0bda16]" />
                  <span className="text-[#0bda16] text-xs font-bold">+5%</span>
                </div>
                <span className="text-[#6d5f55] text-xs">vs last month</span>
              </div>
            </div>
          </div>

          {/* Card 3: Avg Order Value */}
          <div className="bg-[#1a140e] border border-[#3e342b] rounded-xl p-6 relative overflow-hidden group">
            <div className="absolute right-0 top-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <ShoppingBasket size={80} className="text-white" />
            </div>
            <div className="flex flex-col gap-1 relative z-10">
              <p className="text-[#b9a89d] text-sm font-medium uppercase tracking-wider">Avg. Order Value</p>
              <h3 className="text-white text-3xl font-black tracking-tight">$14.80</h3>
              <div className="flex items-center gap-2 mt-2">
                <div className="px-2 py-0.5 rounded-full bg-[#fa3f38]/10 border border-[#fa3f38]/20 flex items-center gap-1">
                  <TrendingDown size={14} className="text-[#fa3f38]" />
                  <span className="text-[#fa3f38] text-xs font-bold">-2%</span>
                </div>
                <span className="text-[#6d5f55] text-xs">vs last month</span>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Bar Chart: Top Selling */}
          <div className="lg:col-span-2 bg-[#1a140e] border border-[#3e342b] rounded-xl p-6 flex flex-col gap-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-white text-lg font-bold">Top Selling Blends</h3>
                <p className="text-[#8e7f72] text-sm">Most popular items by unit sales.</p>
              </div>
              <button className="p-2 text-[#b9a89d] hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                <MoreHorizontal size={20} />
              </button>
            </div>
            
            {/* Custom CSS Bar Chart */}
            <div className="flex flex-col gap-5 flex-1 justify-center">
              {[
                { name: "Ethiopian Yirgacheffe", count: "342 units", percent: "85%", color: "bg-[#f16d0e]" },
                { name: "House Blend (Dark Roast)", count: "280 units", percent: "65%", color: "bg-[#b9a89d] group-hover:bg-[#f16d0e]/70" },
                { name: "Nitro Cold Brew", count: "215 units", percent: "50%", color: "bg-[#b9a89d] group-hover:bg-[#f16d0e]/70" },
                { name: "Oat Milk Latte", count: "190 units", percent: "42%", color: "bg-[#b9a89d] group-hover:bg-[#f16d0e]/70" },
              ].map((item, idx) => (
                <div key={idx} className="group">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-[#EAE0D5] font-medium">{item.name}</span>
                    <span className="text-white font-bold">{item.count}</span>
                  </div>
                  <div className="h-3 w-full bg-[#2a221b] rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${item.color} rounded-full shadow-[0_0_10px_rgba(241,109,14,0.5)] transition-all duration-500`} 
                      style={{ width: item.percent }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Donut Chart: Categories */}
          <div className="bg-[#1a140e] border border-[#3e342b] rounded-xl p-6 flex flex-col">
            <div className="mb-6">
              <h3 className="text-white text-lg font-bold">Sales by Category</h3>
              <p className="text-[#8e7f72] text-sm">Revenue distribution.</p>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center gap-8">
              
              {/* CSS Donut Chart */}
              <div 
                className="relative size-48 rounded-full flex items-center justify-center" 
                style={{ background: "conic-gradient(#f16d0e 0% 45%, #8e7f72 45% 70%, #4a3b32 70% 90%, #2a221b 90% 100%)" }}
              >
                {/* Inner Circle */}
                <div className="size-36 bg-[#1a140e] rounded-full flex flex-col items-center justify-center">
                  <span className="text-[#8e7f72] text-sm">Total</span>
                  <span className="text-white text-2xl font-black">$12.4k</span>
                </div>
              </div>

              {/* Legend */}
              <div className="grid grid-cols-2 gap-x-8 gap-y-3 w-full px-4">
                <div className="flex items-center gap-2">
                  <div className="size-3 rounded-full bg-[#f16d0e]"></div>
                  <span className="text-sm text-[#EAE0D5]">Coffee (45%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-3 rounded-full bg-[#8e7f72]"></div>
                  <span className="text-sm text-[#EAE0D5]">Food (25%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-3 rounded-full bg-[#4a3b32]"></div>
                  <span className="text-sm text-[#EAE0D5]">Merch (20%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-3 rounded-full bg-[#2a221b] border border-white/20"></div>
                  <span className="text-sm text-[#EAE0D5]">Beans (10%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Section 2: Peak Hours */}
        <div className="w-full bg-[#1a140e] border border-[#3e342b] rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="text-white text-lg font-bold">Peak Store Traffic</h3>
              <p className="text-[#8e7f72] text-sm">Average number of orders per hour.</p>
            </div>
            <div className="flex gap-2 bg-[#2a221b] p-1 rounded-lg self-start">
              <button className="px-3 py-1 text-xs font-bold bg-[#f16d0e] text-white rounded shadow-sm">Weekdays</button>
              <button className="px-3 py-1 text-xs font-medium text-[#b9a89d] hover:text-white transition-colors">Weekends</button>
            </div>
          </div>
          
          {/* Histogram Container */}
          <div className="w-full h-48 flex items-end gap-2 md:gap-4 relative px-2">
            {/* Grid Lines Background */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20 z-0">
               {[1,2,3,4].map(i => <div key={i} className="w-full border-t border-dashed border-[#b9a89d]"></div>)}
            </div>

            {/* Bars */}
            {[
              { time: "6am", height: "20%", orders: "12", color: "bg-[#392f28]" },
              { time: "7am", height: "45%", orders: "45", color: "bg-[#f16d0e]/40 hover:bg-[#f16d0e]" },
              { time: "8am", height: "85%", orders: "98", color: "bg-[#f16d0e] hover:brightness-110 shadow-[0_0_15px_rgba(241,109,14,0.3)]", bold: true },
              { time: "9am", height: "95%", orders: "112", color: "bg-[#f16d0e] hover:brightness-110 shadow-[0_0_15px_rgba(241,109,14,0.3)]", bold: true },
              { time: "10am", height: "60%", orders: "65", color: "bg-[#f16d0e]/60 hover:bg-[#f16d0e]" },
              { time: "11am", height: "40%", orders: "35", color: "bg-[#392f28] hover:bg-[#f16d0e]/50" },
              { time: "12pm", height: "55%", orders: "50", color: "bg-[#392f28] hover:bg-[#f16d0e]/50" },
              { time: "1pm", height: "45%", orders: "42", color: "bg-[#392f28] hover:bg-[#f16d0e]/50" },
              { time: "2pm", height: "30%", orders: "28", color: "bg-[#392f28] hover:bg-[#f16d0e]/50" },
              { time: "3pm", height: "25%", orders: "20", color: "bg-[#392f28] hover:bg-[#f16d0e]/50" },
              { time: "4pm", height: "20%", orders: "15", color: "bg-[#392f28] hover:bg-[#f16d0e]/50" },
              { time: "5pm", height: "15%", orders: "10", color: "bg-[#392f28] hover:bg-[#f16d0e]/50" },
            ].map((bar, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group z-10">
                <div 
                  className={`w-full ${bar.color} rounded-t-sm transition-all relative group`} 
                  style={{ height: bar.height }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-xs font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                    {bar.orders} Orders
                  </div>
                </div>
                <span className={`text-[10px] md:text-xs ${bar.bold ? "text-[#EAE0D5] font-bold" : "text-[#6d5f55]"}`}>
                  {bar.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        <footer className="text-center text-[#6d5f55] text-xs pb-4">
          <p>© 2026 Coffee Connect Systems. All data is real-time.</p>
        </footer>

      </div>
    </>
  );
}