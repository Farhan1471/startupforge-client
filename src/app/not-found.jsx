"use client";

import React from 'react';
import Link from 'next/link';
import { House } from '@gravity-ui/icons';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center p-6 selection:bg-blue-500/30 relative overflow-hidden">
            {/* Subtle Background Radial Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.03)_0%,transparent_50%)] pointer-events-none" />

            <div className="text-center space-y-8 max-w-md z-10">
                <img src="/404.svg" alt="Not Found" />
                
                {/* Big 404 Text */}
                <div className="relative select-none">
                    <h1 className="text-[120px] sm:text-[150px] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-950 leading-none">
                        404
                    </h1>
                </div>

                {/* Copywriting Details */}
                <div className="space-y-3">
                    <h2 className="text-xl sm:text-2xl font-bold text-zinc-100 tracking-tight">
                        Page not found
                    </h2>
                    <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                        The page you are looking for doesn't exist or has been moved. Let's get you back on track.
                    </p>
                </div>

                {/* CTA Button */}
                <div className="pt-2">
                    <Link 
                        href="/" 
                        className="inline-flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-100 font-medium text-sm py-3 px-6 rounded-xl border border-zinc-800 shadow-lg transition duration-200 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-950"
                    >
                        <House className="w-4 h-4 text-blue-400" />
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}