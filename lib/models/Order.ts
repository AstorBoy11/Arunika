// Order Schema menyimpan riwayat transaksi dari checkout (Cart)
// Menyertakan data snapshot produk dan alamat pengiriman di saat checkout

import mongoose, { Schema, Document, Types } from "mongoose";
import { IAddress } from "./User";

export interface IOrderItem {
  product: Types.ObjectId;
  name: string;
  roast?: string;
  price: number;
  image: string;
  quantity: number;
}

export interface IOrder extends Document {
  orderNumber: string;
  user?: Types.ObjectId; // Jika guest checkout, bisa null
  items: IOrderItem[];
  shippingAddress: IAddress;
  paymentMethod: "cash" | "qris";
  paymentStatus: "pending" | "paid";
  orderStatus: "processing" | "shipped" | "delivered" | "cancelled";
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  name: { type: String, required: true },
  roast: { type: String },
  price: { type: Number, required: true, min: 0 },
  image: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
});

// Menyalin Schema Address secara terpisah agar snapshot data aman jika user update profil
const OrderAddressSchema = new Schema<IAddress>({
  id: { type: Number, required: true },
  label: { type: String, required: true },
  type: { type: String, enum: ["home", "office"], required: true },
  recipient: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  province: { type: String, required: true },
  postalCode: { type: String },
  phone: { type: String, required: true },
  isDefault: { type: Boolean, default: false }
});

const OrderSchema = new Schema<IOrder>(
  {
    orderNumber: { type: String, required: true, unique: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    items: { type: [OrderItemSchema], required: true },
    shippingAddress: { type: OrderAddressSchema, required: true },
    paymentMethod: { type: String, enum: ["cash", "qris"], required: true },
    paymentStatus: { type: String, enum: ["pending", "paid"], default: "pending" },
    orderStatus: { type: String, enum: ["processing", "shipped", "delivered", "cancelled"], default: "processing" },
    subtotal: { type: Number, required: true, min: 0 },
    shipping: { type: Number, required: true, min: 0 },
    tax: { type: Number, required: true, min: 0 },
    total: { type: Number, required: true, min: 0 },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);
