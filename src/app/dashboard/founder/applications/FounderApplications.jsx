'use client';

import React, { useState } from "react";
import { Table, Chip, Button, toast } from "@heroui/react";
import { updateApplicationStatus } from "@/lib/actions/applications";

export default function FounderApplications({ initialApplications }) {
    const [applications, setApplications] = useState(initialApplications);

    const getStatusColor = (status) => {
        const currentStatus = status?.toLowerCase();
        
        if (currentStatus === "approved" || currentStatus === "accepted") {
            return "success";
        }
        if (currentStatus === "rejected" || currentStatus === "declined") {
            return "danger";
        }
        
        return "warning";
    };


    const handleStatusUpdate = async (applicationId, newStatus) => {
        const result = await updateApplicationStatus(applicationId, newStatus);

        if (result && result.modifiedCount > 0) {
            const updatedList = applications.map((app) => {
                if (app._id === applicationId) {
                    return { ...app, Status: newStatus };
                }
                return app;
            });
            
            setApplications(updatedList);
            toast.success(`Application status updated to ${newStatus}!`);
        } else {
            toast.error("Failed to update status. Please try again.");
        }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
                <h1 className="text-2xl font-bold text-white">Applicant Applications</h1>
                <Chip color="primary" variant="flat" size="sm">
                    {applications.length} applications
                </Chip>
            </div>

            {applications.length === 0 ? (
                <div className="py-16 text-center border border-dashed border-zinc-800 rounded-xl bg-zinc-950">
                    <p className="text-zinc-400 text-lg">No applications found</p>
                    <p className="text-zinc-600 text-sm">Nobody has applied to your opportunities yet.</p>
                </div>
            ) : (
                <Table className="bg-transparent border-none">
                    <Table.ScrollContainer>
                        <Table.Content aria-label="Founder applications table">
                            <Table.Header>
                                <Table.Column isRowHeader className="text-zinc-400 pb-4 border-b border-zinc-800">Candidate Name</Table.Column>
                                <Table.Column className="text-zinc-400 pb-4 border-b border-zinc-800">Email Address</Table.Column>
                                <Table.Column className="text-zinc-400 pb-4 border-b border-zinc-800">Role Applied For</Table.Column>
                                <Table.Column className="text-zinc-400 pb-4 border-b border-zinc-800">Portfolio</Table.Column>
                                <Table.Column className="text-zinc-400 pb-4 border-b border-zinc-800 max-w-[300px]">Motivation</Table.Column>
                                <Table.Column className="text-zinc-400 pb-4 border-b border-zinc-800">Status</Table.Column>
                                <Table.Column className="text-zinc-400 pb-4 border-b border-zinc-800 text-right">Actions</Table.Column>
                            </Table.Header>
                            <Table.Body>
                                {applications.map((app) => (
                                    <Table.Row key={app._id} className="border-b border-zinc-800/50 hover:bg-zinc-900/30 transition-colors">
                                        
                                        <Table.Cell className="py-4 text-zinc-100 font-semibold">{app.Applicant_name || "N/A"}</Table.Cell>
                                        <Table.Cell className="py-4 text-zinc-400">{app.Applicant_email || "N/A"}</Table.Cell>
                                        
                                        <Table.Cell className="py-4 text-zinc-200">
                                            <Chip size="sm" variant="flat">{app.Opportunity || "N/A"}</Chip>
                                        </Table.Cell>
                                        
                                        <Table.Cell className="py-4">
                                            {app.Portfolio_link ? (
                                                <a 
                                                    href={app.Portfolio_link} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer" 
                                                    className="text-blue-500 hover:text-blue-400 underline text-sm transition-colors"
                                                >
                                                    View Link
                                                </a>
                                            ) : (
                                                <span className="text-zinc-500">N/A</span>
                                            )}
                                        </Table.Cell>
                                        
                                        <Table.Cell className="py-4 text-zinc-300 max-w-[300px] truncate" title={app.Motivation}>
                                            {app.Motivation || "N/A"}
                                        </Table.Cell>
                                        <Table.Cell className="py-4">
                                            <Chip color={getStatusColor(app.Status)} size="sm" variant="flat" className="capitalize">
                                                {app.Status || "Pending"}
                                            </Chip>
                                        </Table.Cell>
                                        
                                        <Table.Cell className="py-4 text-right">
                                            {app.Status?.toLowerCase() === "pending" ? (
                                                <div className="flex justify-end gap-2">
                                                    <Button 
                                                        size="sm" 
                                                        color="success" 
                                                        className="text-white text-xs font-semibold cursor-pointer"
                                                        onPress={() => handleStatusUpdate(app._id, "Approved")}
                                                    >
                                                        Approve
                                                    </Button>
                                                    <Button 
                                                        size="sm" 
                                                        color="danger" 
                                                        className="text-white text-xs font-semibold cursor-pointer"
                                                        onPress={() => handleStatusUpdate(app._id, "Rejected")}
                                                    >
                                                        Reject
                                                    </Button>
                                                </div>
                                            ) : (
                                                <span className="text-xs text-zinc-500">Completed</span>
                                            )}
                                        </Table.Cell>

                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table.Content>
                    </Table.ScrollContainer>
                </Table>
            )}
        </div>
    );
}
