import React from "react";
import AddOpportunityForm from "./AddOpportunityForm";
import { getLoggedInFounderStartup } from "@/lib/api/startups";
import { getStartupOpportunities } from "@/lib/api/opportunities";
import Link from "next/link";
import { getPlansById } from "@/lib/api/plans";

const AddOpportunityPage = async () => {
    const startup = await getLoggedInFounderStartup();
    const allOpportunities = await getStartupOpportunities(startup?._id);

    const plan = await getPlansById(startup?.plan || 'free');
    console.log("plan", plan);

    const opportunityLimit = plan?.opportunityLimit || (plan?.id === "premium" ? 1000 : 3);

    const opportunities = (allOpportunities || []).filter(
        (opp) => opp.startupId && opp.startupId.toString() === startup?._id?.toString()
    );

    const withinLimits = opportunities.length < opportunityLimit;

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 md:p-10 flex flex-col items-center">
            <div className="w-full max-w-3xl flex flex-col gap-8">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-white">
                            Create Opportunity
                        </h1>
                        <p className="text-sm text-zinc-400 mt-1">
                            Publish a new role or project for your startup, <span className="text-zinc-200 font-medium">{startup?.name || "your company"}</span>.
                        </p>
                    </div>

                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex flex-col gap-2 min-w-[200px]">
                        <div className="flex items-center justify-between text-xs font-medium">
                            {/* <span className="text-zinc-400">Current Plan: <strong className="text-blue-400">{plan.name}</strong></span> */}
                            <span className="text-white">{opportunities.length} / {opportunityLimit} Used</span>
                        </div>
                        {/* Visual Progress Bar */}
                        <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                            <div
                                className={`h-full rounded-full transition-all duration-500 ${opportunities.length >= opportunityLimit ? 'bg-amber-500' : 'bg-blue-500'
                                    }`}
                                style={{ width: `${Math.min((opportunities.length / opportunityLimit) * 100, 100)}%` }}
                            />
                        </div>
                    </div>
                </div>

                {withinLimits ? (
                    <div className="">
                        <AddOpportunityForm startup={startup} />
                    </div>
                ) : (

                    <div className="w-full py-16 px-6 flex flex-col items-center justify-center text-center bg-zinc-900/40 border border-dashed border-zinc-800 rounded-2xl">
                        <div className="w-14 h-14 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-full flex items-center justify-center text-2xl font-bold mb-4 shadow-lg shadow-amber-500/5">
                            ⚡
                        </div>

                        <h2 className="text-xl font-semibold text-white max-w-md leading-snug"></h2>

                        <p className="text-zinc-400 text-sm mt-2 max-w-sm">
                            Upgrade to a premium plan to publish unlimited open roles, unlock advanced screening filters, and get featured placement.
                        </p>

                        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                            <Link
                                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl text-sm transition-all shadow-lg shadow-blue-600/10 hover:shadow-blue-500/20 text-center min-w-[160px]"
                                href={"/plans"}
                            >
                                Buy Premium
                            </Link>
                            <Link
                                className="px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-medium rounded-xl text-sm transition-all border border-zinc-800 text-center min-w-[160px]"
                                href={"/dashboard/founder"}
                            >
                                Back to Dashboard
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddOpportunityPage;