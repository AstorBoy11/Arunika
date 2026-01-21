import { Package, Clock, ShoppingBag } from "lucide-react";

export default function UserDashboard() {
    return (
        <div className="space-y-6 sm:space-y-8">
            {/* 1. Header Konten */}
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Halo, John Doe!</h1>
                <p className="text-sm sm:text-base text-[#9a6c4c]">Senang melihatmu kembali. Mau ngopi apa hari ini?</p>
            </div>

            {/* 2. Statistik Singkat (Grid) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Card 1 */}
                <div className="bg-[#1a140e] p-4 sm:p-6 rounded-xl border border-[#3e3025] flex items-center gap-3 sm:gap-4">
                    <div className="p-2 sm:p-3 bg-[#ec6d13]/10 rounded-lg text-[#ec6d13] flex-shrink-0">
                        <ShoppingBag size={20} className="sm:w-6 sm:h-6" />
                    </div>
                    <div className="min-w-0">
                        <p className="text-[#9a6c4c] text-xs sm:text-sm truncate">Total Pesanan</p>
                        <h3 className="text-xl sm:text-2xl font-bold text-white">12</h3>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="bg-[#1a140e] p-4 sm:p-6 rounded-xl border border-[#3e3025] flex items-center gap-3 sm:gap-4">
                    <div className="p-2 sm:p-3 bg-blue-500/10 rounded-lg text-blue-500 flex-shrink-0">
                        <Clock size={20} className="sm:w-6 sm:h-6" />
                    </div>
                    <div className="min-w-0">
                        <p className="text-[#9a6c4c] text-xs sm:text-sm truncate">Sedang Diproses</p>
                        <h3 className="text-xl sm:text-2xl font-bold text-white">1</h3>
                    </div>
                </div>

                {/* Card 3 */}
                <div className="bg-[#1a140e] p-4 sm:p-6 rounded-xl border border-[#3e3025] flex items-center gap-3 sm:gap-4 sm:col-span-2 lg:col-span-1">
                    <div className="p-2 sm:p-3 bg-green-500/10 rounded-lg text-green-500 flex-shrink-0">
                        <Package size={20} className="sm:w-6 sm:h-6" />
                    </div>
                    <div className="min-w-0">
                        <p className="text-[#9a6c4c] text-xs sm:text-sm truncate">Selesai</p>
                        <h3 className="text-xl sm:text-2xl font-bold text-white">11</h3>
                    </div>
                </div>
            </div>

            {/* 3. Pesanan Terakhir */}
            <div className="bg-[#1a140e] rounded-xl border border-[#3e3025] overflow-hidden">
                <div className="p-4 sm:p-6 border-b border-[#3e3025] flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <h3 className="font-bold text-base sm:text-lg text-white">Pesanan Terakhir</h3>
                    <button className="text-sm text-[#ec6d13] hover:underline self-start sm:self-auto">Lihat Semua</button>
                </div>
                <div className="p-4 sm:p-6">
                    {/* Order Item */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 border-b border-[#3e3025]/50 last:border-0 gap-3">
                        <div className="flex items-center gap-3 sm:gap-4">
                            <div className="h-10 w-10 sm:h-12 sm:w-12 bg-[#2c241b] rounded-md border border-[#3e3025] flex-shrink-0"></div>
                            <div className="min-w-0">
                                <p className="font-bold text-sm sm:text-base text-white truncate">Arabica Gayo Wine</p>
                                <p className="text-xs sm:text-sm text-[#9a6c4c] truncate">250gr • Fine Grind</p>
                            </div>
                        </div>
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 self-start sm:self-auto flex-shrink-0">
                            Dikirim
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}