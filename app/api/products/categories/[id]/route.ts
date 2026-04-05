import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Product, ProductCategory } from "@/lib/models";

type CategoryPayload = {
  name?: string;
  description?: string;
};

const escapeRegex = (value: string): string => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await context.params;
    const body = (await request.json()) as CategoryPayload;
    const nextName = body.name?.trim();
    const nextDescription = body.description?.trim() ?? "";

    if (!nextName) {
      return NextResponse.json(
        { success: false, message: "Nama kategori wajib diisi" },
        { status: 400 }
      );
    }

    const category = await ProductCategory.findById(id);
    if (!category) {
      return NextResponse.json(
        { success: false, message: "Kategori tidak ditemukan" },
        { status: 404 }
      );
    }

    const duplicate = await ProductCategory.findOne({
      _id: { $ne: id },
      name: { $regex: `^${escapeRegex(nextName)}$`, $options: "i" },
    }).lean();

    if (duplicate) {
      return NextResponse.json(
        { success: false, message: "Kategori sudah ada" },
        { status: 409 }
      );
    }

    const previousName = category.name;
    category.name = nextName;
    category.description = nextDescription;
    await category.save();

    if (previousName !== nextName) {
      await Product.updateMany({ category: previousName }, { $set: { category: nextName } });
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          _id: String(category._id),
          name: category.name,
          description: category.description ?? "",
        },
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";

    console.error("PATCH /api/products/categories/[id] error:", error);
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

export async function DELETE(
  _: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await context.params;
    const category = await ProductCategory.findById(id);

    if (!category) {
      return NextResponse.json(
        { success: false, message: "Kategori tidak ditemukan" },
        { status: 404 }
      );
    }

    const categoryName = category.name;

    await Product.updateMany({ category: categoryName }, { $set: { category: "Uncategorized" } });
    await ProductCategory.deleteOne({ _id: id });

    return NextResponse.json({ success: true, data: { movedTo: "Uncategorized" } }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";

    console.error("DELETE /api/products/categories/[id] error:", error);
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
