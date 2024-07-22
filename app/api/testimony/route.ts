import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const user = await currentUser();
        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const data = await req.json();
        if (!data) {
            return new NextResponse("Missing data", { status: 401 });
        }
        data.userId = user.id;

        const testimony = await db.testimony.create({ data });

        const response = {
            message: "Succeed",
            status: 200,
            testimony,
        }

        console.log(response);
        return NextResponse.json(response);
    } catch (error: any) {
        console.error("Error creating testimony:", error);
        return new NextResponse("Something went wrong", { status: 500 });
    }
}
