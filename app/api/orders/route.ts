import { NextResponse } from "next/server";
import { z } from "zod";
import { Types } from "mongoose";
import connectDB from "@/lib/mongodb";
import { Order, Product } from "@/lib/models";
import type { IOrder } from "@/lib/models";
import { generateOrderNumber } from "@/lib/utils/orderNumber";

type ApiResponse<T> = {
  success: boolean;
  data?: T;
  message?: string;
};

const objectIdSchema = z
  .string()
  .regex(/^[a-f\d]{24}$/i, "Invalid MongoDB ObjectId");

const checkoutSchema = z.object({
  userId: objectIdSchema.optional(),
  items: z
    .array(
      z.object({
        productId: objectIdSchema,
        quantity: z.number().int().min(1),
      })
    )
    .min(1),
  shippingAddress: z.object({
    recipient: z.string().min(1),
    street: z.string().min(1),
    city: z.string().min(1),
    province: z.string().min(1),
    postalCode: z.string().min(1),
    phone: z.string().min(1),
  }),
  paymentMethod: z.enum(["cash", "qris"]),
});

const querySchema = z.object({
  userId: objectIdSchema.optional(),
  status: z.enum(["processing", "shipped", "delivered"]).optional(),
  paymentStatus: z.enum(["pending", "paid"]).optional(),
});

const SHIPPING_FEE = 15000;
const TAX_RATE = 0.11;

const toObjectId = (id: string): Types.ObjectId => new Types.ObjectId(id);

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const parsedQuery = querySchema.safeParse({
      userId: searchParams.get("userId") ?? undefined,
      status: searchParams.get("status") ?? undefined,
      paymentStatus: searchParams.get("paymentStatus") ?? undefined,
    });

    if (!parsedQuery.success) {
      const response: ApiResponse<null> = {
        success: false,
        message: "Validation error",
      };
      return NextResponse.json(response, { status: 400 });
    }

    const filter: {
      user?: Types.ObjectId;
      orderStatus?: "processing" | "shipped" | "delivered";
      paymentStatus?: "pending" | "paid";
    } = {};

    if (parsedQuery.data.userId) {
      filter.user = toObjectId(parsedQuery.data.userId);
    }
    if (parsedQuery.data.status) {
      filter.orderStatus = parsedQuery.data.status;
    }
    if (parsedQuery.data.paymentStatus) {
      filter.paymentStatus = parsedQuery.data.paymentStatus;
    }

    const orders = await Order.find(filter)
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

export async function POST(req: Request) {
  try {
    await connectDB();

    const body: unknown = await req.json();
    const parsed = checkoutSchema.safeParse(body);

    if (!parsed.success) {
      const response: ApiResponse<null> = {
        success: false,
        message: "Validation error",
      };
      return NextResponse.json(response, { status: 400 });
    }

    const { userId, items, shippingAddress, paymentMethod } = parsed.data;

    const groupedQuantities = new Map<string, number>();
    for (const item of items) {
      const previous = groupedQuantities.get(item.productId) ?? 0;
      groupedQuantities.set(item.productId, previous + item.quantity);
    }

    const productIds = Array.from(groupedQuantities.keys()).map((id) => toObjectId(id));
    const products = await Product.find({ _id: { $in: productIds } });
    const productsMap = new Map(products.map((product) => [String(product._id), product]));

    for (const productId of groupedQuantities.keys()) {
      if (!productsMap.has(productId)) {
        const response: ApiResponse<null> = {
          success: false,
          message: `Produk dengan id ${productId} tidak ditemukan`,
        };
        return NextResponse.json(response, { status: 400 });
      }
    }

    for (const [productId, quantity] of groupedQuantities.entries()) {
      const product = productsMap.get(productId);
      if (!product) {
        const response: ApiResponse<null> = {
          success: false,
          message: `Produk dengan id ${productId} tidak ditemukan`,
        };
        return NextResponse.json(response, { status: 400 });
      }

      if (product.stock < quantity) {
        const response: ApiResponse<null> = {
          success: false,
          message: `Stok produk ${product.name} tidak cukup`,
        };
        return NextResponse.json(response, { status: 400 });
      }
    }

    const orderItems = items.map((item) => {
      const product = productsMap.get(item.productId);
      if (!product) {
        throw new Error(`Produk dengan id ${item.productId} tidak ditemukan`);
      }

      return {
        product: product._id,
        name: product.name,
        roast: product.roast,
        price: product.price,
        image: product.image,
        quantity: item.quantity,
      };
    });

    const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = SHIPPING_FEE;
    const tax = Number((subtotal * TAX_RATE).toFixed(2));
    const total = Number((subtotal + shipping + tax).toFixed(2));

    const orderNumber = await generateOrderNumber();
    const decrementedItems: Array<{ productId: string; quantity: number }> = [];

    try {
      for (const [productId, quantity] of groupedQuantities.entries()) {
        const updatedProduct = await Product.findOneAndUpdate(
          {
            _id: toObjectId(productId),
            stock: { $gte: quantity },
          },
          { $inc: { stock: -quantity } },
          { new: true }
        );

        if (!updatedProduct) {
          throw new Error(`Stok produk dengan id ${productId} tidak cukup`);
        }

        decrementedItems.push({ productId, quantity });
      }

      const newOrder = await Order.create({
        orderNumber,
        user: userId ? toObjectId(userId) : undefined,
        items: orderItems,
        shippingAddress: {
          id: 1,
          label: "Alamat Pengiriman",
          type: "home",
          recipient: shippingAddress.recipient,
          street: shippingAddress.street,
          city: shippingAddress.city,
          province: shippingAddress.province,
          postalCode: shippingAddress.postalCode,
          phone: shippingAddress.phone,
          isDefault: true,
        },
        paymentMethod,
        paymentStatus: "pending",
        orderStatus: "processing",
        subtotal,
        shipping,
        tax,
        total,
      });

      const populatedOrder = await Order.findById(newOrder._id).populate("items.product");
      const response: ApiResponse<IOrder | null> = {
        success: true,
        data: populatedOrder,
      };

      return NextResponse.json(response, { status: 201 });
    } catch (transactionError: unknown) {
      for (const item of decrementedItems) {
        await Product.findByIdAndUpdate(item.productId, {
          $inc: { stock: item.quantity },
        });
      }

      const message =
        transactionError instanceof Error
          ? transactionError.message
          : "Gagal memproses checkout";
      const response: ApiResponse<null> = { success: false, message };
      return NextResponse.json(response, { status: 400 });
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    const response: ApiResponse<null> = { success: false, message };
    return NextResponse.json(response, { status: 500 });
  }
}