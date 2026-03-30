import AdminHeader from "@/components/admin-header";
import FinanceClient from "./_components/FinanceClient";

export default function AdminFinancePage() {
  return (
    <div className="flex flex-col h-full w-full bg-gray-50 dark:bg-[#120d0a]">
      <AdminHeader
        title="Finance"
        subtitle="Pantau pemasukan dan catat pengeluaran operasional"
      />
      <FinanceClient />
    </div>
  );
}