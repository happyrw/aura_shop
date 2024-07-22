"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Combobox } from "@/components/combobox";
import { categories, SimpleSubcategory, NestedSubcategory } from "@/constants/categories";
import { productFormSchema } from "@/schemas";
import Image from "next/image";
import { LoaderIcon, Upload } from "lucide-react";
import FileUpload from "../../create-business/_components/file-upload";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { Business } from "@prisma/client";
import { useRouter } from "next/navigation";

type Subcategories = SimpleSubcategory | NestedSubcategory;

const isNestedSubcategory = (subcategory: Subcategories): subcategory is NestedSubcategory => {
    return (subcategory as NestedSubcategory).items !== undefined;
};

interface IdsProps {
    businessId: string;
    memberId: string;
    memberRole: string;
}

const ProductForm = ({ businessId: BusinessId, memberId: MemberId, memberRole }: IdsProps) => {

    const [upload, setUpload] = useState(false);
    const [loading, setLoading] = useState(false);
    const [productType, setProductType] = useState<string>("");

    const { toast } = useToast()

    const form = useForm<z.infer<typeof productFormSchema>>({
        resolver: zodResolver(productFormSchema),
        defaultValues: {
            name: "",
            description: "",
            price: undefined,
            category: "",
            subcategory: "",
            item: "",
            size: "",
            stock: undefined,
            images: [],
        },
    });

    const handleCategoryChange = (value: string) => {
        form.setValue("category", value);
        form.setValue("subcategory", ""); // Reset subcategory when category changes
        form.setValue("item", ""); // Reset item when category changes
    };

    const handleSubcategoryChange = (value: string) => {
        form.setValue("subcategory", value);
        form.setValue("item", ""); // Reset item when subcategory changes
    };

    const handleItemChange = (value: string) => {
        form.setValue("item", value);
    };

    async function onSubmit(values: z.infer<typeof productFormSchema>) {
        setLoading(true);
        try {
            const businessId = BusinessId;
            const memberId = MemberId;

            await axios.post("/api/product/create-product", { ...values, productType, businessId, memberId });
            toast({
                title: "Product created successfully",
                description: "Your product has been created successfully.",
            })
            setTimeout(() => {
                window.location.replace("/");
            }, 5000);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full p-10 grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-8 flex flex-col justify-between">
                    {upload ? (
                        <FormField
                            control={form.control}
                            name="images"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Product image</FormLabel>
                                    <FormControl>
                                        <FileUpload
                                            endpoint="uploadImage"
                                            value={field.value || []}
                                            onChange={field.onChange}
                                            category="image"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ) : (
                        <div className="relative w-[300px] h-[200px] sm:w-[500px] sm:h-[200px] md:w-[300px] lg:w-[400px] md:h-[200px] lg:h-[200px] mx-auto">
                            <div className="flex flex-col items-center justify-center w-full h-full border-dashed border-2 border-orange-200 rounded-lg cursor-pointer" onClick={() => setUpload((current) => !current)}>
                                <Upload />
                                Upload product&apos; image
                            </div>
                        </div>
                    )}
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Product name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="T-shirt"
                                        {...field}
                                        className="outline-none border-0 border-b-2 border-black focus:border-b-4 focus:border-orange-700"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="stock"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Stock</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="How many product available"
                                        {...field}
                                        className="outline-none border-0 border-b-2 border-black focus:border-b-4 focus:border-orange-700"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <FormControl>
                                    <Combobox
                                        value={field.value}
                                        onChange={(value) => {
                                            field.onChange(value);
                                            handleCategoryChange(value);
                                        }}
                                        options={Object.keys(categories).map((key) => ({
                                            value: key,
                                            label: categories[key].name,
                                        }))}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="space-y-8 flex flex-col justify-between">
                    <FormField
                        control={form.control}
                        name="subcategory"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Subcategory</FormLabel>
                                <FormControl>
                                    <Combobox
                                        value={field.value}
                                        onChange={(value) => {
                                            field.onChange(value);
                                            handleSubcategoryChange(value);
                                        }}
                                        options={
                                            form.watch("category")
                                                ? Object.keys(categories[form.watch("category")].subcategories).map((key) => ({
                                                    value: key,
                                                    label: isNestedSubcategory((categories as any)[form.watch("category")].subcategories[key])
                                                        ? (categories as any)[form.watch("category")].subcategories[key].name
                                                        : key.charAt(0).toUpperCase() + key.slice(1),
                                                }))
                                                : []
                                        }
                                        disabled={!form.watch("category")}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="item"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Item</FormLabel>
                                <FormControl>
                                    <Combobox
                                        value={field.value}
                                        onChange={(value) => {
                                            field.onChange(value);
                                            handleItemChange(value);
                                        }}
                                        options={
                                            form.watch("subcategory") && form.watch("category")
                                                ? (
                                                    isNestedSubcategory(
                                                        (categories as any)[form.watch("category")].subcategories[
                                                        form.watch("subcategory")
                                                        ]
                                                    )
                                                        ? ((categories as any)[form.watch("category")].subcategories[
                                                            form.watch("subcategory")
                                                        ] as NestedSubcategory).items
                                                        : ((categories as any)[form.watch("category")].subcategories[
                                                            form.watch("subcategory")
                                                        ] as SimpleSubcategory)
                                                ).map((item) => ({
                                                    value: item,
                                                    label: item,
                                                }))
                                                : []
                                        }
                                        disabled={!form.watch("subcategory")}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="size"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Product size</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="S, M, L"
                                        {...field}
                                        className="outline-none border-0 border-b-2 border-black focus:border-b-4 focus:border-orange-700"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Description"
                                        {...field}
                                        rows={7}
                                        className="outline-0 border-0 border-b-2 border-black focus:border-b-4 focus:border-orange-700"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="Price"
                                        {...field}
                                        className="outline-none border-0 border-b-2 border-black focus:border-b-4 focus:border-orange-700"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {memberRole === "ADMIN" && (
                        <div>
                            <select
                                id="productType"
                                value={productType} // Use state here
                                onChange={(e) => setProductType(e.target.value)} // Update state on change
                                className="outline-none border-0 border-b-2 border-black focus:border-b-4 focus:border-orange-700 w-full p-2 cursor-pointer"
                            >
                                <option value="">Select product type</option>
                                <option value="New arrival">New arrival</option>
                                <option value="Discount">Discount</option>
                            </select>
                        </div>
                    )}
                    <Button disabled={loading} type="submit" className="w-full bg-orange-700 text-white ">
                        {loading ? <LoaderIcon className="animate-spin" /> : "Create"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}

export default ProductForm;
