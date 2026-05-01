import { NextResponse, type NextRequest } from 'next/server';
import {
  ATTR_COOKIE,
  ATTR_COOKIE_MAX_AGE,
  parseAttributionFromUrl,
  serializeAttribution,
} from '@/lib/attribution';

export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  if (request.cookies.has(ATTR_COOKIE)) return response;

  const attr = parseAttributionFromUrl(
    request.nextUrl,
    request.headers.get('referer'),
  );
  if (!attr) return response;

  response.cookies.set(ATTR_COOKIE, serializeAttribution(attr), {
    httpOnly: false,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: ATTR_COOKIE_MAX_AGE,
    path: '/',
  });

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|images/|preview/|api/|robots.txt|sitemap.xml|.well-known/workflow/).*)',
  ],
};
