import mongoose, { Schema, model, models } from "mongoose";

export interface IProduct {
  name: string;
  category: string;
  price: number;
  stock: number;
  unit: string;
  status: "available" | "low" | "out_of_stock";
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, "Please provide a name for this product."],
      maxlength: [60, "Name cannot be more than 60 characters"],
    },
    category: {
      type: String,
      required: [true, "Please provide a category."],
    },
    price: {
      type: Number,
      required: [true, "Please provide a price."],
    },
    stock: {
      type: Number,
      default: 0,
    },
    unit: {
      type: String,
      default: "units",
    },
    status: {
      type: String,
      enum: ["available", "low", "out_of_stock"],
      default: "available",
    },
  },
  {
    timestamps: true,
  }
);

const Product = models.Product || model<IProduct>("Product", ProductSchema);

export default Product;
