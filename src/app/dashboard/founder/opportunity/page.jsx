import React from "react";
import { getStartupOpportunities } from "@/lib/api/opportunities";
import { getLoggedInFounderStartup } from "@/lib/api/startups";
import OpportunityManagement from "./OpportunityManagement";

const FounderStartupsPage = async () => {
  const startup = await getLoggedInFounderStartup();
  const opportunities = await getStartupOpportunities(startup?._id);

  return <OpportunityManagement initialOpportunities={opportunities} />;
};

export default FounderStartupsPage;

