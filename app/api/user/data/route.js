const { getAuth } = require("@clerk/nextjs//server");
import connectDB from "@/config/db";
import User from "@/models/Users";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const userId = getAuth(request);
    await connectDB();
    const user = User.findById(userId);
    if (!user) {
      return NextResponse.json({
        success: false,
        message: "user Id not found",
      });
    }
    return NextResponse.json({ success: true, user });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
