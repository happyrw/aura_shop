"use client";

import { signOut } from "next-auth/react";
import { clearUser, setUser } from "@/slices/userSlice";
import { AppDispatch } from "@/app/store";

export const logout = async (dispatch: AppDispatch) => {
    await signOut();
    dispatch(clearUser());
};

