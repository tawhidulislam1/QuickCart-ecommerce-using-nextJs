import connectDB from "@/config/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(request) {
  await connectDB();
  const products = await Product.find({});
  return NextResponse.json({ success: true, products });
}
