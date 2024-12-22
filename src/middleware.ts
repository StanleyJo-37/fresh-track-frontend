import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession } from "./lib/session";
import { getServerCookie } from "./lib/cookie";

export const protectedRoutes = [
  '/viewfinder',
  '/inventory',
  '/profile',
];

export const publicRoutes = [
  '/login',
  '/register'
]

export const blockedRoutes = [
  '/register'
]

export async function middleware(request: NextRequest) {
  // Example: Redirect to /login if the user is not authenticated
  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const token = await getServerCookie('freshtrack_token');
  const session = await getSession(token!);

  if(blockedRoutes.includes(path)){
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if(protectedRoutes.includes(path) && !session){
    return NextResponse.rewrite(new URL('/login', request.url))
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'
};
