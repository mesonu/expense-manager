// src/lib/api/middleware.ts
import { rateLimit } from '@/lib/rate-limit'
import { validateToken } from '@/lib/security'

export async function secureAPI(req: Request) {
  // Rate limiting
  const limiter = await rateLimit(req)
  if (!limiter.success) {
    return new Response('Too Many Requests', { status: 429 })
  }

  // CSRF Protection
  const csrfToken = req.headers.get('x-csrf-token')
  if (!await validateToken(csrfToken)) {
    return new Response('Invalid CSRF Token', { status: 403 })
  }

  // Request validation
  const contentType = req.headers.get('content-type')
  if (!contentType?.includes('application/json')) {
    return new Response('Invalid Content-Type', { status: 415 })
  }
}