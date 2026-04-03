import { NextResponse } from "next/server";
import { Types } from "mongoose";
import connectDB from "@/lib/mongodb";
import { Order } from "@/lib/models";
import type { IOrder } from "@/lib/models";

type ApiResponse<T> = {
  success: boolean;
  data?: T;
  message?: string;
};

const isValidObjectId = (id: string): boolean => Types.ObjectId.isValid(id);

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    await connectDB();
    const { userId } = await params;

    if (!isValidObjectId(userId)) {
      const response: ApiResponse<null> = {
        success: false,
        message: "ID user tidak valid",
      };
      return NextResponse.json(response, { status: 400 });
    }

    const orders = await Order.find({ user: new Types.ObjectId(userId) })
      .populate("items.product")
      .sort({ createdAt: -1 });

    const response: ApiResponse<IOrder[]> = {
      success: true,
      data: orders,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    const response: ApiResponse<null> = { success: false, message };
    return NextResponse.json(response, { status: 500 });
  }
}