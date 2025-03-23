// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { validateCSRFToken } from "@/lib/utils/security";

export async function middleware(request: NextRequest) {
  try {
    const path = request.nextUrl.pathname;
    // Skip CSRF check for CSRF token endpoint and non-POST requests
    if (path === '/api/auth/csrf' || request.method === 'GET') {
      return NextResponse.next();
    }

    // CSRF validation for API routes
    if (path.startsWith('/api/') && request.method !== 'GET') {
      const csrfToken = request.headers.get('x-csrf-token');
      const isValid = await validateCSRFToken(csrfToken);
      if (!isValid) {
        return NextResponse.json(
          { message: 'Invalid CSRF token' },
          { status: 403 }
        );
      }
    }

    // Auth redirects
    const isPublicPath = path === '/signin' || path === '/signup';
    const token = request.cookies.get('user')?.value;
    if (isPublicPath && token) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    if (!isPublicPath && !token) {
      return NextResponse.redirect(new URL('/signin', request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error('[Middleware Error]:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
  
}

export const config = {
  matcher: [
    '/',
    '/signin',
    '/signup',
    '/dashboard/:path*',
    // Add API routes for CSRF protection
    '/api/:path*'
  ],
};


// import { getToken } from 'next-auth/jwt';
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export async function middleware(request: NextRequest) {
//   const path = request.nextUrl.pathname;

//   // Define public paths that don't require authentication
//   const isPublicPath = path === '/signin' || path === '/signup';

//   const token = await getToken({
//     req: request,
//     secret: process.env.NEXTAUTH_SECRET,
//   });

//   if (isPublicPath && token) {
//     return NextResponse.redirect(new URL('/dashboard', request.url));
//   }

//   if (!isPublicPath && !token) {
//     return NextResponse.redirect(new URL('/signin', request.url));
//   }
// }

// // Configure which routes to protect
// export const config = {
//   matcher: ['/dashboard/:path*', '/signin', '/signup'],
// };