import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import User from "@/lib/models/User";
import { checkRateLimit } from "@/lib/auth/rate-limit";

const registerSchema = z.object({
  name: z.string().trim().min(2, "Nama minimal 2 karakter"),
  email: z.string().trim().email("Format email tidak valid"),
  password: z
    .string()
    .min(8, "Password minimal 8 karakter")
    .regex(/[A-Z]/, "Password harus mengandung huruf kapital")
    .regex(/[0-9]/, "Password harus mengandung angka"),
});

type ApiResponse = {
  success: boolean;
  message: string;
};

export async function POST(request: Request) {
  try {
    const forwardedFor = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    const ip = (forwardedFor?.split(",")[0]?.trim() || realIp || "unknown").trim();

    const registerLimit = checkRateLimit(`register:${ip}`, {
      maxAttempts: 3,
      windowMs: 60 * 60 * 1000,
    });

    if (!registerLimit.allowed) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Terlalu banyak percobaan registrasi.",
        },
        { status: 429 }
      );
    }

    const body: unknown = await request.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: parsed.error.issues[0]?.message ?? "Validasi gagal",
        },
        { status: 400 }
      );
    }

    const name = parsed.data.name.trim();
    const email = parsed.data.email.trim().toLowerCase();
    const password = parsed.data.password;

    await connectDB();

    const existing = await User.findOne({ email }).lean();
    if (existing) {
      return NextResponse.json<ApiResponse>(
        { success: false, message: "Email sudah terdaftar" },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await User.create({
      name,
      email,
      passwordHash,
      role: "user",
    });

    return NextResponse.json<ApiResponse>(
      { success: true, message: "Registrasi berhasil" },
      { status: 201 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";

    return NextResponse.json<ApiResponse>(
      { success: false, message },
      { status: 500 }
    );
  }
}
