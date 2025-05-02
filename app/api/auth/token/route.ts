import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  
  if (token) {
    return NextResponse.json({ token });
  } else {
    return NextResponse.json({ error: "No token found" }, { status: 401 });
  }
}