import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import bcrypt from "bcryptjs";
import { loginSchema } from "@/schemas";
import { db } from "@/lib/db";

export default {
    providers: [
        Credentials({
            async authorize(credentials) {
                const validatedFields = loginSchema.safeParse(credentials);

                if (validatedFields.success) {
                    const { email, password } = validatedFields.data;

                    const user = await db.user.findFirst({
                        where: { email }
                    });

                    if (!user || !user.password) {
                        return null;
                    }

                    const passwordMatch = await bcrypt.compare(password, user.password);

                    if (passwordMatch) {
                        return user;
                    }
                }

                return null;
            }
        })
    ]
} satisfies NextAuthConfig;
