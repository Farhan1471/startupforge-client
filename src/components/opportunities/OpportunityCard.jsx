import React from "react";
import { Card, Link } from "@heroui/react";
import { ArrowRight } from "@gravity-ui/icons";

export default function OpportunityCard({ opportunity }) {
    if (!opportunity) return null;

    const opportunityId = opportunity._id?.$oid || opportunity._id;

    return (
        <Card className="p-6 w-full max-w-[400px] bg-zinc-900 border border-zinc-800/80 text-zinc-100 rounded-2xl shadow-md hover:border-zinc-700/80 hover:shadow-lg transition-all duration-200">
            
            {/* Header: Logo, Company & Title */}
            <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex flex-col gap-1">
                    <span className="text-xs font-medium tracking-wide text-zinc-400">
                        {opportunity.startupName || "Unknown Startup"}
                    </span>
                    <h3 className="text-xl font-semibold text-white tracking-tight leading-snug">
                        {opportunity.roleTitle}
                    </h3>
                </div>
                
                {opportunity.startupLogo && (
                    <div className="flex-shrink-0 bg-zinc-800 p-1.5 rounded-xl border border-zinc-700/50">
                        <img
                            src={opportunity.startupLogo}
                            alt={`${opportunity.startupName || "Startup"} logo`}
                            className="w-9 h-9 object-contain rounded-lg"
                        />
                    </div>
                )}
            </div>

            {/* Body: Skills Description */}
            <div className="mb-6">
                <p className="text-sm text-zinc-400 line-clamp-2 leading-relaxed">
                    {opportunity.requiredSkills}
                </p>
            </div>

            {/* Footer: Deadline & Action Button */}
            <div className="flex items-center justify-between pt-4 border-t border-zinc-800/80">
                {opportunity.deadline ? (
                    <div className="flex flex-col gap-0.5">
                        <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">
                            Deadline
                        </span>
                        <span className="text-xs font-medium text-zinc-300">
                            {opportunity.deadline}
                        </span>
                    </div>
                ) : <div />}

                <Link
                    href={`/opportunities/${opportunityId}`}
                    className="group flex items-center gap-2 bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white px-5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border border-blue-500/20 hover:border-blue-600"
                >
                    Join Team
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
            </div>

        </Card>
    );
}