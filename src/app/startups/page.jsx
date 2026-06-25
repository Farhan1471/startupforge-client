import StartupCard from "@/components/startups/startupCard";
import { getStartups } from "@/lib/api/startups";
import React from "react";

export default async function Page() {

    const startups = await getStartups();

  return (
    <div className="w-full min-h-screen bg-zinc-950 p-6 md:p-12 text-white">
      <div className="max-w-7xl mx-auto mb-10">
        <h1 className="text-4xl font-bold tracking-tight">Startups</h1>
      </div>

    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {startups && startups.map(startupItem => <StartupCard key={startupItem._id} startup={startupItem} />)}
    </div>
    </div>
  );
}