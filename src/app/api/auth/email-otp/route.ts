// src/app/api/auth/email-otp/route.ts
import { NextResponse } from "next/server";
import { authService } from "@/lib/services/auth-service";
import { validateCSRFToken } from "@/lib/utils/security";

export async function POST(req: Request) {
  try {
    const csrfToken = req.headers.get('x-csrf-token');
    if (!await validateCSRFToken(csrfToken)) {
      return new NextResponse("Invalid CSRF token", { status: 403 });
    }

    const { email } = await req.json();
    const sent = await authService.generateEmailOTP(email);

    if (!sent) {
      return new NextResponse("User not found", { status: 404 });
    }

    return NextResponse.json({ message: "OTP sent successfully" });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}