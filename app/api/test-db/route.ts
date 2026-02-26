import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET() {
  try {
    await dbConnect();
    
    // Just a simple check, find one product (even if none exist, the connection check is enough)
    const products = await Product.find({}).limit(1);
    
    return NextResponse.json({ 
      success: true, 
      message: "Connected to MongoDB successfully!",
      data: products 
    });
  } catch (error: any) {
    console.error("Database connection error:", error);
    return NextResponse.json({ 
      success: false, 
      message: "Failed to connect to MongoDB", 
      error: error.message 
    }, { status: 500 });
  }
}
