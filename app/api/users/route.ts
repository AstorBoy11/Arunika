import { NextResponse } from "next/server";
import { z } from "zod";
import connectDB from "@/lib/mongodb";
import { User } from "@/lib/models";
import type { IUser } from "@/lib/models";

const createUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
});

type ApiResponse<T> = {
  success: boolean;
  data?: T;
  message?: string;
};

const isMongoDuplicateError = (error: unknown): error is { code: number } =>
  typeof error === "object" && error !== null && "code" in error && (error as { code: number }).code === 11000;

export async function GET() {
  try {
    await connectDB();

    const users = await User.find({}).sort({ createdAt: -1 });

    const response: ApiResponse<IUser[]> = {
      success: true,
      data: users,
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
    const parsed = createUserSchema.safeParse(body);

    if (!parsed.success) {
      const response: ApiResponse<null> = {
        success: false,
        message: "Validation error",
      };
      return NextResponse.json(response, { status: 400 });
    }

    const existing = await User.findOne({ email: parsed.data.email });
    if (existing) {
      const response: ApiResponse<null> = {
        success: false,
        message: "Email sudah terdaftar",
      };
      return NextResponse.json(response, { status: 409 });
    }

    const newUser = await User.create(parsed.data);

    const response: ApiResponse<IUser> = {
      success: true,
      data: newUser,
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error: unknown) {
    if (isMongoDuplicateError(error)) {
      const response: ApiResponse<null> = {
        success: false,
        message: "Email sudah terdaftar",
      };
      return NextResponse.json(response, { status: 409 });
    }

    const message = error instanceof Error ? error.message : "Internal Server Error";
    const response: ApiResponse<null> = { success: false, message };
    return NextResponse.json(response, { status: 500 });
  }
}
