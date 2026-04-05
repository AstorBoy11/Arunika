import { NextResponse } from "next/server";
import { z } from "zod";
import connectDB from "@/lib/mongodb";
import { Expense } from "@/lib/models";
import type { IExpense } from "@/lib/models";

type ApiResponse<T> = {
  success: boolean;
  data?: T;
  message?: string;
};

const createExpenseSchema = z.object({
  tanggal: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Tanggal harus format YYYY-MM-DD"),
  keterangan: z.string().min(3),
  nominal: z.number().min(1),
});

export async function GET() {
  try {
    await connectDB();

    const expenses = await Expense.find().sort({ tanggal: -1, createdAt: -1 });

    const response: ApiResponse<IExpense[]> = {
      success: true,
      data: expenses,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    const response: ApiResponse<null> = {
      success: false,
      message,
    };
    return NextResponse.json(response, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const body: unknown = await req.json();
    const parsed = createExpenseSchema.safeParse(body);

    if (!parsed.success) {
      const response: ApiResponse<null> = {
        success: false,
        message: "Validation error",
      };
      return NextResponse.json(response, { status: 400 });
    }

    const newExpense = await Expense.create({
      tanggal: new Date(parsed.data.tanggal),
      keterangan: parsed.data.keterangan,
      nominal: parsed.data.nominal,
    });

    const response: ApiResponse<IExpense> = {
      success: true,
      data: newExpense,
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    const response: ApiResponse<null> = {
      success: false,
      message,
    };
    return NextResponse.json(response, { status: 500 });
  }
}
