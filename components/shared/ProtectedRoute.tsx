"use client";

import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if (!user) router.push("/auth/login");
    }, [user, router]);

    if (!user) return null;
    return children;
}
