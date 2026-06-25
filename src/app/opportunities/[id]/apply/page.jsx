import { getOpportunitiesById } from "@/lib/api/opportunities";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import React from "react";
import ApplyForOpportunity from "./ApplyForOpportunity";
import { getApplicationsByApplicant } from "@/lib/api/applications";

const ApplyPage = async ({ params }) => {
    const { id } = await params;

    const user = await getUserSession();
    if(!user){
        redirect(`/auth/signin?redirect=/opportunities/${id}/apply`)
    }

    if(user.role != 'collaborator'){
        return(
            <div className="w-full min-h-screen flex items-center justify-center bg-zinc-950 text-white">
                    <h1 className="text-2xl font-semibold text-white">Only Collaborator can Apply. Please sign in as Collaborator to apply</h1> 
            </div>
        )
    } 

    // const applications = await getApplicationsByApplicant(user.id)

    const opportunity = await getOpportunitiesById(id);

  return (
    <div className="w-full min-h-screen bg-zinc-950 p-6 md:p-12 text-white">
      <div className="max-w-7xl mx-auto">
        <ApplyForOpportunity collaborator={user} opportunity={opportunity} />
      </div>
    </div>
  );
};

export default ApplyPage;