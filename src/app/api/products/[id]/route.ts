import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  // Simulasi get product by ID
  const product = {
    id: parseInt(params.id),
    name: 'Espresso',
    slug: 'espresso',
    price: 25000,
    category: 'Hot Coffee',
    description: 'Kopi hitam pekat dengan cita rasa kuat',
    stock: 50,
    image: '',
  };

  return NextResponse.json({
    success: true,
    data: product,
  });
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  
  return NextResponse.json({
    success: true,
    data: { id: parseInt(params.id), ...body },
  });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  return NextResponse.json({
    success: true,
    message: `Product ${params.id} deleted`,
  });
}
