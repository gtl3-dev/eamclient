import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { auth } from '@/auth'

// export { auth as middleware } from "@/auth"          // This is the auth middleware that works with AuthJS as per docs

// 1. Specify protected and public routes
const protectedRoutes = ['/dashboard']
const publicRoutes = ['/login', '/learn', '/']

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const token = request.cookies.get('token')?.value;
    const searchParams = request.nextUrl.searchParams;
    console.log("Next URL: ", path);
  
    return NextResponse.next();
}

//https://authjs.dev/getting-started/session-management/protecting
export default auth((req) => {
    if (!req.auth && req.nextUrl.pathname !== "/login") {
      const newUrl = new URL("/login", req.nextUrl.origin)
      return Response.redirect(newUrl)
    }
})

export const config = {
    matcher: ['/about/:path*', '/dashboard/:path*'],
 }