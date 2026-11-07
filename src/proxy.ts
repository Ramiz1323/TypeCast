import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  const isAuthPage = pathname.startsWith('/auth');
  const isProtectedPage =
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/resumes') ||
    pathname.startsWith('/ats-checker');

  // If trying to access protected routes without a token, redirect to login
  if (isProtectedPage && !token) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If already authenticated and trying to access auth pages, redirect to dashboard
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/resumes/:path*',
    '/ats-checker/:path*',
    '/auth/:path*',
  ],
};
