import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Product } from "@/lib/models";
import { z } from "zod";

const productSchema = z.object({
  name: z.string().min(2),
  category: z.string().min(1),
  price: z.number().nonnegative(),
  stock: z.number().nonnegative(),
  shortDescription: z.string().min(1),
  longDescription: z.string().min(1),
  badge: z.string().optional(),
  rating: z.number().min(0).max(5).optional(),
  image: z.string().url(),
  roast: z.string().optional(),
});

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const badge = searchParams.get("badge");

    const query: {
      category?: string;
      badge?: string;
      name?: { $regex: string; $options: string };
    } = {};

    if (category) {
      query.category = category;
    }
    if (badge) {
      query.badge = badge;
    }
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    const products = await Product.find(query);
    
    return NextResponse.json({ success: true, data: products }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    console.error("GET /api/products error:", error);
    return NextResponse.json(
      { success: false, message },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const parsed = productSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Validation error", error: parsed.error.format() },
        { status: 400 }
      );
    }

    const newProduct = await Product.create(parsed.data);

    return NextResponse.json({ success: true, data: newProduct }, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    console.error("POST /api/products error:", error);
    return NextResponse.json(
      { success: false, message },
      { status: 500 }
    );
  }
}
