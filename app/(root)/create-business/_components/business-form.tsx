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
import { businessFormSchema, productFormSchema } from "@/schemas";
import Image from "next/image";
import { LoaderIcon, Upload } from "lucide-react";
import FormError from "@/components/form-error";
import { useState } from "react";
import axios from "axios";
import FileUpload from "./file-upload";
import { useToast } from "@/components/ui/use-toast";

const BusinessForm = () => {

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [upload, setUpload] = useState(false);

    const { toast } = useToast();


    const form = useForm<z.infer<typeof businessFormSchema>>({
        resolver: zodResolver(businessFormSchema),
        defaultValues: {
            businessName: "",
            businessDescription: "",
            industry: "",
            productCategory: "",
            website: "",
            imageUrl: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof businessFormSchema>) => {
        setError("");
        try {
            setLoading(true);
            await axios.post("/api/business/create-business", values);
            toast({
                title: "Business created successfully",
                description: "Your business has been created successfully",
            })
            setTimeout(() => {
                window.location.replace("/");
            }, 5000)
            setLoading(false);
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data);
            } else {
                console.error("Unexpected error:", error);
            }
            setLoading(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-8 flex flex-col justify-between">
                    <div className="relative w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] md:w-[300px] lg:w-[400px] md:h-[300px] lg:h-[400px] mx-auto">
                        <Image src='/bg1.jpg' alt='upload image' fill className="object-cover rounded-xl" />
                    </div>
                </div>
                <div className="space-y-8 flex flex-col justify-between">
                    {upload ? (
                        <FormField
                            control={form.control}
                            name="imageUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Business image</FormLabel>
                                    <FormControl>
                                        <FileUpload
                                            endpoint="uploadImage"
                                            value={field.value}
                                            onChange={field.onChange}
                                            category="profile"
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
                                Upload business&apos; image
                            </div>
                        </div>
                    )}
                    <FormField
                        control={form.control}
                        name="businessName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name your business</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Description"
                                        {...field}
                                        className="outline-0 border-0 border-b-2 border-black focus:border-b-4 focus:border-orange-700"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="industry"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Industry</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Description"
                                        {...field}
                                        className="outline-0 border-0 border-b-2 border-black focus:border-b-4 focus:border-orange-700"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="productCategory"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Product category</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Description"
                                        {...field}
                                        className="outline-0 border-0 border-b-2 border-black focus:border-b-4 focus:border-orange-700"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="website"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Website link</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Web link"
                                        {...field}
                                        className="outline-0 border-0 border-b-2 border-black focus:border-b-4 focus:border-orange-700"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="businessDescription"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Describe your business</FormLabel>
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
                    <FormError message={error} />
                    <Button type="submit" className="w-full bg-orange-700 text-white ">
                        {loading ? <LoaderIcon className="animate-spin" /> : "Create"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}

export default BusinessForm;
