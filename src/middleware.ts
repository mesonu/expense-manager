// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === '/signin' || path === '/signup';
  const token = request.cookies.get('user')?.value;

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }
}

export const config = {
  matcher: [
    '/',
    '/signin',
    '/signup',
    '/dashboard/:path*',
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