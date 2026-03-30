import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/lib/models/Product";

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find({}).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error("GET /api/products error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal mengambil data produk",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const newProduct = await Product.create(body);

    return NextResponse.json(
      {
        success: true,
        data: newProduct,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/products error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal membuat produk baru",
      },
      { status: 500 }
    );
  }
}
