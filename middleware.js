import { NextResponse } from "next/server";

export function middleware(req) {

    const role = req.cookies.get("role")?.value;
    const token = req.cookies.get("token")?.value;
    const url = req.nextUrl.pathname;

    // protected routes
    const protectedRoutes = ["/dashboard", "/profile"];

    // LOGIN CHECK
    if (protectedRoutes.includes(url)) {
        if (!token) {
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }

    //ADMIN ROUTE CHECK
    if (url.startsWith("/admin")) {
        if (role !== "admin") {
            return NextResponse.redirect(new URL("/", req.url));
        }
    }

    return NextResponse.next();
}