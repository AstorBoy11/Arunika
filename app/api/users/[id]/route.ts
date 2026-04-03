import { NextResponse } from "next/server";
import { z } from "zod";
import connectDB from "@/lib/mongodb";
import { User } from "@/lib/models";
import type { IUser } from "@/lib/models";

const updateUserSchema = z.object({
  name: z.string().min(2).optional(),
  phone: z.string().min(8).optional(),
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

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;

    const body: unknown = await req.json();

    if (
      typeof body === "object" &&
      body !== null &&
      "email" in body
    ) {
      const response: ApiResponse<null> = {
        success: false,
        message: "Email tidak boleh diubah",
      };
      return NextResponse.json(response, { status: 400 });
    }

    const parsed = updateUserSchema.safeParse(body);
    if (!parsed.success) {
      const response: ApiResponse<null> = {
        success: false,
        message: "Validation error",
      };
      return NextResponse.json(response, { status: 400 });
    }

    const updatedUser = await User.findByIdAndUpdate(id, parsed.data, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      const response: ApiResponse<null> = {
        success: false,
        message: "User tidak ditemukan",
      };
      return NextResponse.json(response, { status: 404 });
    }

    const response: ApiResponse<IUser> = {
      success: true,
      data: updatedUser,
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

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      const response: ApiResponse<null> = {
        success: false,
        message: "User tidak ditemukan",
      };
      return NextResponse.json(response, { status: 404 });
    }

    const response: ApiResponse<null> = {
      success: true,
      message: "User berhasil dihapus",
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    const response: ApiResponse<null> = { success: false, message };
    return NextResponse.json(response, { status: 500 });
  }
}
