import authSeller from "@/lib/authSeller";
import { getAuth } from "@clerk/nextjs/server";

export default async function DELTE(request) {
  const { userId } = getAuth(request);
  const isSeller = await authSeller(userId);

  if (!isSeller) {
    return NextResponse.json({
      success: false,
      message: "not authorized",
    });
  }
}
