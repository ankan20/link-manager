// src/app/api/auth/validate/route.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    // Access the cookies using `req.cookies`
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    const user = verifyToken(token);

    if (!user) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    return NextResponse.json({ message: "Authenticated", user }, { status: 200 });
  } catch (error) {
    console.error("Token validation error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
