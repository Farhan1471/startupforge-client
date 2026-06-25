'use client'
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { getUsers } from "@/lib/api/users";
import { getOpportunity } from "@/lib/api/opportunities";
import { getPayments } from "@/lib/api/payment";
import { Briefcase, Persons, CircleDollar, Layers } from "@gravity-ui/icons";
import React, { useEffect, useState } from "react";

const OverviewCard = () => {
    const [users, setUsers] = useState([]);
    const [startups, setStartups] = useState([]);
    const [opportunities, setOpportunities] = useState([]);
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        getUsers().then(setUsers).catch(console.error);
        fetch("/api/startups")
            .then((r) => r.json())
            .then(setStartups)
            .catch(console.error);
        getOpportunity().then(setOpportunities).catch(console.error);
        getPayments().then(setPayments).catch(console.error);
    }, []);

    const totalRevenue = payments?.length ? payments.length * 49.99 : 0;

    const statsData = [
        { title: "Total Users", value: users?.length ?? 0, icon: Persons },
        { title: "Total Startups", value: startups?.length ?? 0, icon: Layers },
        { title: "Total Opportunities", value: opportunities?.length ?? 0, icon: Briefcase },
        { title: "Total Revenue", value: totalRevenue, icon: CircleDollar },
    ];

    return <DashboardStats statsData={statsData} />;
};

export default OverviewCard;