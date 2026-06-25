'use client'
import React, { useState } from 'react';
import { Form, Button, TextField, Label, Input, Description, FieldError } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { submitApplication } from '@/lib/actions/applications';

const ApplyForOpportunity = ({ opportunity, collaborator }) => {
    const router = useRouter();
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);

        const payload = {
            Opportunity_id: opportunity?._id,
            Applicatnt_id: collaborator?._id,
            Applicant_name: collaborator.name,
            Applicant_email: collaborator?.email,
            Portfolio_link: data.Portfolio_link,
            Motivation: data.Motivation,
            Status: "Pending",
            Opportunity: opportunity.roleTitle,
            Startup_name: opportunity.startupName,
            startup_id: opportunity.startupId
        };

        console.log("Submitting Application:", payload);

        const res = await submitApplication(payload);
        if (res?.insertedId) {
            setIsSubmitted(true);
        } else {
            alert("Something went wrong. Please try again.");
        }
    };

    if (isSubmitted) {
        return (
            <div className="mt-8 max-w-2xl mx-auto p-8 bg-zinc-900 rounded-xl border border-zinc-800 text-center text-white shadow-lg space-y-6">
                <div className="mx-auto w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center border border-emerald-500/20 text-xl font-bold">
                    ✓
                </div>
                <div className="space-y-2">
                    <h2 className="text-2xl font-semibold tracking-tight text-white">
                        Application Submitted Successfully
                    </h2>
                    <p className="text-zinc-400 text-sm max-w-md mx-auto">
                        Your application for <span className="text-zinc-200 font-medium">{opportunity?.roleTitle}</span> has been sent over to the team at {opportunity?.startupName}.
                    </p>
                </div>
                <div className="pt-2">
                    <Button 
                        onPress={() => router.push('/opportunities')}
                        className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm transition-colors cursor-pointer shadow-md shadow-blue-900/20"
                    >
                        View More Opportunities
                    </Button>
                </div>
            </div>
        );
    }

    // Default Form View
    return (
        <div className="mt-8 max-w-2xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800 text-white shadow-lg">
            <div className="mb-6 border-b border-zinc-800 pb-4">
                <h1 className="text-2xl font-semibold text-white">
                    Apply for this {opportunity?.roleTitle || "Opportunity"}
                </h1>
                <p className="text-zinc-400 mt-2 text-sm leading-relaxed">
                    {opportunity?.description}
                </p>
                {collaborator && (
                    <p className="text-xs text-zinc-500 mt-2">
                        Applying as: <span className="text-zinc-300 font-medium">{collaborator.name}</span>
                    </p>
                )}
            </div>

            <Form onSubmit={handleSubmit} className="flex flex-col gap-6">
                
                <TextField name="Portfolio_link" isRequired type="url" className="w-full flex flex-col gap-1.5">
                    <Label className="text-sm font-medium text-zinc-200">
                        Portfolio Link
                    </Label>
                    <Input 
                        placeholder="https://yourportfolio.com" 
                        className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <Description className="text-xs text-zinc-500">
                        Provide a link to your personal website, GitHub, or Behance.
                    </Description>
                    <FieldError className="text-xs text-red-400 mt-1" />
                </TextField>

                {/* Motivation Field */}
                <TextField name="Motivation" isRequired className="w-full flex flex-col gap-1.5">
                    <Label className="text-sm font-medium text-zinc-200">
                        Statement of Motivation
                    </Label>
                    <Input 
                        placeholder="Why do you want to join this opportunity?" 
                        className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <Description className="text-xs text-zinc-500">
                        Briefly explain your interest and what you bring to the table.
                    </Description>
                    <FieldError className="text-xs text-red-400 mt-1" />
                </TextField>

                {/* Form Action Buttons */}
                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-zinc-800">
                    <Button 
                        type="submit" 
                        className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm transition-colors cursor-pointer shadow-md shadow-blue-900/20"
                    >
                        Submit Application
                    </Button>
                    <Button 
                        type="reset" 
                        className="px-5 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-medium rounded-lg text-sm transition-colors cursor-pointer"
                    >
                        Reset
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default ApplyForOpportunity;