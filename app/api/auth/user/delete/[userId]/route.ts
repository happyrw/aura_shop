import { db } from "@/lib/db";
import { NextResponse } from "next/server";

import bcrypt from "bcryptjs";

export async function DELETE(
    req: Request,
    { params }: { params: { userId: string } }
) {
    try {
        const userId = params.userId;
        const { password } = await req.json();
        const user = await db.user.findFirst({
            where: {
                id: userId,
            }
        });
        if (!user) {
            return new NextResponse("Not user found", { status: 404 });
        }

        if (!user.password) {
            return new NextResponse("User does not have a password", { status: 401 });
        };
        const passwordIsValid = await bcrypt.compare(password, user.password);
        if (!passwordIsValid) {
            return new NextResponse("Invalid password", { status: 401 });
        }

        await db.user.delete({
            where: {
                id: userId,
            }
        });

        const response = {
            status: 200,
            message: "User deleted successfully",
            userId,
            password,
        }
        return NextResponse.json(response);
    } catch (error: any) {
        console.error("Error deleting user:", error);
        return new NextResponse("Something went wrong", { status: 500 });
    }
}