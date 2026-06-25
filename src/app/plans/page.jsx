import React from "react";

const Plans = () => {
    const pricingPlans = [
        {
            name: "Free Plan",
            price: "$0",
            period: "forever",
            description: "Perfect for new startups exploring talent pools and testing out roles.",
            features: [
                "Up to 3 Active Opportunities",
                "Standard Candidate Profiles",
                "Basic Application Filtering",
                "Community Support",
            ],
            buttonText: "Current Plan",
            isPremium: false,
            ctaHref: "/dashboard/founder",
        },
        {
            name: "Premium Plan",
            price: "$49",
            period: "per month",
            description: "Designed for fast-growing startups requiring constant, high-volume sourcing.",
            features: [
                "Unlimited Active Opportunities",
                "Advanced Screening & Verification",
                "Priority Matching AI Recommendations",
                "Featured Placement in Sourcing Feed",
                "Direct Integrations & Exporting",
                "24/7 Dedicated Priority Support",
            ],
            buttonText: "Upgrade to Premium",
            isPremium: true,
        },
    ];

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
            {/* Page Header */}
            <div className="text-center max-w-3xl mb-16">
                <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                    Simple, transparent pricing
                </h1>
                <p className="mt-4 text-lg text-zinc-400">
                    Find the exceptional talent your startup needs. Stay flexible on Free or scale infinitely with Premium.
                </p>
            </div>

            {/* Pricing Grid Container */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
                {pricingPlans.map((plan, index) => (
                    <div
                        key={index}
                        className={`relative rounded-2xl p-8 flex flex-col justify-between border transition-all duration-300 ${plan.isPremium
                                ? "bg-zinc-900 border-blue-500 shadow-2xl shadow-blue-500/5 ring-1 ring-blue-500"
                                : "bg-zinc-900/50 border-zinc-800 hover:border-zinc-700"
                            }`}
                    >
                        {/* Premium Glow Tag */}
                        {plan.isPremium && (
                            <span className="absolute -top-3 right-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full shadow-md">
                                Most Popular
                            </span>
                        )}

                        <div>
                            {/* Plan Info */}
                            <h2 className="text-xl font-bold text-white mb-2">{plan.name}</h2>
                            <p className="text-zinc-400 text-sm min-h-[40px] leading-relaxed mb-6">
                                {plan.description}
                            </p>

                            {/* Plan Pricing */}
                            <div className="flex items-baseline text-white mb-8 border-b border-zinc-800/80 pb-6">
                                <span className="text-5xl font-extrabold tracking-tight">{plan.price}</span>
                                <span className="ml-2 text-zinc-400 text-sm font-medium">/{plan.period}</span>
                            </div>

                            {/* Features List */}
                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start text-sm text-zinc-300">
                                        <svg
                                            className={`h-5 w-5 shrink-0 mr-3 ${plan.isPremium ? "text-blue-400" : "text-emerald-400"
                                                }`}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2.5"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* CTA Actions */}
                        <div>
                            {plan.isPremium ? (
                                <form action="/api/checkout_sessions" method="POST">
                                    <section>
                                        <button type="submit" role="link"
                                            className="block w-full text-center px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-sm shadow-lg shadow-blue-600/20 transition-all transform active:scale-[0.98]"
                                        >
                                            Checkout
                                        </button>
                                    </section>
                                </form>
                            ) : (
                                <button
                                    disabled
                                    className="block w-full text-center px-6 py-3.5 bg-zinc-800 text-zinc-500 font-medium rounded-xl text-sm cursor-not-allowed border border-zinc-700/50"
                                >
                                    {plan.buttonText}
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <p className="text-xs text-zinc-500 mt-12 max-w-md text-center">
                Need customized arrangements or massive volume management slots? <a href="mailto:support@yourdomain.com" className="text-blue-500 underline hover:text-blue-400">Contact enterprise ops</a>.
            </p>
        </div>
    );
};

export default Plans;