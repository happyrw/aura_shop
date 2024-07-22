"use server"

import { db } from "@/lib/db";
import { userRegisterSchema } from "@/schemas";
import { NextResponse } from "next/server";

import bcrypt from "bcryptjs";
import { MemberRole } from "@prisma/client";

export async function POST(req: Request) {
    try {
        const values = await req.json();
        const validatedData = userRegisterSchema.safeParse(values);
        if (!validatedData.success) {
            return new NextResponse("Invalid provided data", { status: 400 });
        }

        const data = validatedData.data;

        // Check if user already exists
        const existingUser = await db.user.findFirst({
            where: { email: data.email },
        });

        if (existingUser) {
            return new NextResponse("User already exist", { status: 404 });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(data.password, 10);

        // Create the user
        const user = await db.user.create({
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                location: data.location,
                email: data.email,
                password: hashedPassword,
                imageUrl: data.imageUrl,
            },
        });

        // TODO: To be removed after testing

        const businessId = "clymm3eo00007542p29avcnbl";

        const business = await db.business.findFirst({
            where: {
                id: businessId,
            }
        });
        if (!business) {
            return new NextResponse("Business not found", { status: 404 });
        }

        await db.member.create({
            data: {
                userId: user.id,
                businessId: business.id,
            },
        });

        // TODO: To be removed after testing

        // Send email verification to the user

        const response = {
            message: "User created successfully",
            user,
        };

        return NextResponse.json(response, { status: 200 });
    } catch (error: any) {
        return new NextResponse("Something went wrong", { status: 500 });
    }
}
