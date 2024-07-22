import * as z from 'zod';

export const loginSchema = z.object({
    email: z.string().email({ message: "Email is missing" }),
    password: z.string().min(2, { message: "Password is missing" }).max(15),
})

export const userRegisterSchema = z.object({
    firstName: z.string().min(1, { message: "First name is missing" }),
    lastName: z.string().min(1, { message: "Last name is missing" }),
    location: z.string().min(1, { message: "Location is missing" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(2, { message: "Password must be at least 2 characters long" }).max(15),
    imageUrl: z.string().url({ message: "Must be a url" }),
});

export const userUpdateSchema = z.object({
    firstName: z.string().min(1, { message: "First name is missing" }).optional(),
    lastName: z.string().min(1, { message: "Last name is missing" }).optional(),
    location: z.string().min(1, { message: "Location is missing" }).optional(),
    email: z.string().email({ message: "Invalid email address" }).optional(),
    password: z.string().min(2, { message: "Password must be at least 2 characters long" }).max(15).optional(),
    imageUrl: z.string().optional(),
});

// export const businessRegisterSchema = z.object({
//     businessName: z.string().min(1, { message: "Business Name is missing" }),
//     businessDescription: z.string().min(1, { message: "Business Description is missing" }),
//     industry: z.string().min(1, { message: "Industry is missing" }),
//     productCategory: z.string().min(1, { message: "Product Category is missing" }),
//     website: z.string().url({ message: "Invalid URL" }),
//     imageUrl: z.string().url({ message: "Must be a url" }),
// });

export const productFormSchema = z.object({
    name: z.string().min(1, { message: "Name is required." }),
    description: z.string().min(1, { message: "Description is required." }),
    price: z.preprocess((value) => Number(value), z.number().positive({ message: "Price must be a positive number." })),
    category: z.string().min(1, { message: "Category is required." }),
    subcategory: z.string().min(1, { message: "Subcategory is required." }),
    item: z.string().min(1, { message: "Item is required." }),
    size: z.string().min(1, { message: "Size is required." }),
    stock: z.preprocess((value) => Number(value), z.number().int().positive({ message: "Stock must be a positive integer." })),
    images: z.array(z.string().url({ message: "Must be a valid URL" })).min(1, { message: "At least one image URL is required." }),
});

export const businessFormSchema = z.object({
    businessName: z.string().min(1, { message: "Name is required." }),
    businessDescription: z.string().min(1, { message: "Description is required." }),
    industry: z.string().min(1, { message: "Category is required." }),
    productCategory: z.string().min(1, { message: "Category is required." }),
    website: z.string().min(1, { message: "Subcategory is required." }),
    imageUrl: z.string().url({ message: "Must be a url" }),
});

// const formSchema = z.object({
//     username: z.string().min(2, { message: "Username must be at least 2 characters.", }),
//     url: z.string().url({ message: "Must be a valid URL.", }),
//     category: z.string().min(1, { message: "Category is required.", }),
//     subcategory: z.string().min(1, { message: "Subcategory is required.", }),
//     item: z.string().min(1, { message: "Item is required.", }),
//     name: z.string().min(1, { message: "Name is required.", }),
//     description: z.string().min(1, { message: "Description is required.", }),
//     price: z.preprocess((value) => Number(value), z.number().positive({ message: "Price must be a positive number.", })),
// });