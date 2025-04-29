import { auth } from "./lib/auth";
import { NextRequest, NextResponse } from "next/server";

auth(async function middleware(req: NextRequest) {
	const path = req.nextUrl.pathname;

	const isPublicPath =
		path === "/" ||
		path === "/login" ||
		path === "signup" ||
		path.startsWith("/blog") ||
		path === "/terms" ||
		path === "/privacy";

	const isAuthenticated = req.cookies.has("auth-token");

	if (!isAuthenticated && !isPublicPath) {
		const redirectUrl = new URL("/login", req.url);
		redirectUrl.searchParams.set("from", path);
		return NextResponse.redirect(redirectUrl);
	}

	if (isAuthenticated && (path === "/login" || path === "/signup")) {
		return NextResponse.redirect(new URL("/dashboard", req.url));
	}

	return NextResponse.next();
});

export const config = {
	matcher: ["/((?!_next/static|_next/image|favicon.ico|public).*)"],
};

export default auth;
