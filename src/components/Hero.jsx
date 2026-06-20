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
            className="mb-6 border border-white/10 bg-white/5 text-white"
          >
            ✨ Introducing Version 3.0
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
            Launch beautiful, scalable, and high-performance applications with
            a streamlined development workflow designed for modern teams.
          </p>

          {/* CTA */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              color="primary"
              endContent={<ArrowRight width={18} height={18} />}
            >
              Get Started
            </Button>

            <Button
              size="lg"
              variant="bordered"
              className="border-white/20 text-white"
            >
              View Demo
            </Button>
          </div>
        </div>
      </div>

      {/* Background Glow */}
      <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-500/20 blur-3xl" />
    </section>
  );
}