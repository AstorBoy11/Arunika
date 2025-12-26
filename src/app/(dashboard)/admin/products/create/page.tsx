'use client';

import { useRouter } from 'next/navigation';

export default function CreateProductPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Produk berhasil ditambahkan!');
    router.push('/admin/products');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Tambah Produk Baru</h1>

      <div className="bg-white rounded-lg shadow p-8 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Nama Produk</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Contoh: Espresso"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Kategori</label>
            <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Hot Coffee</option>
              <option>Cold Coffee</option>
              <option>Non Coffee</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Harga</label>
            <input
              type="number"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="25000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Stok</label>
            <input
              type="number"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Deskripsi</label>
            <textarea
              rows={4}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Deskripsi produk..."
            ></textarea>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Simpan
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
