"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/schemas";
import axios from "axios";
import FormError from "./form-error";
import { useState } from "react";
import { useToast } from "./ui/use-toast";
import { useDispatch } from 'react-redux';
import { LoaderIcon } from "lucide-react";
import { login } from "@/hooks/login";

const SignInForm = () => {
    const [error, setError] = useState<string>("");
    const { toast } = useToast();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof loginSchema>) => {
        setError("");
        try {
            setLoading(true);
            await login(dispatch, values);
            window.location.replace("/");
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                                    className="text-black outline-none border-[0.2px] border-b-2 border-black focus:border-b-4 focus:border-orange-700"
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
                                    className="text-black outline-none border-[0.2px] border-b-2 border-black focus:border-b-4 focus:border-orange-700"
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

export default SignInForm;
