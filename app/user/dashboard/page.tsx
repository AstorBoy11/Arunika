// Server Component — no "use client" needed for the static header.
// All interactivity lives in DashboardClient (below).
import { Coffee } from "lucide-react";
import DashboardClient from "./_components/DashboardClient";

// ─── Server Component ────────────────────────────────────────────────────────
// No "use client" → this page is rendered to HTML on the server.
// The static heading is shipped as plain HTML (zero JS, great for FCP/LCP).
// DashboardClient below carries the "use client" boundary, so only the
// interactive slice (grid, sort, modal) ships client-side JavaScript.

export default function UserDashboard() {
  return (
    <div className="flex flex-col gap-8 pb-20">
      {/* Heading — server-rendered HTML, styled with dark: utilities */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Coffee size={20} className="text-[#ec6d13]" />
            <span className="text-sm font-medium text-[#8b7355] dark:text-[#b9a89d]">
              Koleksi Kopi Kami
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#1a140e] dark:text-white">
            Jelajahi <span className="text-[#ec6d13]">Produk</span>
          </h1>
        </div>
      </div>

      {/* Filters + sort + product grid + quick-view modal (all client-side) */}
      <DashboardClient />
    </div>
  );
}

