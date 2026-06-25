import React from "react";
import { getLoggedInFounderStartup } from "@/lib/api/startups";
import { getApplicationsByStartup } from "@/lib/api/applications";
import FounderApplications from "./FounderApplications";

const FounderApplicationsPage = async () => {
    const startup = await getLoggedInFounderStartup();
    const startupId = startup?._id;

    let applications = [];
    if (startupId) {
        const fetchedData = await getApplicationsByStartup(startupId);
        if (fetchedData) {
            applications = fetchedData;
        }
    }

    return (
        <div className="w-full">
            <FounderApplications initialApplications={applications} />
        </div>
    );
};

export default FounderApplicationsPage;