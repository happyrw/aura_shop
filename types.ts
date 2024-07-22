import { ExtendedUser } from "./next-auth";

// types.ts
export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl?: string; // Make optional if not always present
    images: string[];
    category: string;
    subcategory: string;
    item: string;
    size: string;
    stock: number;
    SKU?: string; // Make optional if not always present
    reviews?: string[]; // Make optional if not always present
    createdAt: Date;
    updatedAt: Date;
}

export interface Category {
    category: string;
    description: string;
    products: Product[];
}

export type TestimonyType = {
    id: string;
    location: string;
    testimony: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    user: ExtendedUser | null; // Include user information
};

