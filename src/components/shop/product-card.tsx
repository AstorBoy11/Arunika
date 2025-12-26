import Link from 'next/link';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    slug: string;
    image: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/katalog/${product.slug}`}>
      <div className="border rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer">
        <div className="bg-gray-200 h-48"></div>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
          <p className="text-2xl font-bold text-amber-700">
            Rp {product.price.toLocaleString('id-ID')}
          </p>
          <button className="mt-4 w-full bg-amber-700 text-white py-2 rounded hover:bg-amber-800 transition">
            Lihat Detail
          </button>
        </div>
      </div>
    </Link>
  );
}
