// src/app/api/auth/csrf/route.ts
import { NextRequest, NextResponse } from "next/server";
import { generateCSRFToken } from "@/lib/utils/security";

export async function GET(request: NextRequest) {
  try {
    const token = await generateCSRFToken();
    return NextResponse.json({ token });
  } catch (error) {
    console.error("[CSRF_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to generate CSRF token" },
      { status: 500 }
    );
  }
}
