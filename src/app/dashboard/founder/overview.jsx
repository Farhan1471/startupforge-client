'use client'
import React, { useState } from "react";
import { serverFetch } from "@/lib/core/server";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { Briefcase, Persons, Thunderbolt } from "@gravity-ui/icons";


const OverviewCardFounder = ({ userId }) => {

    const [stats, setStats] = useState(null);

    const loadStats = async () => {

        const startup = await serverFetch(`api/my/startups?founderId=${userId}`);
        if (!startup || !startup._id) return;

        const opportunity = await serverFetch(`api/opportunities?startupId=${startup._id}`);
        const applications = await serverFetch(`api/applications?startupId=${startup._id}`);

        const totalOpportunities = opportunity?.length || 0;
        const totalApplicants = applications?.length || 0;
        
        const acceptedMembers = applications?.filter(item => item.Status === "Approved").length || 0;

        setStats({
            opportunities: totalOpportunities,
            applicants: totalApplicants,
            accepted: acceptedMembers
        });
    };

    if (userId && !stats) {
        loadStats();
    }

    const statsData = [
        { title: "Total Opportunities", value: stats?.opportunities ?? 0, icon: Briefcase },
        { title: "Total Applicants", value: stats?.applicants ?? 0, icon: Persons },
        { title: "Accepted Members", value: stats?.accepted ?? 0, icon: Thunderbolt }
    ];

    if (stats) {
        return <DashboardStats statsData={statsData} />;
    }
};

export default OverviewCardFounder;