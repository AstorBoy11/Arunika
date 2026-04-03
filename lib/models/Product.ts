// Product Schema untuk menyimpan katalog kopi dan barang di toko
// Field diambil dari DashboardClient, UI Cart, dan InventoryClient

import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  category: string;
  price: number;
  stock: number;
  shortDescription: string;
  longDescription: string;
  badge?: string;
  rating?: number;
  image: string;
  roast?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0 },
    shortDescription: { type: String, required: true, trim: true },
    longDescription: { type: String, required: true, trim: true },
    badge: { type: String }, // optional, e.g., "Best Seller", "Baru"
    rating: { type: Number, default: 0, min: 0, max: 5 },
    image: { type: String, required: true, match: /^https?:\/\/.+/ },
    roast: { type: String }, // optional, e.g., "Light Roast", "Espresso"
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
