"use client";

import React from "react";
import { motion } from "motion/react";
import { Persons, ShieldKeyhole, Thunderbolt } from "@gravity-ui/icons";

export default function WhyJoinSection() {
  const benefits = [
    {
      id: 1,
      icon: <ShieldKeyhole className="h-6 w-6 text-blue-400" />,
      title: "Verified Opportunities",
      description: "Skip the spam. Every startup and position listed on our platform is manually verified for funding, structure, and active hiring.",
    },
    {
      id: 2,
      icon: <Persons className="h-6 w-6 text-violet-400" />,
      title: "Direct Founder Access",
      description: "No recruitment agencies or middle-men. Communicate directly with co-founders and decision-makers.",
    },
    {
      id: 3,
      icon: <Thunderbolt className="h-6 w-6 text-amber-400" />,
      title: "High Impact & Ownership",
      description: "Join early-stage teams where you can make a real difference. Secure competitive pay coupled with meaningful equity.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="relative overflow-hidden bg-black py-28 text-white">
      {/* Decorative background glows */}
      <div className="absolute top-1/4 left-10 h-96 w-96 rounded-full bg-violet-600/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 h-96 w-96 rounded-full bg-blue-600/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-wider text-zinc-300 uppercase mb-6">
            ✨ The Startup Advantage
          </div>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">
            Why Join{" "}
            <span className="bg-gradient-to-r from-blue-400 via-blue-400 to-blue-600 bg-clip-text text-transparent">
              StartupForge?
            </span>
          </h2>
          <p className="text-lg text-zinc-400 md:text-xl leading-relaxed">
            We bypass traditional recruiting hurdles to bring you a direct, transparent pipeline to high-impact career growth.
          </p>
        </div>

        {/* Benefits Grid */}
        <motion.div
          className="grid gap-8 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {benefits.map((benefit) => (
            <motion.div
              key={benefit.id}
              variants={cardVariants}
              className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.02] p-8 md:p-10 backdrop-blur-xl"
            >
              {/* Icon Holder */}
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/10 mb-8">
                {benefit.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold tracking-tight text-white mb-4">
                {benefit.title}
              </h3>

              {/* Description */}
              <p className="text-zinc-400 leading-relaxed text-sm md:text-base text-justify">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}