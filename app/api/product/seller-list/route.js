import { products } from "@/assets/productData";
import connectDB from "@/config/db";
import authSeller from "@/lib/authSeller";
import Product from "@/models/Product";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { userId } = getAuth();
  const isSeller = authSeller(userId);
  if (!isSeller) {
    return NextResponse.json({
      success: false,
      message: "not authorized",
    });
  }
  await connectDB();
  const products = await Product.find({});
  return NextResponse.json({ success: true, products });
}
