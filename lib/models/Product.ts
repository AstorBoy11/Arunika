import mongoose, { Model, Schema } from "mongoose";

export interface IProduct {
  name: string;
  category: string;
  stock: number;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    price: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product: Model<IProduct> =
  (mongoose.models.Product as Model<IProduct>) ||
  mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
