import React from "react";
import AddOpportunityForm from "./AddOpportunityForm";
import { getLoggedInFounderStartup } from "@/lib/api/startups";

const AddOpportunityPage = async () => {

    const startup = await getLoggedInFounderStartup();

    return(
        <div>
            <AddOpportunityForm startup={startup} />
        </div>
    )
}

export default AddOpportunityPage; 