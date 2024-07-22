"use client";

import { setUser } from "@/slices/userSlice";
import { AppDispatch } from "@/app/store";
import axios from "axios";
import * as z from "zod";
import { loginSchema } from "@/schemas";


export const login = async (dispatch: AppDispatch, values: z.infer<typeof loginSchema>) => {
    try {
        const response = await axios.post("/api/auth/user/login", values);
        const user = response.data.user;
        dispatch(setUser(user));
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data);
        } else {
            console.error("Unexpected error:", error);
            throw new Error("Unexpected error");
        }
    }
};