import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { auth } from '@/auth'
import { decrypt } from './app/lib/session'

// export { auth as middleware } from "@/auth"          // This is the auth middleware that works with AuthJS as per docs

// 1. Specify protected and public routes
const protectedRoutes = ['/dashboard', '/finance', ]
const publicRoutes = ['/learn', '/api/auth/signin', '/']

export async function middleware(req: NextRequest) {
 // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)
 
  // 3. Decrypt the session from the cookie
  // const cookie = (await cookies()).get('session')?.value
  // const session = await decrypt(cookie)
  // // const session = await auth();
  // console.log("Middleware session: ", session);
 
  // 4. Redirect to / if the user is not authenticated
//   if (isProtectedRoute && !session?.userId) {
//     return NextResponse.redirect(new URL('/', req.nextUrl))
//   }
 
  // 5. Redirect to /dashboard if the user is authenticated
  if (
    isPublicRoute &&
    // session?.realmId &&
    !req.nextUrl.pathname.startsWith('/dashboard')
  ) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
  }

    console.log("Middleware: Next URL path: ", path);
  
    return NextResponse.next();
}

//https://authjs.dev/getting-started/session-management/protecting
export default auth((req) => {
    if (!req.auth && req.nextUrl.pathname !== "/login") {
      const newUrl = new URL("/login", req.nextUrl.origin)
      return Response.redirect(newUrl)
    }
})

// Routes Middleware should not run on
export const config = {
    matcher: ['/about/:path*', '/dashboard/:path*'],
 }