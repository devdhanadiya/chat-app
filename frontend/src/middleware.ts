import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token")
    const loginOrSignupPaths = ["/login", "/register"]
    if (token && loginOrSignupPaths.includes(req.nextUrl.pathname)) {
        return NextResponse.redirect(new URL("/", req.url))
    }

    if (!token &&
        req.nextUrl.pathname !== "/login" &&
        req.nextUrl.pathname !== "/register"
    ) {
        return NextResponse.redirect(new URL("/login", req.url))
    }
    return NextResponse.next()
}

export const config = {
    matcher: ["/", "/setting", "/login", "/register"]
}