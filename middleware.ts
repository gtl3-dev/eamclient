import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { auth } from '@/auth'

// export { auth as middleware } from "@/auth"          // This is the auth middleware that works with AuthJS as per docs

// 1. Specify protected and public routes
const protectedRoutes = ['/dashboard', '/finance', ]
const publicRoutes = ['/learn', '/api/auth/signin', '/']

export function middleware(request: NextRequest) {
      // 2. Check if the current route is protected or public
    const path = request.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path)
    const isPublicRoute = publicRoutes.includes(path)

    console.log("Middleware: Next URL path: ", path);
  
    return NextResponse.next();
}

// //https://authjs.dev/getting-started/session-management/protecting
// export default auth((req) => {
//     if (!req.auth && req.nextUrl.pathname !== "/login") {
//       const newUrl = new URL("/login", req.nextUrl.origin)
//       return Response.redirect(newUrl)
//     }
// })

// Routes Middleware should not run on
export const config = {
    matcher: ['/about/:path*', '/dashboard/:path*'],
 }