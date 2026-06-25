'use client'
import { useSession } from "@/lib/auth-client";
import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import OverviewCard from "./overview";

const AdminDashboardPage = () => {
    const { data: session, isPending } = useSession();

    if (isPending) {
        return (
            <div className="min-h-[50vh] flex items-center justify-center">
                <ClipLoader color="#6366f1" size={48} speedMultiplier={0.8} />
            </div>
        );
    }

    const user = session?.user;

    return (
        <div className="p-4 md:p-8 space-y-8 max-w-6xl mx-auto w-full">
            <div className="space-y-1">
                <h1 className="text-2xl font-bold tracking-tight">
                    Welcome Back, {user?.name || "Admin"}
                </h1>
                <p className="text-small text-default-500">
                    Here is an overview of your platform activities.
                </p>
            </div>

            <div className="flex justify-center w-full">
                <div className="w-full">
                    <OverviewCard />
                </div>
            </div>
        </div>
    );
}

export default AdminDashboardPage;