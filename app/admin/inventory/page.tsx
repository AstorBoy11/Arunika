import AdminHeader from "@/components/admin-header";
import InventoryClient from "./_components/InventoryClient";

export default function AdminInventory() {
  return (
    <div className="flex flex-col h-full w-full bg-gray-50 dark:bg-[#120d0a]">
      <AdminHeader
        title="Inventory Management"
        subtitle="Kelola produk, stok, dan kategori toko"
      />
      <InventoryClient />
    </div>
  );
}
