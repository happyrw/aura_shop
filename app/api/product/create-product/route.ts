import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const { productType, businessId, memberId, ...productData } = data;

        const memberExists = await db.member.findFirst({
            where: { userId: memberId },  // Use userId instead of id
        });

        if (!memberExists) {
            console.log("Member not found", memberId);
            return new NextResponse("Member not found", { status: 404 });
        }

        let createdProduct;

        switch (productType) {
            case "New arrival":
                createdProduct = await db.newArrivalProduct.create({
                    data: {
                        ...productData,
                        businessId,
                        memberId
                    },
                });
                console.log("New arrival product created successfully")

                // Update member's new arrival product filed
                await db.member.update({
                    where: { id: memberExists.id },
                    data: {
                        newArrival: {
                            connect: { id: createdProduct.id },
                        }
                    }
                });
                break;

            case "Discount":
                createdProduct = await db.discountProduct.create({
                    data: {
                        ...productData,
                        businessId,
                        memberId
                    },
                });
                console.log("Discount product created successfully")

                // Update member's new arrival product filed
                await db.member.update({
                    where: { id: memberExists.id },
                    data: {
                        discount: {
                            connect: { id: createdProduct.id },
                        }
                    }
                });
                break;

            default:
                createdProduct = await db.product.create({
                    data: {
                        ...productData,
                        businessId,
                        memberId
                    },
                });
                console.log("Product created successfully")

                await db.member.update({
                    where: { id: memberExists.id },
                    data: {
                        products: {
                            connect: { id: createdProduct.id },
                        }
                    }
                });
                break;
        }

        return NextResponse.json(createdProduct, { status: 201 });
    } catch (error) {
        console.error(error);
        return new NextResponse("Something went wrong", { status: 500 });
    }
}
