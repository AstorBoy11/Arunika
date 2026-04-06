// User Schema untuk menyimpan data user dan alamat pengiriman
// Field diambil dari UserProfile dan Address UI

import mongoose, { Schema, Document } from "mongoose";

export interface IAddress {
  id: number;
  label: string;
  type: "home" | "office";
  recipient: string;
  street: string;
  city: string;
  province: string;
  postalCode?: string;
  phone: string;
  isDefault: boolean;
}

export interface IUser extends Document {
  name: string;
  email: string;
  phone: string;
  passwordHash?: string;
  role: "user" | "admin";
  addresses: IAddress[];
  createdAt: Date;
  updatedAt: Date;
}

const AddressSchema = new Schema<IAddress>({
  id: { type: Number, required: true },
  label: { type: String, required: true, trim: true },
  type: { type: String, enum: ["home", "office"], required: true },
  recipient: { type: String, required: true, trim: true },
  street: { type: String, required: true, trim: true },
  city: { type: String, required: true, trim: true },
  province: { type: String, required: true, trim: true },
  postalCode: { type: String, trim: true },
  phone: { type: String, required: true, trim: true },
  isDefault: { type: Boolean, default: false }
});

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, match: /^\S+@\S+\.\S+$/ },
    phone: { type: String, required: true, trim: true, default: "-" },
    passwordHash: { type: String, select: false },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    addresses: { type: [AddressSchema], default: [] },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
