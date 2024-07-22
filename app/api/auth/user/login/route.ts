import { signIn } from "@/auth";
import { loginSchema } from "@/schemas";
import { NextResponse } from "next/server";
import { AuthError } from "next-auth";

export async function POST(req: Request) {
    try {
        const values = await req.json();
        const validatedData = loginSchema.safeParse(values);
        if (!validatedData.success) {
            return new NextResponse("Invalid login credentials", { status: 401 });
        }

        const { email, password } = validatedData.data;
        const result = await signIn("credentials", { email, password, redirect: false });

        const user = result.user;  // Assuming result contains user data
        const response = {
            message: "User logged in successfully",
            user,  // Include user data in the response
            status: 200,
        };
        return NextResponse.json(response);
    } catch (error) {
        console.error("Error during login:", error);

        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return new NextResponse("Something went wrong", { status: 500 });
                default:
                    return new NextResponse("Invalid credentials", { status: 401 });
            }
        }

        throw error;
    }
}
