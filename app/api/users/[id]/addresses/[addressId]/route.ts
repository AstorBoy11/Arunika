import { NextResponse } from "next/server";
import { z } from "zod";
import connectDB from "@/lib/mongodb";
import { User } from "@/lib/models";
import type { IAddress, IUser } from "@/lib/models";

type AddressSubdoc = IAddress & { toObject: () => IAddress };

const updateAddressSchema = z.object({
  label: z.string().min(1).optional(),
  type: z.enum(["home", "office"]).optional(),
  recipient: z.string().min(2).optional(),
  street: z.string().min(5).optional(),
  city: z.string().min(2).optional(),
  province: z.string().min(2).optional(),
  postalCode: z.string().optional(),
  phone: z.string().min(8).optional(),
  isDefault: z.boolean().optional(),
});

type ApiResponse<T> = {
  success: boolean;
  data?: T;
  message?: string;
};

const parseAddressId = (rawId: string): number | null => {
  const parsed = Number.parseInt(rawId, 10);
  return Number.isNaN(parsed) ? null : parsed;
};

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string; addressId: string }> }
) {
  try {
    await connectDB();
    const { id, addressId } = await params;

    const numericAddressId = parseAddressId(addressId);
    if (numericAddressId === null) {
      const response: ApiResponse<null> = {
        success: false,
        message: "addressId tidak valid",
      };
      return NextResponse.json(response, { status: 400 });
    }

    const body: unknown = await req.json();
    const parsed = updateAddressSchema.safeParse(body);

    if (!parsed.success) {
      const response: ApiResponse<null> = {
        success: false,
        message: "Validation error",
      };
      return NextResponse.json(response, { status: 400 });
    }

    const user = await User.findById(id);
    if (!user) {
      const response: ApiResponse<null> = {
        success: false,
        message: "User tidak ditemukan",
      };
      return NextResponse.json(response, { status: 404 });
    }

    const targetIndex = user.addresses.findIndex((addr: AddressSubdoc) => addr.id === numericAddressId);
    if (targetIndex === -1) {
      const response: ApiResponse<null> = {
        success: false,
        message: "Alamat tidak ditemukan",
      };
      return NextResponse.json(response, { status: 404 });
    }

    if (parsed.data.isDefault === true) {
      user.addresses = user.addresses.map((addr: AddressSubdoc) => ({ ...addr.toObject(), isDefault: false }));
    }

    const target = user.addresses[targetIndex];
    target.label = parsed.data.label ?? target.label;
    target.type = parsed.data.type ?? target.type;
    target.recipient = parsed.data.recipient ?? target.recipient;
    target.street = parsed.data.street ?? target.street;
    target.city = parsed.data.city ?? target.city;
    target.province = parsed.data.province ?? target.province;
    target.postalCode = parsed.data.postalCode ?? target.postalCode;
    target.phone = parsed.data.phone ?? target.phone;
    if (typeof parsed.data.isDefault === "boolean") {
      target.isDefault = parsed.data.isDefault;
    }

    await user.save();

    const response: ApiResponse<IUser> = {
      success: true,
      data: user,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    const response: ApiResponse<null> = { success: false, message };
    return NextResponse.json(response, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string; addressId: string }> }
) {
  try {
    await connectDB();
    const { id, addressId } = await params;

    const numericAddressId = parseAddressId(addressId);
    if (numericAddressId === null) {
      const response: ApiResponse<null> = {
        success: false,
        message: "addressId tidak valid",
      };
      return NextResponse.json(response, { status: 400 });
    }

    const user = await User.findById(id);
    if (!user) {
      const response: ApiResponse<null> = {
        success: false,
        message: "User tidak ditemukan",
      };
      return NextResponse.json(response, { status: 404 });
    }

    const targetIndex = user.addresses.findIndex((addr: AddressSubdoc) => addr.id === numericAddressId);
    if (targetIndex === -1) {
      const response: ApiResponse<null> = {
        success: false,
        message: "Alamat tidak ditemukan",
      };
      return NextResponse.json(response, { status: 404 });
    }

    const removedWasDefault = user.addresses[targetIndex].isDefault;
    user.addresses.splice(targetIndex, 1);

    if (removedWasDefault && user.addresses.length > 0) {
      user.addresses = user.addresses.map((addr: AddressSubdoc, index: number) => ({
        ...addr.toObject(),
        isDefault: index === 0,
      }));
    }

    await user.save();

    const response: ApiResponse<IUser> = {
      success: true,
      data: user,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    const response: ApiResponse<null> = { success: false, message };
    return NextResponse.json(response, { status: 500 });
  }
}
