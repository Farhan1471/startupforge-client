"use client";

import { Button, Chip } from "@heroui/react";
import { ArrowRight } from "@gravity-ui/icons";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-black text-white">
      <div className="mx-auto flex min-h-[65vh] max-w-7xl items-center justify-center px-6 py-16">
        <div className="max-w-3xl text-center">
          {/* Chip */}
          <Chip
            variant="flat"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-wider text-zinc-300 uppercase mb-6"
          >
            ✨ Introducing Version 1.0
          </Chip>

          {/* Heading */}
          <h1 className="mb-6 text-5xl font-bold leading-tight md:text-7xl">
            Build modern web
            <span className="block bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
              experiences faster
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mb-10 max-w-2xl text-lg text-zinc-400 md:text-xl">
            Find vetted, high-impact roles in pre-seed and seed-stage startups. Get direct access to founders, build your network, and accelerate your career.
          </p>

          {/* CTA */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              color="primary"
              className="px-8 font-semibold flex items-center gap-2 hover:cursor-pointer"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Background Glow */}
      <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-500/20 blur-3xl" />
    </section>
  );
}