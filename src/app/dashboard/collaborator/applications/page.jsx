import { getApplicationsByEmail } from "@/lib/api/applications";
import { getUserSession } from "@/lib/core/session";
import React from "react";
import { Table, Chip, Link } from "@heroui/react";

const Application = async () => {
    const user = await getUserSession();
    const opportunities = await getApplicationsByEmail(user?.email) || [];

    const getStatusColor = (status) => {
        const s = status?.toLowerCase();
        if (s === "accepted" || s === "approved") return "success";
        if (s === "rejected" || s === "declined" || s === "failed") return "danger";
        return "warning";
    }

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
                <h1 className="text-2xl font-bold">My Applications</h1>
                <Chip color="primary" variant="flat" size="sm">
                    {opportunities.length} {opportunities.length === 1 ? "application" : "applications"}
                </Chip>
            </div>

            {opportunities.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 px-4 rounded-2xl border border-dashed border-zinc-800 bg-zinc-950 text-center">
                    <p className="text-zinc-400 text-lg font-medium">No applications found</p>
                    <p className="text-zinc-600 text-sm mt-1">You haven't applied to any opportunities yet.</p>
                </div>
            ) : (
                <Table>
                    <Table.ResizableContainer>
                        <Table.Content aria-label="Applications table" className="min-w-[800px]">
                            <Table.Header>
                                <Table.Column isRowHeader defaultWidth="2fr" id="startup" minWidth={150}>
                                    Startup
                                    <Table.ColumnResizer />
                                </Table.Column>
                                <Table.Column defaultWidth="2fr" id="opportunity" minWidth={150}>
                                    Opportunity
                                    <Table.ColumnResizer />
                                </Table.Column>
                                <Table.Column defaultWidth="1.5fr" id="date" minWidth={120}>
                                    Date Applied
                                    <Table.ColumnResizer />
                                </Table.Column>
                                <Table.Column defaultWidth="1fr" id="status" minWidth={100}>
                                    Status
                                    <Table.ColumnResizer />
                                </Table.Column>
                            </Table.Header>

                            <Table.Body>
                                {opportunities.map((app) => {
                                    const dateStr = app.createdAt ? new Date(app.createdAt.$date || app.createdAt).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                    }) : "N/A";

                                    return (
                                        <Table.Row key={app._id?.$oid || app._id}>
                                            {/* Startup Name */}
                                            <Table.Cell>
                                                <span className="font-semibold text-default-900">{app.Startup_name || "N/A"}</span>
                                            </Table.Cell>

                                            {/* Opportunity/Role */}
                                            <Table.Cell>
                                                <span className="font-medium text-default-800">{app.Opportunity || "N/A"}</span>
                                            </Table.Cell>

                                            {/* Date Applied */}
                                            <Table.Cell>
                                                <span className="text-default-600">{dateStr}</span>
                                            </Table.Cell>

                                            {/* Status */}
                                            <Table.Cell>
                                                <Chip
                                                    color={getStatusColor(app.Status)}
                                                    size="sm"
                                                    variant="soft"
                                                    className="capitalize"
                                                >
                                                    {app.Status || "Pending"}
                                                </Chip>
                                            </Table.Cell>
                                        </Table.Row>
                                    );
                                })}
                            </Table.Body>
                        </Table.Content>
                    </Table.ResizableContainer>
                </Table>
            )}
        </div>
    );
};

export default Application; 