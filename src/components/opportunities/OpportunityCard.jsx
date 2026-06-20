import React from "react";
import { Card, Link } from "@heroui/react";
import {
    MapPin,
    Briefcase,
    CircleDollar,
    ArrowRight
} from "@gravity-ui/icons";

export default function OpportunityCard({ opportunity }) {
    if (!opportunity) return null;

    const opportunityId = opportunity._id?.$oid || opportunity._id;

    return (
        <Card className="p-6 w-full max-w-[440px] border border-white/10 bg-white/5 text-zinc-100 rounded-[32px] shadow-2xl backdrop-blur-sm">

            {/* Header */}
            <Card.Header className="flex flex-col items-start gap-4 p-0 pb-3">
                <div className="flex items-center gap-3">
                    {opportunity.startupLogo && (
                        <img
                            src={opportunity.startupLogo}
                            alt={`${opportunity.startupName || "Startup"} logo`}
                            className="w-8 h-8 object-contain rounded-md"
                        />
                    )}

                    <span className="text-lg font-medium text-zinc-300">
                        {opportunity.startupName || "Unknown Startup"}
                    </span>
                </div>

                <Card.Title className="text-3xl font-semibold tracking-tight leading-tight">
                    <span className="bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
                        {opportunity.roleTitle}
                    </span>
                </Card.Title>

                <Card.Description className="text-base text-zinc-400 line-clamp-2">
                    {opportunity.requiredSkills}
                </Card.Description>
            </Card.Header>

            {/* Content */}
            <Card.Content className="flex flex-col gap-5 p-0 py-4">

                {/* Tags */}
                <div className="flex flex-wrap gap-2">

                    {/* Work Type */}
                    {opportunity.workType && (
                        <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                            <Briefcase className="text-blue-400 w-4 h-4" />
                            <span className="text-sm font-medium text-zinc-200 capitalize">
                                {opportunity.workType}
                            </span>
                        </div>
                    )}

                    {/* Commitment */}
                    {opportunity.commitmentLevel && (
                        <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                            <CircleDollar className="text-blue-400 w-4 h-4" />
                            <span className="text-sm font-medium text-zinc-200 capitalize">
                                {opportunity.commitmentLevel}
                            </span>
                        </div>
                    )}

                    {/* Deadline */}
                    {opportunity.deadline && (
                        <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                            <MapPin className="text-blue-400 w-4 h-4" />
                            <span className="text-sm font-medium text-zinc-200">
                                Deadline: {opportunity.deadline}
                            </span>
                        </div>
                    )}

                </div>

                {/* Status */}
                <div className="text-xs text-zinc-500 border-t border-white/10 pt-3">
                    <p>
                        <strong className="text-zinc-400">Status:</strong>{" "}
                        {opportunity.status}
                    </p>

                    <p>
                        <strong className="text-zinc-400">Skills:</strong>{" "}
                        {opportunity.requiredSkills}
                    </p>
                </div>
            </Card.Content>

            {/* Footer */}
            <Card.Footer className="p-0 pt-4">
                <Link
                    href={`/opportunities/${opportunityId}`}
                    className="group flex items-center gap-2 text-white hover:text-blue-300 transition"
                >
                    Apply Now
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </Card.Footer>

        </Card>
    );
}