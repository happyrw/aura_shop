import { db } from "@/lib/db";
import { userUpdateSchema } from "@/schemas";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { userId: string } }
) {
    // userId: clyb7v36t0000qjffysjdpcj4
    try {
        const values = await req.json();
        const validatedData = userUpdateSchema.safeParse(values);
        if (!validatedData.success) {
            return new NextResponse("Invalid provided data", { status: 400 });
        }

        const data = validatedData.data;

        // Check if user already exists
        const existingUser = await db.user.findFirst({
            where: { id: params.userId },
        });

        if (!existingUser) {
            return new NextResponse("User not found", { status: 404 });
        }

        const { email, password, ...updateFields } = data;

        // Update the user
        const updatedUser = await db.user.update({
            where: {
                id: params.userId,
            },
            data: updateFields,
        });

        const response = {
            message: "User updated successfully",
            status: 200,
            updatedUser,
        };

        return NextResponse.json(response);
    } catch (error: any) {
        return new NextResponse("Something went wrong", { status: 500 });
    }
}

