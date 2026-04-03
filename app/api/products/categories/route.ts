import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Product } from "@/lib/models";

export async function GET() {
  try {
    await connectDB();

    const categories = await Product.distinct("category");

    return NextResponse.json(
      { success: true, data: categories as string[] },
      { status: 200 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";

    console.error("GET /api/products/categories error:", error);
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
