import { getOpportunity } from "@/lib/api/opportunities";
import OpportunityCard from "@/components/opportunities/OpportunityCard";
import Link from "next/link";
import { ArrowRight } from "@gravity-ui/icons";

export default async function FeaturedOpportunitiesSection() {
    let opportunities = [];

    const data = await getOpportunity();
    opportunities = Array.isArray(data) ? data.slice(0, 3) : [];
   

    if (opportunities.length === 0) return null;

    return (
        <section className="relative py-24 overflow-hidden mt-6">
            <div className="relative z-10 mx-auto max-w-7xl px-6">
                <div className="flex items-end justify-between mb-12">
                    <div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
                            Latest Opportunities
                        </h2>
                    </div>
                    <Link
                        href="/opportunities"
                        className="hidden sm:flex items-center gap-2 text-lg font-semibold text-zinc-400 hover:text-white transition-colors duration-200 group"
                    >
                        Browse all roles
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {opportunities.map((opportunity) => {
                        const id = opportunity._id?.$oid || opportunity._id;
                        return <OpportunityCard key={id} opportunity={opportunity} />;
                    })}
                </div>

                <div className="mt-10 flex sm:hidden justify-center">
                    <Link
                        href="/opportunities"
                        className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200 group"
                    >
                        Browse all roles
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
