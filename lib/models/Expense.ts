// Expense Schema menyimpan catatan pengeluaran cafe (FinanceClient)

import mongoose, { Schema, Document } from "mongoose";

export interface IExpense extends Document {
  tanggal: Date;
  keterangan: string;
  nominal: number;
  createdAt: Date;
  updatedAt: Date;
}

const ExpenseSchema = new Schema<IExpense>(
  {
    tanggal: { type: Date, required: true },
    keterangan: { type: String, required: true, trim: true },
    nominal: { type: Number, required: true, min: 0 },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Expense || mongoose.model<IExpense>("Expense", ExpenseSchema);
