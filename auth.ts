import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./lib/db"
import authConfig from "./auth.config"

export const {
    handlers,
    auth,
    signIn,
    signOut
} = NextAuth({
    callbacks: {
        async session({ session, token }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            if (session.user) {
                session.user.firstName = token.firstName as string;
                session.user.lastName = token.lastName as string;
                session.user.location = token.location as string;
                session.user.email = token.email as string;
                session.user.imageUrl = token.imageUrl as string;
            }

            return session;
        },
        async jwt({ token }) {
            if (!token.sub) return token;
            const existingUser = await db.user.findFirst({ where: { id: token.sub } });
            if (!existingUser) return token;

            token.firstName = existingUser.firstName;
            token.lastName = existingUser.lastName;
            token.location = existingUser.location;
            token.email = existingUser.email;
            token.imageUrl = existingUser.imageUrl;

            return token;
        }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
})