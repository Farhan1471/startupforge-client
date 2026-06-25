import React from 'react';
import Link from 'next/link';

export default function UnauthorizedPage() {
    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center p-6 select-none">
            
            {/* Main Error Card */}
            <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl text-center relative overflow-hidden">
                
                {/* Decorative Top Accent Glow */}
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-amber-500 to-orange-500" />
                
                {/* Shield / Lock Alert Badge */}
                <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl shadow-xl shadow-amber-500/5">
                    🔒
                </div>

                {/* HTTP Code Marker */}
                <p className="text-xs font-mono tracking-widest text-amber-500 uppercase font-bold mb-1">
                    Error 401
                </p>

                <h1 className="text-2xl font-bold tracking-tight text-white mb-2">
                    Access Unauthorized
                </h1>
                
                <p className="text-sm text-zinc-400 mb-8 max-w-sm mx-auto leading-relaxed">
                    You do not have permission to view this resource. Please make sure you are logged into the correct founder or collaborator account.
                </p>

                <div>
                    <Link 
                        href="/" 
                        className="w-full bg-zinc-850 hover:bg-zinc-800 border border-white text-zinc-300 font-medium h-11 rounded-xl text-sm transition-all flex items-center justify-center cursor-pointer"
                    >
                        Return Home
                    </Link>
                </div>

                <p className="text-xs text-zinc-500 mt-8 border-t border-zinc-800/80 pt-4">
                    Think this is a mistake? Contact support.
                </p>
            </div>
        </div>
    );
}