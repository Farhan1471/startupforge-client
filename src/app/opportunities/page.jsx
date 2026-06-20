import OpportunityCard from "@/components/opportunities/OpportunityCard";
import { getOpportunity } from "@/lib/api/opportunities";
import React from "react";

export default async function Page() {

    const opportunities = await getOpportunity();

  return (
    <div className="w-full min-h-screen bg-zinc-950 p-6 md:p-12 text-white">
      <div className="max-w-7xl mx-auto mb-10">
        <h1 className="text-4xl font-bold tracking-tight">Open Positions</h1>
        <p className="text-zinc-400 mt-2">Discover your next engineering challenge.</p>
      </div>

    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {opportunities && opportunities.map(opportunityItem => <OpportunityCard key={opportunityItem._id} opportunity={opportunityItem} />)}
    </div>
    </div>
  );
}