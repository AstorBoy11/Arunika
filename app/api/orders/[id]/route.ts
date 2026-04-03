import { NextResponse } from "next/server";
import { z } from "zod";
import { Types } from "mongoose";
import connectDB from "@/lib/mongodb";
import { Order, Product } from "@/lib/models";
import type { IOrder } from "@/lib/models";

type ApiResponse<T> = {
  success: boolean;
  data?: T;
  message?: string;
};

const updateOrderSchema = z
  .object({
    orderStatus: z.enum(["processing", "shipped", "delivered"]).optional(),
    paymentStatus: z.enum(["pending", "paid"]).optional(),
  })
  .refine((value) => Object.keys(value).length > 0, {
    message: "Tidak ada field yang diupdate",
  });

const isValidObjectId = (id: string): boolean => Types.ObjectId.isValid(id);

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;

    if (!isValidObjectId(id)) {
      const response: ApiResponse<null> = {
        success: false,
        message: "ID order tidak valid",
      };
      return NextResponse.json(response, { status: 400 });
    }

    const order = await Order.findById(id).populate("items.product");

    if (!order) {
      const response: ApiResponse<null> = {
        success: false,
        message: "Order tidak ditemukan",
      };
      return NextResponse.json(response, { status: 404 });
    }

    const response: ApiResponse<IOrder> = {
      success: true,
      data: order,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    const response: ApiResponse<null> = { success: false, message };
    return NextResponse.json(response, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;

    if (!isValidObjectId(id)) {
      const response: ApiResponse<null> = {
        success: false,
        message: "ID order tidak valid",
      };
      return NextResponse.json(response, { status: 400 });
    }

    const body: unknown = await req.json();
    const parsed = updateOrderSchema.safeParse(body);

    if (!parsed.success) {
      const response: ApiResponse<null> = {
        success: false,
        message: "Validation error",
      };
      return NextResponse.json(response, { status: 400 });
    }

    const updatedOrder = await Order.findByIdAndUpdate(id, parsed.data, {
      new: true,
      runValidators: true,
    }).populate("items.product");

    if (!updatedOrder) {
      const response: ApiResponse<null> = {
        success: false,
        message: "Order tidak ditemukan",
      };
      return NextResponse.json(response, { status: 404 });
    }

    const response: ApiResponse<IOrder> = {
      success: true,
      data: updatedOrder,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    const response: ApiResponse<null> = { success: false, message };
    return NextResponse.json(response, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;

    if (!isValidObjectId(id)) {
      const response: ApiResponse<null> = {
        success: false,
        message: "ID order tidak valid",
      };
      return NextResponse.json(response, { status: 400 });
    }

    const order = await Order.findById(id);

    if (!order) {
      const response: ApiResponse<null> = {
        success: false,
        message: "Order tidak ditemukan",
      };
      return NextResponse.json(response, { status: 404 });
    }

    try {
      const quantityByProduct = new Map<string, number>();
      for (const item of order.items) {
        const productId = String(item.product);
        const current = quantityByProduct.get(productId) ?? 0;
        quantityByProduct.set(productId, current + item.quantity);
      }

      for (const [productId, quantity] of quantityByProduct.entries()) {
        await Product.findByIdAndUpdate(
          productId,
          { $inc: { stock: quantity } },
          { new: true }
        );
      }

      await Order.findByIdAndDelete(id);

      const response: ApiResponse<null> = {
        success: true,
        message: "Order berhasil dihapus",
      };

      return NextResponse.json(response, { status: 200 });
    } catch (transactionError: unknown) {
      const message =
        transactionError instanceof Error
          ? transactionError.message
          : "Gagal menghapus order";
      const response: ApiResponse<null> = { success: false, message };
      return NextResponse.json(response, { status: 500 });
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    const response: ApiResponse<null> = { success: false, message };
    return NextResponse.json(response, { status: 500 });
  }
}