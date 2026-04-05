import mongoose, { Schema, Document } from "mongoose";

export interface IProductCategory extends Document {
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductCategorySchema = new Schema<IProductCategory>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.ProductCategory || mongoose.model<IProductCategory>("ProductCategory", ProductCategorySchema);
