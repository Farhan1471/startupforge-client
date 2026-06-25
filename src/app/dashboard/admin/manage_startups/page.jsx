import { getStartups } from "@/lib/api/startups";
import React from "react";
import { StartupTable } from "@/components/StartupTable";

const AdminManageStartupsPage = async () => {
    const startups = await getStartups();
    
    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-foreground">
                    Admin Manage Startups ({startups.length})
                </h1>
            </div>
            
            <StartupTable startups={startups} />
        </div>
    );
}; 

export default AdminManageStartupsPage;