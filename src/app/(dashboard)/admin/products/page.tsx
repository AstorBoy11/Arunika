import Link from 'next/link';
import DataTable from '@/components/dashboard/data-table';

export default function AdminProductsPage() {
  // Data dummy untuk development
  const products = [
    { id: 1, name: 'Espresso', price: 25000, category: 'Hot Coffee', stock: 50 },
    { id: 2, name: 'Cappuccino', price: 30000, category: 'Hot Coffee', stock: 45 },
    { id: 3, name: 'Latte', price: 32000, category: 'Hot Coffee', stock: 40 },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Kelola Produk</h1>
        <Link
          href="/admin/products/create"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Tambah Produk
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow">
        <DataTable products={products} />
      </div>
    </div>
  );
}
