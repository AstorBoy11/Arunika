interface DataTableProps {
  products: Array<{
    id: number;
    name: string;
    price: number;
    category: string;
    stock: number;
  }>;
}

export default function DataTable({ products }: DataTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              ID
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Nama Produk
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Kategori
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Harga
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Stok
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b hover:bg-gray-50">
              <td className="px-6 py-4">{product.id}</td>
              <td className="px-6 py-4 font-medium">{product.name}</td>
              <td className="px-6 py-4">{product.category}</td>
              <td className="px-6 py-4">
                Rp {product.price.toLocaleString('id-ID')}
              </td>
              <td className="px-6 py-4">{product.stock}</td>
              <td className="px-6 py-4">
                <div className="flex gap-2">
                  <button className="text-blue-600 hover:text-blue-800">
                    Edit
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    Hapus
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
