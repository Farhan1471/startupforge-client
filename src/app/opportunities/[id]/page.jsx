import React from 'react';
import { Button, Link, Chip } from '@heroui/react';
import {
    MapPin,
    Briefcase,
    Calendar,
    ArrowUpRight,
    Clock,
    Star,
} from '@gravity-ui/icons';
import { getOpportunitiesById } from '@/lib/api/opportunities';

const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

const getDaysLeft = (deadline) => {
    if (!deadline) return null;
    const diff = Math.ceil((new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24));
    if (diff < 0) return 'Expired';
    if (diff === 0) return 'Last day!';
    return `${diff} days left`;
};

function MetaItem({ icon: Icon, label, value, highlight }) {
    return (
        <div className="flex items-start gap-3 group">
            <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                <Icon className="text-blue-400 w-4 h-4" />
            </div>
            <div className="min-w-0">
                <span className="text-xs text-zinc-500 block mb-0.5 uppercase tracking-widest">{label}</span>
                <span className={`text-sm font-semibold capitalize ${highlight ? 'text-blue-300' : 'text-zinc-100'}`}>
                    {value || 'N/A'}
                </span>
            </div>
        </div>
    );
}

function SkillTag({ skill }) {
    return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-zinc-300 font-medium hover:border-blue-500/40 hover:text-blue-200 transition-all cursor-default">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
            {skill.trim()}
        </span>
    );
}

const Page = async ({ params }) => {
    const { id } = await params;
    const opportunity = await getOpportunitiesById(id);

    if (!opportunity) {
        return (
            <div className="w-full min-h-screen bg-black flex flex-col justify-center items-center text-white p-6">
                <div className="text-6xl mb-6">🔍</div>
                <h1 className="text-2xl font-bold text-white mb-2">Position Not Found</h1>
                <p className="text-zinc-400 text-lg text-center max-w-md">
                    This opportunity could not be found or is no longer active.
                </p>
                <Link href="/opportunities" className="mt-6 text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium">
                    ← Browse all opportunities
                </Link>
            </div>
        );
    }

    const skills = opportunity.requiredSkills
        ? opportunity.requiredSkills.split(/[,;]/).filter(Boolean)
        : [];

    const daysLeft = getDaysLeft(opportunity.deadline);
    const isUrgent = daysLeft && (daysLeft.includes('last') || (parseInt(daysLeft) <= 7 && !isNaN(parseInt(daysLeft))));

    return (
        <main className="w-full min-h-screen bg-black text-zinc-100">

            {/* Hero Banner */}
            <div className="relative overflow-hidden border-b border-white/10">
                {/* Ambient glow */}
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute left-1/2 -top-40 -translate-x-1/2 w-[600px] h-[500px] rounded-full bg-blue-500/20 blur-[120px]" />
                </div>

                <div className="relative max-w-6xl mx-auto px-6 md:px-12 lg:px-16 py-14 md:py-20">

                    <Link
                        href="/opportunities"
                        className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-blue-400 transition-colors mb-8 group"
                    >
                        <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
                        All Opportunities
                    </Link>

                    <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-8">

                        {/* Logo */}
                        {opportunity.startupLogo && (
                            <div className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-white/5 border border-white/10 p-3 shadow-xl">
                                <img
                                    src={opportunity.startupLogo}
                                    alt={`${opportunity.startupName} logo`}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        )}

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2 flex-wrap">
                                <span className="text-base font-medium text-zinc-400">
                                    {opportunity.startupName}
                                </span>
                                {opportunity.status && (
                                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${opportunity.status === 'active'
                                            ? 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30'
                                            : 'text-zinc-400 bg-white/5 border-white/10'
                                        } capitalize`}>
                                        {opportunity.status}
                                    </span>
                                )}
                                {isUrgent && (
                                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full border text-amber-400 bg-amber-400/10 border-amber-400/30">
                                        ⚡ Closing Soon
                                    </span>
                                )}
                            </div>

                            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight mb-4">
                                <span className="bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
                                    {opportunity.roleTitle}
                                </span>
                            </h1>

                            <div className="flex flex-wrap gap-2 mt-2">
                                {opportunity.commitmentLevel && (
                                    <span className="flex items-center gap-1.5 text-sm text-zinc-300 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
                                        <Briefcase className="w-3.5 h-3.5 text-blue-400" />
                                        {opportunity.commitmentLevel}
                                    </span>
                                )}
                                {opportunity.workType && (
                                    <span className="flex items-center gap-1.5 text-sm text-zinc-300 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
                                        <MapPin className="w-3.5 h-3.5 text-blue-400" />
                                        {opportunity.workType}
                                    </span>
                                )}
                                {opportunity.deadline && (
                                    <span className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg border ${isUrgent
                                            ? 'text-amber-300 bg-amber-400/10 border-amber-400/30'
                                            : 'text-zinc-300 bg-white/5 border-white/10'
                                        }`}>
                                        <Clock className="w-3.5 h-3.5" />
                                        {daysLeft}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/*  Body  */}
            <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">

                {/*  LEFT: Details  */}
                <div className="lg:col-span-2 space-y-10">

                    {/* Skills Section */}
                    {skills.length > 0 && (
                        <section className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-1 h-5 rounded-full bg-gradient-to-b from-blue-400 to-blue-600" />
                                <h2 className="text-lg font-semibold text-white">Required Skills</h2>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill, i) => (
                                    <SkillTag key={i} skill={skill} />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Requirements */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-1 h-5 rounded-full bg-gradient-to-b from-blue-400 to-blue-600" />
                            <h2 className="text-lg font-semibold text-white">Requirements</h2>
                        </div>
                        <div className="relative rounded-2xl overflow-hidden">
                            <div className="absolute inset-0 bg-white/5 border border-white/10 rounded-2xl" />
                            <div className="relative p-6 md:p-8">
                                <p className="text-zinc-300 text-base leading-relaxed whitespace-pre-wrap">
                                    {opportunity.requiredSkills || 'Standard industry qualifications apply. Please reach out for more details.'}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Apply Card */}
                    <Link
                        href={`/opportunities/${id}/apply`}
                        className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-800 no-underline hover:no-underline transition-all"
                        endContent={<ArrowUpRight className="w-4 h-4" />}
                    >
                        Join Team
                    </Link>
                </div>

                {/*  RIGHT: Sidebar  */}
                <aside className="lg:sticky lg:top-6 space-y-5">

                    {/* Overview Card */}
                    <div className="rounded-2xl bg-white/5 border border-white/10 p-6 space-y-5 backdrop-blur-sm">
                        <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-widest">Opportunity Overview</h3>

                        <div className="space-y-4">
                            {opportunity.commitmentLevel && (
                                <MetaItem
                                    icon={Briefcase}
                                    label="Commitment"
                                    value={opportunity.commitmentLevel}
                                />
                            )}
                            {opportunity.workType && (
                                <MetaItem
                                    icon={MapPin}
                                    label="Work Type"
                                    value={opportunity.workType}
                                />
                            )}
                            {opportunity.deadline && (
                                <MetaItem
                                    icon={Calendar}
                                    label="Application Deadline"
                                    value={formatDate(opportunity.deadline)}
                                    highlight={isUrgent}
                                />
                            )}
                            {opportunity.status && (
                                <MetaItem
                                    icon={Star}
                                    label="Status"
                                    value={opportunity.status}
                                    highlight={opportunity.status === 'active'}
                                />
                            )}
                        </div>
                    </div>
                </aside>
            </div>
        </main>
    );
};

export default Page;