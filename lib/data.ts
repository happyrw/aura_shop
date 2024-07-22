"use server"

import { db } from "./db";
import { currentUser } from "./auth";

export const checkBusiness = async () => {
    const user = await currentUser();

    const businesses = await db.business.findMany({
        where: {
            members: {
                some: {
                    userId: user?.id
                }
            }
        },
        include: {
            members: true
        }
    });
    return businesses;
};

export const fetchProducts = async (category?: string, subcategory?: string, item?: string, searchQuery?: string) => {
    const filter: any = {};

    if (category) {
        filter.category = category;
        console.log("By category", category);
    }
    if (subcategory) {
        filter.subcategory = subcategory;
        console.log("By subCategory", subcategory);
    }
    if (item) {
        filter.item = item;
        console.log("By item", item);
    }
    if (searchQuery) {
        filter.OR = [
            { name: { contains: searchQuery, mode: 'insensitive' } },
            { description: { contains: searchQuery, mode: 'insensitive' } },
        ];
        console.log("By search query", searchQuery);
    }

    const products = await db.product.findMany({
        where: filter,
        orderBy: { createdAt: "desc" },
    });

    return products;
};

export const fetchTestimony = async () => {
    const testimony = await db.testimony.findMany({
        take: 4,
        include: {
            user: true,
        },
        orderBy: { createdAt: "desc" },
    });
    console.log(testimony);
    return testimony;
}
