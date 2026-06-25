'use client';

import React from 'react';
import { Table, Avatar, toast } from '@heroui/react';
import { CircleArrowDownFill } from '@gravity-ui/icons';
import { updateStartup } from '@/lib/actions/startups';

export function StartupTable({ startups }) {

    const handleApprove = async (id) => {
        // console.log(`Approved startup with ID: ${id}`);
        const result = await updateStartup(id, {status: 'Approved'})
        if(result.modifiedCount){
            toast.success('Startup approved successfully!');
        }
    };

    const handleReject = async (id) => {
        // console.log(`Rejected startup with ID: ${id}`);
        const result = await updateStartup(id, {status: 'Rejected'})
        // if(result.modifiedCount){
        //     toast.error('Startup rejected successfully!');
        // }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
        });
    };

    // Status mapping for visual styling
    const getStatusDetails = (status) => {
        switch (status?.toLowerCase()) {
            case 'approved':
                return { color: 'text-emerald-500', label: 'Approved' };
            case 'rejected':
                return { color: 'text-rose-500', label: 'Rejected' };
            case 'pending':
            default:
                return { color: 'text-amber-500', label: 'Pending' };
        }
    };

    const getInitials = (name) => {
        return name ? name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'ST';
    };

    return (
        <div className="w-full bg-[#121214] text-neutral-200 p-6 rounded-lg">
            <Table className="bg-transparent border-none">
                <Table.ScrollContainer>
                    <Table.Content aria-label="Startup approval management table">
                        <Table.Header>
                            <Table.Column isRowHeader className="text-neutral-400 font-medium pb-4 border-b border-neutral-800">
                                Startup Name
                            </Table.Column>

                            <Table.Column className="text-neutral-400 font-medium pb-4 border-b border-neutral-800">
                                Founder Email
                            </Table.Column>

                            <Table.Column className="text-neutral-400 font-medium pb-4 border-b border-neutral-800">
                                Industry
                            </Table.Column>

                            <Table.Column className="text-neutral-400 font-medium pb-4 border-b border-neutral-800">
                                Funding Stage
                            </Table.Column>

                            <Table.Column className="text-neutral-400 font-medium pb-4 border-b border-neutral-800">
                                Plan
                            </Table.Column>

                            <Table.Column className="text-neutral-400 font-medium pb-4 border-b border-neutral-800">
                                Status
                            </Table.Column>

                            <Table.Column className="text-neutral-400 font-medium pb-4 border-b border-neutral-800">
                                Date Created
                            </Table.Column>

                            <Table.Column className="text-neutral-400 font-medium pb-4 border-b border-neutral-800 text-right">
                                Actions
                            </Table.Column>
                        </Table.Header>
                        <Table.Body>
                            {startups.map((startup) => {
                                const startupId = startup._id?.$oid || startup._id;
                                const statusInfo = getStatusDetails(startup.status);

                                return (
                                    <Table.Row key={startupId} className="border-b border-neutral-800/50 hover:bg-neutral-900/30 transition-colors">

                                        {/* Startup Avatar & Name */}
                                        <Table.Cell className="py-4 align-middle">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="rounded-md size-9 bg-neutral-800 text-neutral-300 font-semibold text-sm tracking-wider">
                                                    <Avatar.Image src={startup.logo} alt={startup.name} />
                                                    <Avatar.Fallback>{getInitials(startup.name)}</Avatar.Fallback>
                                                </Avatar>
                                                <span className="font-medium text-neutral-200">{startup.name}</span>
                                            </div>
                                        </Table.Cell>

                                        {/* Founder Email */}
                                        <Table.Cell className="py-4 align-middle text-neutral-400">
                                            {startup.founderEmail}
                                        </Table.Cell>

                                        {/* Industry Pill */}
                                        <Table.Cell className="py-4 align-middle">
                                            <span className="px-3 py-1 bg-neutral-800/60 text-neutral-400 rounded-full text-xs capitalize">
                                                {startup.industry}
                                            </span>
                                        </Table.Cell>

                                        {/* Funding Stage Pill */}
                                        <Table.Cell className="py-4 align-middle">
                                            <span className="px-3 py-1 bg-neutral-800/60 text-neutral-400 rounded-full text-xs capitalize">
                                                {startup.fundingStage}
                                            </span>
                                        </Table.Cell>

                                        {/* Plan Type */}
                                        <Table.Cell className="py-4 align-middle text-neutral-400 capitalize">
                                            {startup.plan}
                                        </Table.Cell>

                                        {/* Status Dot Dropdown indicator look */}
                                        <Table.Cell className="py-4 align-middle">
                                            <div className="flex items-center gap-2">
                                                <CircleArrowDownFill className={`w-2 h-2 ${statusInfo.color}`} />
                                                <span className={`text-sm font-medium ${statusInfo.color}`}>
                                                    {statusInfo.label}
                                                </span>
                                            </div>
                                        </Table.Cell>

                                        {/* Date Created */}
                                        <Table.Cell className="py-4 align-middle text-neutral-400">
                                            {formatDate(startup.createdAt?.$date || startup.createdAt)}
                                        </Table.Cell>

                                        {/* Actions Panel with Solid Overrides */}
                                        <Table.Cell className="py-4 align-middle text-right">
                                            <div className="flex justify-end gap-2">
                                                {startup.status?.toLowerCase() !== 'approved' && (
                                                    <button
                                                        type="button"
                                                        onClick={() => handleApprove(startupId)}
                                                        className="bg-emerald-600 hover:bg-emerald-700 text-white rounded px-3 py-1.5 text-xs font-medium transition-all active:scale-95 shadow-sm"
                                                    >
                                                        Approve
                                                    </button>
                                                )}
                                                {startup.status?.toLowerCase() !== 'rejected' && (
                                                    <button
                                                        type="button"
                                                        onClick={() => handleReject(startupId)}
                                                        className="bg-rose-600 hover:bg-rose-700 text-white rounded px-3 py-1.5 text-xs font-medium transition-all active:scale-95 shadow-sm"
                                                    >
                                                        Reject
                                                    </button>
                                                )}
                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                );
                            })}
                        </Table.Body>
                    </Table.Content>
                </Table.ScrollContainer>
            </Table>
        </div>
    );
}