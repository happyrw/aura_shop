"use client";

import { logout } from "@/hooks/logout";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

const SettingPage = () => {
    const user = useCurrentUser();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const { push } = useRouter();

    const handleLogout = async () => {
        setLoading(true);
        await logout(dispatch);
        window.location.replace("/");
        setLoading(false);
    };

    return (
        <div>
            {JSON.stringify(user)}
            <button onClick={handleLogout}>
                {loading ? <LoaderIcon className="animate-spin" /> : "Logout"}
            </button>
        </div>
    );
};

export default SettingPage;
