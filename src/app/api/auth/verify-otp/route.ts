// src/app/api/auth/verify-otp/route.ts
import { NextResponse } from "next/server";
import { authService } from "@/lib/services/auth-service";
import { validateCSRFToken } from "@/lib/utils/security";
export async function POST(req: Request) {
    try {
      const csrfToken = req.headers.get('x-csrf-token');
      if (!await validateCSRFToken(csrfToken)) {
        return new NextResponse("Invalid CSRF token", { status: 403 });
      }
  
      const { email, otp } = await req.json();
      const user = await authService.verifyEmailOTP(email, otp);
  
      if (!user) {
        return new NextResponse("Invalid OTP", { status: 400 });
      }
  
      return NextResponse.json({ userId: user.id });
    } catch (error) {
      return new NextResponse("Internal Error", { status: 500 });
    }
  }