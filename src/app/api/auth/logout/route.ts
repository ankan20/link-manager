// src/app/api/auth/logout/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logged out successfully" });
  response.cookies.set("token", "", { httpOnly: true, path: "/", maxAge: 0 });
  return response;
}
