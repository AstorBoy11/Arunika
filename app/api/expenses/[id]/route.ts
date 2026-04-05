import { NextResponse } from "next/server";
import { Types } from "mongoose";
import { z } from "zod";
import connectDB from "@/lib/mongodb";
import { Expense } from "@/lib/models";
import type { IExpense } from "@/lib/models";

type ApiResponse<T> = {
  success: boolean;
  data?: T;
  message?: string;
};

const isValidObjectId = (id: string): boolean => Types.ObjectId.isValid(id);

const updateExpenseSchema = z
  .object({
    tanggal: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Tanggal harus format YYYY-MM-DD").optional(),
    keterangan: z.string().min(3).optional(),
    nominal: z.number().min(1).optional(),
  })
  .refine((value) => Object.keys(value).length > 0, {
    message: "Tidak ada field yang diupdate",
  });

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;

    if (!isValidObjectId(id)) {
      const response: ApiResponse<null> = {
        success: false,
        message: "ID pengeluaran tidak valid",
      };
      return NextResponse.json(response, { status: 400 });
    }

    const deletedExpense = await Expense.findByIdAndDelete(id);

    if (!deletedExpense) {
      const response: ApiResponse<null> = {
        success: false,
        message: "Pengeluaran tidak ditemukan",
      };
      return NextResponse.json(response, { status: 404 });
    }

    const response: ApiResponse<null> = {
      success: true,
      message: "Pengeluaran berhasil dihapus",
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

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;

    if (!isValidObjectId(id)) {
      const response: ApiResponse<null> = {
        success: false,
        message: "ID pengeluaran tidak valid",
      };
      return NextResponse.json(response, { status: 400 });
    }

    const body: unknown = await req.json();
    const parsed = updateExpenseSchema.safeParse(body);

    if (!parsed.success) {
      const response: ApiResponse<null> = {
        success: false,
        message: "Validation error",
      };
      return NextResponse.json(response, { status: 400 });
    }

    const payload: {
      tanggal?: Date;
      keterangan?: string;
      nominal?: number;
    } = {};

    if (parsed.data.tanggal) {
      payload.tanggal = new Date(parsed.data.tanggal);
    }
    if (parsed.data.keterangan !== undefined) {
      payload.keterangan = parsed.data.keterangan;
    }
    if (parsed.data.nominal !== undefined) {
      payload.nominal = parsed.data.nominal;
    }

    const updatedExpense = await Expense.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });

    if (!updatedExpense) {
      const response: ApiResponse<null> = {
        success: false,
        message: "Pengeluaran tidak ditemukan",
      };
      return NextResponse.json(response, { status: 404 });
    }

    const response: ApiResponse<IExpense> = {
      success: true,
      data: updatedExpense,
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
