// src/app/api/auth/signup/route.ts
import { NextRequest, NextResponse } from "next/server";
import { authService } from "@/lib/services/auth-service";
import { 
  validateCSRFToken, 
  validateRequestOrigin, 
  isStrongPassword,
  sanitizeInput,
  securityHeaders 
} from "@/lib/utils/security";

export async function POST(request: NextRequest) {
  try {
    // Validate CSRF token
    const csrfToken = request.headers.get('x-csrf-token');
    const isValidToken = await validateCSRFToken(csrfToken);
    if (!isValidToken) {
        return NextResponse.json(
            { error: "Invalid CSRF token" },
            { 
              status: 403,
              headers: securityHeaders 
            }
        );
    }

    // Validate request origin
    if (!validateRequestOrigin(request)) {
        return NextResponse.json(
            { error: "Invalid origin" },
            { 
              status: 400,
              headers: securityHeaders 
            }
          );
    }

    const { name, email, mobile, password } = await request.json();

    // Validate input
    if (!name || !password || (!email && !mobile)) {
        return NextResponse.json(
            { error: "Missing required fields" },
            { 
              status: 400,
              headers: securityHeaders 
            }
          );
    }

    // Validate password strength
    if (!isStrongPassword(password)) {
        return NextResponse.json(
            { 
              error: "Password must be at least 8 characters and include uppercase, lowercase, numbers, and special characters"
            },
            { 
              status: 400,
              headers: securityHeaders 
            }
          );
    }

    // Sanitize inputs
    const sanitizedName = sanitizeInput(name);

    const user = await authService.createUser({
      name: sanitizedName,
      email,
      mobile,
      password,
    });

    return NextResponse.json(
        {
          message: "Verification sent to email/mobile",
          userId: user.id,
        },
        { 
          status: 200,
          headers: securityHeaders 
        }
      );
  } catch (error: any) {
    console.error("[SIGNUP_ERROR]", error);
    
    if (error.code === 'P2002') {
        return NextResponse.json(
            { error: "Email or mobile already exists" },
            { 
              status: 400,
              headers: securityHeaders 
            }
          );
    }
  
    return NextResponse.json(
        { error: "Internal Server Error" },
        { 
          status: 500,
          headers: securityHeaders 
        }
    );
  }
}



// // src/app/api/auth/signup/route.ts
// import { NextResponse } from "next/server";
// import { authService } from "@/lib/services/auth-service";
// import { validateCSRFToken } from "@/lib/utils/security";

// export async function POST(req: Request) {
//   try {
//     // Validate CSRF token
//     const csrfToken = req.headers.get('x-csrf-token');
//     if (!await validateCSRFToken(csrfToken)) {
//       return new NextResponse("Invalid CSRF token", { status: 403 });
//     }

//     const { name, email, mobile, password } = await req.json();

//     if (!name || !password || (!email && !mobile)) {
//       return new NextResponse("Missing required fields", { status: 400 });
//     }

//     const user = await authService.createUser({
//       name,
//       email,
//       mobile,
//       password,
//     });

//     return NextResponse.json({
//       message: "Verification sent to email/mobile",
//       userId: user.id,
//     });
//   } catch (error: any) {
//     if (error.code === 'P2002') {
//       return new NextResponse("Email or mobile already exists", { status: 400 });
//     }
//     return new NextResponse("Internal Error", { status: 500 });
//   }
// }