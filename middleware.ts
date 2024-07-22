import NextAuth from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authConfig from "./auth.config";

// const protectedRoutes = [];
// const publicRoutes = [];
const userRoutes = ["/sign-in", "/sign-up"];

const { auth } = NextAuth(authConfig);

export default auth((request: NextRequest) => {
    const route = request.nextUrl.pathname;
    const isLoggedIn = !!(request as any).auth;
    console.log("ROUTE: ", route, "isLoggedIn", isLoggedIn);

    const isAuthRoute = userRoutes.includes(route);

    if (isAuthRoute) {
        if (isLoggedIn) {
            return NextResponse.redirect(new URL("/", request.url));
        }
        return NextResponse.next();
    }
})

// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ["/((?!.+\\.[\\w]+s|_next).*)", "/", "/(api|trpc)(.*)"],
}