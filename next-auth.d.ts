import NextAuth, { type DefaultSession } from "next-auth"

export type ExtendedUser = DefaultSession["user"] & {
    firstName: string | null;
    lastName: string | null;
    location: string | null;
    email: string;
    password: string | null;
    imageUrl: string | null;
    emailVerified: Date | null;
    createdAt: Date;
    updatedAt: Date;
}

declare module "next-auth" {
    interface Session {
        user: ExtendedUser;
    }
}