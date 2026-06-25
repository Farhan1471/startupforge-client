import React from "react";
import { Card } from "@heroui/react";

export default function StartupCard({ startup }) {
    if (!startup) return null;

    const startupId = startup._id?.$oid || startup._id;

    return (
        <Card 
            as="a"
            href={`/startups/${startupId}`}
            className="p-6 w-full max-w-[400px] bg-zinc-900 border border-zinc-800/80 text-zinc-100 rounded-2xl shadow-md hover:border-zinc-700/80 hover:shadow-lg transition-all duration-200 block"
        >
            
            {/* Header: Logo, Company Name & Industry */}
            <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex flex-col gap-1">
                    <span className="text-xs font-medium tracking-wide text-zinc-400">
                        {startup.industry || "Unknown Industry"}
                    </span>
                    <h3 className="text-xl font-semibold text-white tracking-tight leading-snug">
                        {startup.name || "Unknown Startup"}
                    </h3>
                </div>
                
                {startup.logo && (
                    <div className="flex-shrink-0 bg-zinc-800 p-1.5 rounded-xl border border-zinc-700/50">
                        <img
                            src={startup.logo}
                            alt={`${startup.name || "Startup"} logo`}
                            className="w-9 h-9 object-contain rounded-lg"
                        />
                    </div>
                )}
            </div>

            {startup.description && (
                <div className="mb-6">
                    <p className="text-sm text-zinc-400 line-clamp-2 leading-relaxed">
                        {startup.description}
                    </p>
                </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-zinc-800/80 text-xs">
                {startup.founder_name && (
                    <div className="flex flex-col gap-0.5">
                        <span className="text-[10px] text-blue-400/80">
                            Founder
                        </span>
                        <span className="font-semibold uppercase tracking-wider text-white">
                            {startup.founder_name}
                        </span>
                    </div>
                )}

                {startup.team_size_needed && (
                    <div className="flex flex-col gap-0.5 items-end">
                        <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">
                            Seats Left
                        </span>
                        <span className="font-medium text-zinc-300">
                            {startup.team_size_needed} members
                        </span>
                    </div>
                )}
            </div>

        </Card>
    );
}