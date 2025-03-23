// src/lib/utils/security.ts
import { cookies } from 'next/headers';
// import { randomBytes, createHash } from 'crypto';


// Generate CSRF Token using Web Crypto API
export async function generateCSRFToken(): Promise<string> {
    const buffer = new Uint8Array(32);
    crypto.getRandomValues(buffer);
    const token = Array.from(buffer)
      .map(byte => byte.toString(16).padStart(2, '0'))
      .join('');
    
    const cookieStore = await cookies();
    cookieStore.set('csrfToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });
    
    return token;
  }
  
  export async function validateCSRFToken(token: string | null): Promise<boolean> {
    if (!token) return false;
  
    try {
      const cookieStore = await cookies();
      const storedToken = cookieStore.get('csrfToken');
      
      if (!storedToken?.value) return false;
  
      // Use constant-time comparison to prevent timing attacks
      return timingSafeEqual(token, storedToken.value);
    } catch (error) {
      console.error('CSRF validation error:', error);
      return false;
    }
  }

// Constant-time comparison function
async function timingSafeEqual(a: string, b: string): Promise<boolean> {
    if (a.length !== b.length) {
      return false;
    }
    
    return crypto.subtle.digest('SHA-256', new TextEncoder().encode(a))
      .then(hashA => 
        crypto.subtle.digest('SHA-256', new TextEncoder().encode(b))
          .then(hashB => {
            const arrayA = new Uint8Array(hashA);
            const arrayB = new Uint8Array(hashB);
            return arrayA.every((value, index) => value === arrayB[index]);
          })
      )
      .catch(() => false);
  }
  

// Get stored CSRF token
async function getStoredCSRFToken(): Promise<string | null> {
  // Example using cookies
  if (typeof window !== 'undefined') {
    const cookies = document.cookie.split(';');
    const csrfCookie = cookies.find(cookie => cookie.trim().startsWith('csrfToken='));
    return csrfCookie ? csrfCookie.split('=')[1] : null;
  }
  // Server-side retrieval (implement your preferred method)
  return null;
}

// Rate limiting
const rateLimit = new Map<string, { count: number; resetTime: number }>();

export async function checkRateLimit(
  identifier: string,
  limit: number = 10,
  windowMs: number = 60000
): Promise<boolean> {
  const now = Date.now();
  const record = rateLimit.get(identifier);

  if (!record) {
    rateLimit.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    });
    return true;
  }

  if (now > record.resetTime) {
    record.count = 1;
    record.resetTime = now + windowMs;
    return true;
  }

  if (record.count >= limit) {
    return false;
  }

  record.count++;
  return true;
}

// Password security
export function isStrongPassword(password: string): boolean {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return (
    password.length >= minLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumbers &&
    hasSpecialChars
  );
}

// XSS Prevention
export function sanitizeInput(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Request origin validation
export function validateRequestOrigin(request: Request): boolean {
    const origin = request.headers.get('origin');
    const allowedOrigins = [
      process.env.NEXT_PUBLIC_APP_URL,
      'http://localhost:3000'
    ];
    
    return origin ? allowedOrigins.includes(origin) : false;
  }

// Security headers
export const securityHeaders = {
    'Content-Security-Policy': 
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';",
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
};