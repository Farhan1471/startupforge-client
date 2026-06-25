"use client"; 

import React from "react";
import { Button, Card } from "@heroui/react";

const BlockPage = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4">
      {/* Absolute blurry background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 bg-danger-200/40 dark:bg-danger-900/20 blur-3xl rounded-full pointer-events-none" />

      <Card className="max-w-md w-full p-6 shadow-xl border border-zinc-200/50 dark:border-zinc-800/50 backdrop-blur-md bg-white/80 dark:bg-zinc-900/80">
        
        {/* Replaced CardHeader with a standard div */}
        <div className="flex flex-col items-center gap-2 pb-4">
          <div className="p-4 bg-danger-50 dark:bg-danger-950/50 text-danger rounded-full mb-2 animate-pulse">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z"
              />
            </svg>
          </div>
          
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Access Restricted
          </h1>
        </div>

        {/* Replaced CardBody with a standard div */}
        <div className="flex flex-col items-center text-center gap-6">
          <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
            Your accounthas been temporarily blocked.
          </p>
            
            <Button 
              color="default" 
              variant="light"
              className="w-full font-medium border border-zinc-200 dark:border-zinc-800"
              onPress={() => window.location.href = "/"}
            >
              Go Back Home
            </Button>

        </div>
      </Card>
    </div>
  );
};

export default BlockPage;