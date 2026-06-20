'use client'
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { useSession } from "@/lib/auth-client";
import { Briefcase, CircleCheck, Persons, Thunderbolt } from "@gravity-ui/icons";
import React from "react";

const FounderDashboardPage = () => {
    const { data: session, isPending } = useSession();

    if(isPending){
        return <div>Loading...</div>;  
    }

     const founderStats = [
        { title: "Total Opportunities", value: "20", icon: Briefcase },
        { title: "Total Applicants", value: "847", icon: Persons },
        { title: "Active Opportunities", value: "15", icon: Thunderbolt },
        { title: "Opportunities Closed", value: "5", icon: CircleCheck },
    ];

    const user = session?.user;
    console.log("Session data in Founder Dashboard: ", session);
    return (
        <div className="p-4 space-y-6">
            <p className="text-xl font-bold">Welcome Back, {user?.name}</p>
            <DashboardStats statsData={founderStats}/>
        </div>
    );
}

export default FounderDashboardPage;