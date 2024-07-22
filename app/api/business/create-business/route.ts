import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { businessFormSchema } from "@/schemas";
import { MemberRole } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const values = await req.json();
    try {
        const validatedData = businessFormSchema.safeParse(values);

        if (!validatedData.success) {
            return new NextResponse("Invalid input data", { status: 400 });
        }

        const data = validatedData.data;
        const user = await currentUser();
        if (!user || !user.id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // First, create the business
        const newBusiness = await db.business.create({
            data: {
                ...data,
                ownerId: user.id,
            },
        });

        // Then, create the member with the retrieved businessId
        const newMember = await db.member.create({
            data: {
                userId: user.id,
                role: MemberRole.ADMIN,
                businessId: newBusiness.id,
            },
        });

        console.log("newMember", newMember);

        return NextResponse.json({ newBusiness, newMember }, { status: 201 });
    } catch (error) {
        console.error("Error creating business:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
