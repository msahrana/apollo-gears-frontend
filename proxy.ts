import { NextRequest, NextResponse } from "next/server"
import jwt, { JwtPayload } from "jsonwebtoken"

type TokenPayload = JwtPayload & {
  role?: "user" | "driver" | "admin"
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const accessToken = request.cookies.get("accessToken")?.value

  // Public pages
  const publicPaths = [
    "/",
    "/login",
    "/register",
    "/about",
    "/contact",
    "/pricing",
    "/features",
  ]

  const isPublicPath = publicPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  )

  // If user is not logged in and tries to access
  // a protected page, send them to login.
  if (!accessToken) {
    if (!isPublicPath) {
      return NextResponse.redirect(new URL("/login", request.url))
    }

    return NextResponse.next()
  }

  let decodedToken: TokenPayload

  try {
    decodedToken = jwt.decode(accessToken) as TokenPayload

    if (!decodedToken) {
      throw new Error("Invalid token")
    }
  } catch {
    const response = NextResponse.redirect(new URL("/login", request.url))

    response.cookies.delete("accessToken")
    response.cookies.delete("refreshToken")

    return response
  }

  const role = decodedToken.role

  // Role → dashboard
  const dashboardMap: Record<string, string> = {
    user: "/dashboard",
    driver: "/driver-dashboard",
    admin: "/admin-dashboard",
  }

  const dashboard = role ? dashboardMap[role] : undefined

  // Unknown role
  if (!dashboard) {
    const response = NextResponse.redirect(new URL("/login", request.url))

    response.cookies.delete("accessToken")
    response.cookies.delete("refreshToken")

    return response
  }

  // If logged-in user visits login/register,
  // redirect them to their own dashboard.
  if (pathname === "/login" || pathname === "/register") {
    return NextResponse.redirect(new URL(dashboard, request.url))
  }

  // Prevent users from accessing another role's dashboard.
  if (pathname.startsWith("/dashboard") && role !== "user") {
    return NextResponse.redirect(new URL(dashboard, request.url))
  }

  if (pathname.startsWith("/driver-dashboard") && role !== "driver") {
    return NextResponse.redirect(new URL(dashboard, request.url))
  }

  if (pathname.startsWith("/admin-dashboard") && role !== "admin") {
    return NextResponse.redirect(new URL(dashboard, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
