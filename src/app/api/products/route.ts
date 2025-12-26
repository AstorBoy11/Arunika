import { NextResponse } from 'next/server';

// Data dummy untuk development
const products = [
  {
    id: 1,
    name: 'Espresso',
    slug: 'espresso',
    price: 25000,
    category: 'Hot Coffee',
    description: 'Kopi hitam pekat dengan cita rasa kuat',
    stock: 50,
    image: '',
  },
  {
    id: 2,
    name: 'Cappuccino',
    slug: 'cappuccino',
    price: 30000,
    category: 'Hot Coffee',
    description: 'Perpaduan espresso dengan susu dan foam',
    stock: 45,
    image: '',
  },
  {
    id: 3,
    name: 'Latte',
    slug: 'latte',
    price: 32000,
    category: 'Hot Coffee',
    description: 'Kopi susu dengan tekstur lembut',
    stock: 40,
    image: '',
  },
];

// GET /api/products - Ambil semua produk
export async function GET() {
  return NextResponse.json({
    success: true,
    data: products,
  });
}

// POST /api/products - Tambah produk baru (untuk admin)
export async function POST(request: Request) {
  const body = await request.json();
  
  const newProduct = {
    id: products.length + 1,
    ...body,
    slug: body.name.toLowerCase().replace(/\s+/g, '-'),
  };

  products.push(newProduct);

  return NextResponse.json({
    success: true,
    data: newProduct,
  });
}
