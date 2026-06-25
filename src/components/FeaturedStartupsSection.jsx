import { getStartups } from "@/lib/api/startups";
import StartupCard from "@/components/startups/startupCard";
import Link from "next/link";
import { ArrowRight } from "@gravity-ui/icons";

export default async function FeaturedStartupsSection() {
    let startups = [];


    const data = await getStartups();
    startups = Array.isArray(data) ? data.slice(0, 3) : [];

    if (startups.length === 0) return null;

    return (
        <section className="relative bg-black py-24 overflow-hidden">
            {/* Subtle gradient glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 mx-auto max-w-7xl px-6">
                {/* Section Header */}
                <div className="flex items-end justify-between mb-12">
                    <div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
                            Featured Startups
                        </h2>
                    </div>
                    <Link
                        href="/startups"
                        className="hidden sm:flex items-center gap-2 text-lg font-semibold text-zinc-400 hover:text-white transition-colors duration-200 group"
                    >
                        View all startups
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {startups.map((startup) => {
                        const id = startup._id?.$oid || startup._id;
                        return <StartupCard key={id} startup={startup} />;
                    })}
                </div>

                <div className="mt-10 flex sm:hidden justify-center">
                    <Link
                        href="/startups"
                        className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200 group"
                    >
                        View all startups
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
