import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Product, ProductCategory } from "@/lib/models";

type CategoryPayload = {
  name?: string;
  description?: string;
};

export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const withMeta = searchParams.get("withMeta") === "true";

    const managedCategories = await ProductCategory.find({}).sort({ name: 1 }).lean();

    if (withMeta) {
      return NextResponse.json(
        {
          success: true,
          data: managedCategories.map((category) => ({
            _id: String(category._id),
            name: category.name,
            description: category.description ?? "",
          })),
        },
        { status: 200 }
      );
    }

    if (managedCategories.length > 0) {
      return NextResponse.json(
        {
          success: true,
          data: managedCategories.map((category) => category.name),
        },
        { status: 200 }
      );
    }

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

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = (await request.json()) as CategoryPayload;
    const name = body.name?.trim();
    const description = body.description?.trim() ?? "";

    if (!name) {
      return NextResponse.json(
        { success: false, message: "Nama kategori wajib diisi" },
        { status: 400 }
      );
    }

    const existing = await ProductCategory.findOne({
      name: { $regex: `^${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, $options: "i" },
    }).lean();

    if (existing) {
      return NextResponse.json(
        { success: false, message: "Kategori sudah ada" },
        { status: 409 }
      );
    }

    const created = await ProductCategory.create({ name, description });

    return NextResponse.json(
      {
        success: true,
        data: {
          _id: String(created._id),
          name: created.name,
          description: created.description ?? "",
        },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";

    console.error("POST /api/products/categories error:", error);
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
