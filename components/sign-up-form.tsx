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
import { userRegisterSchema } from "@/schemas";

import axios from "axios"
    ;
import FormError from "./form-error";
import { useState } from "react";
import { useToast } from "./ui/use-toast";
import { LoaderIcon, Upload } from "lucide-react";
import FileUpload from "@/app/(root)/create-business/_components/file-upload";
const SignUpForm = () => {
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [upload, setUpload] = useState(false);

    const { toast } = useToast();

    const form = useForm<z.infer<typeof userRegisterSchema>>({
        resolver: zodResolver(userRegisterSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            location: "",
            email: "",
            password: "",
            imageUrl: ""
        },
    });

    const onSubmit = async (values: z.infer<typeof userRegisterSchema>) => {
        setError("");
        try {
            setLoading(true);
            await axios.post("/api/auth/user/register", values);
            toast({
                title: "Successfully registered",
                description: "Check your registration email confirmation",
            })
            setError("Verify your registration email confirmation");
            setLoading(false);
        } catch (error: any) {
            setLoading(false);
            if (axios.isAxiosError(error)) {
                setError(error.response?.data);
            } else {
                console.error("Unexpected error:", error);
            }
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {upload ? (
                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Your image</FormLabel>
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
                    name="firstName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>First name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="shadcn"
                                    {...field}
                                    className="bg-white text-black outline-none border-[0.2px] border-b-2 border-black focus:border-b-4 focus:border-orange-700"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Last name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="shadcn"
                                    {...field}
                                    className="bg-white text-black outline-none border-[0.2px] border-b-2 border-black focus:border-b-4 focus:border-orange-700"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="shadcn"
                                    {...field}
                                    className="bg-white text-black outline-none border-[0.2px] border-b-2 border-black focus:border-b-4 focus:border-orange-700"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="shadcn"
                                    {...field}
                                    className="bg-white text-black outline-none border-[0.2px] border-b-2 border-black focus:border-b-4 focus:border-orange-700"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="shadcn"
                                    {...field}
                                    className="bg-white text-black outline-none border-[0.2px] border-b-2 border-black focus:border-b-4 focus:border-orange-700"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormError message={error} />
                <Button disabled={loading} type="submit" className="w-full bg-orange-800">
                    {loading ? <LoaderIcon className="animate-spin" /> : "Submit"}
                </Button>
            </form>
        </Form>
    );
}

export default SignUpForm;
