import { NextRequest, NextResponse } from "next/server";
import { AppRoutings } from "./utils/enums/appRoutings";

// Define routes based on roles
const adminRoutes = [AppRoutings.AdminDashboard];
const userRoutes = [AppRoutings.UserDashboard, AppRoutings.UserTransactions];
const publicRoutes = [AppRoutings.LogIn, AppRoutings.Register];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const isAdminRoute = adminRoutes.includes(path as AppRoutings);
  const isUserRoute = userRoutes.includes(path as AppRoutings);
  const isPublicRoute = publicRoutes.includes(path as AppRoutings);

  const token = req.cookies.get("token")?.value;
  const role = req.cookies.get("role")?.value;

  if (path === AppRoutings.Home) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
  if ((isAdminRoute || isUserRoute) && !token) {
    return NextResponse.redirect(new URL("/login", req.nextUrl)); // User is not authenticated
  }
  if (isPublicRoute && token) {
    if (role === "admin") {
      return NextResponse.redirect(new URL("/adminDashboard", req.nextUrl)); // Redirect to dashboard if already logged in
    } else {
      return NextResponse.redirect(new URL("/userDashboard", req.nextUrl));
    }
  }
  if (isAdminRoute && role !== "admin") {
    return NextResponse.redirect(new URL("/userDashboard", req.nextUrl));
  }
  if (isUserRoute && role !== "user") {
    return NextResponse.redirect(new URL("/adminDashboard", req.nextUrl));
  }
  return NextResponse.next();
}

// List of Routes Middleware should run on
export const config = {
  matcher: [
    AppRoutings.Home,
    AppRoutings.AdminDashboard,
    AppRoutings.LogIn,
    AppRoutings.Register,
    AppRoutings.UserDashboard,
    AppRoutings.UserTransactions,
  ],
};
