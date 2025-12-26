'use client';

import { useParams, useRouter } from 'next/navigation';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  // Data dummy berdasarkan slug
  const product = {
    name: slug.charAt(0).toUpperCase() + slug.slice(1),
    price: 30000,
    description: 'Kopi premium dengan cita rasa yang khas dan aroma yang menggugah selera.',
    category: 'Hot Coffee',
  };

  const handleAddToCart = () => {
    alert('Produk ditambahkan ke keranjang!');
    router.push('/cart');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => router.back()}
        className="mb-6 text-blue-600 hover:text-blue-800"
      >
        ← Kembali ke Katalog
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="bg-gray-200 h-96 rounded-lg"></div>

        {/* Product Info */}
        <div>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.category}</p>
          <p className="text-3xl font-bold text-amber-700 mb-6">
            Rp {product.price.toLocaleString('id-ID')}
          </p>
          <p className="text-gray-700 mb-8">{product.description}</p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Jumlah</label>
              <input
                type="number"
                defaultValue={1}
                min={1}
                className="w-20 px-3 py-2 border rounded-lg"
              />
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full bg-amber-700 text-white py-3 rounded-lg font-semibold hover:bg-amber-800 transition"
            >
              Tambah ke Keranjang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
