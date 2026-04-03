import { NextResponse } from "next/server";
import { z } from "zod";
import connectDB from "@/lib/mongodb";
import { User } from "@/lib/models";
import type { IAddress, IUser } from "@/lib/models";

type AddressSubdoc = IAddress & { toObject: () => IAddress };

const createAddressSchema = z.object({
  label: z.string().min(1),
  type: z.enum(["home", "office"]),
  recipient: z.string().min(2),
  street: z.string().min(5),
  city: z.string().min(2),
  province: z.string().min(2),
  postalCode: z.string(),
  phone: z.string().min(8),
  isDefault: z.boolean().optional().default(false),
});

type ApiResponse<T> = {
  success: boolean;
  data?: T;
  message?: string;
};

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;

    const user = await User.findById(id);

    if (!user) {
      const response: ApiResponse<null> = {
        success: false,
        message: "User tidak ditemukan",
      };
      return NextResponse.json(response, { status: 404 });
    }

    const response: ApiResponse<IAddress[]> = {
      success: true,
      data: user.addresses,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    const response: ApiResponse<null> = { success: false, message };
    return NextResponse.json(response, { status: 500 });
  }
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;

    const user = await User.findById(id);

    if (!user) {
      const response: ApiResponse<null> = {
        success: false,
        message: "User tidak ditemukan",
      };
      return NextResponse.json(response, { status: 404 });
    }

    const body: unknown = await req.json();
    const parsed = createAddressSchema.safeParse(body);

    if (!parsed.success) {
      const response: ApiResponse<null> = {
        success: false,
        message: "Validation error",
      };
      return NextResponse.json(response, { status: 400 });
    }

    const lastId = user.addresses.reduce(
      (maxId: number, addr: AddressSubdoc) => (addr.id > maxId ? addr.id : maxId),
      0
    );
    const nextId = lastId + 1;

    let nextIsDefault = parsed.data.isDefault;
    if (user.addresses.length === 0) {
      nextIsDefault = true;
    }

    if (nextIsDefault) {
      user.addresses = user.addresses.map((addr: AddressSubdoc) => ({ ...addr.toObject(), isDefault: false }));
    }

    user.addresses.push({
      ...parsed.data,
      id: nextId,
      isDefault: nextIsDefault,
    });

    await user.save();

    const response: ApiResponse<IUser> = {
      success: true,
      data: user,
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    const response: ApiResponse<null> = { success: false, message };
    return NextResponse.json(response, { status: 500 });
  }
}
