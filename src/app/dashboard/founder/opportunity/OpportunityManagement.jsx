'use client';

import React, { useState } from "react";
import {
    Form,
    Fieldset,
    TextField,
    Label,
    Input,
    Button,
    Chip,
    Table,
    toast,
    FieldError,
} from "@heroui/react";
import { PencilToSquare, TrashBin } from "@gravity-ui/icons";
import { updateOpportunity, deleteOpportunity } from "@/lib/actions/opportunities";
import DeleteOpportunityModal from "@/components/DeleteOpportunityModal";

const textInputClass =
    "w-full bg-zinc-900/50 border border-zinc-800 text-white rounded-lg px-3 py-2.5 outline-none placeholder:text-zinc-600 focus:border-zinc-700 transition";

const selectClass =
    "w-full bg-zinc-900/50 border border-zinc-800 text-white rounded-lg px-3 py-2.5 outline-none focus:border-zinc-700 transition appearance-none cursor-pointer";



export default function OpportunityManagement({ initialOpportunities }) {
    const [opportunities, setOpportunities] = useState(initialOpportunities);
    const [editingOpportunity, setEditingOpportunity] = useState(null);
    const [errors, setErrors] = useState({});
    const [deletingOpportunity, setDeletingOpportunity] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleEditClick = (opp) => {
        setErrors({});
        setEditingOpportunity(opp);
    };

    const handleCancel = () => {
        setEditingOpportunity(null);
        setErrors({});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const roleTitle = formData.get("roleTitle");
        const requiredSkills = formData.get("requiredSkills");
        const workType = formData.get("workType");
        const commitmentLevel = formData.get("commitmentLevel");
        const deadline = formData.get("deadline");

        const newErrors = {};
        if (!roleTitle) newErrors.roleTitle = "Role title is required";
        if (!requiredSkills) newErrors.requiredSkills = "Required skills are required";
        if (!workType) newErrors.workType = "Work type is required";
        if (!commitmentLevel) newErrors.commitmentLevel = "Commitment level is required";
        if (!deadline) newErrors.deadline = "Deadline is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const updatedData = {
            roleTitle,
            requiredSkills,
            workType,
            commitmentLevel,
            deadline,
            startupId: editingOpportunity.startupId,
            startupName: editingOpportunity.startupName,
            startupLogo: editingOpportunity.startupLogo,
            status: editingOpportunity.status,
        };

        const payload = await updateOpportunity(editingOpportunity._id, updatedData);

        if (payload?.modifiedCount > 0) {
            const index = opportunities.findIndex(opp => opp._id === editingOpportunity._id);
            const newList = [...opportunities];
            newList[index] = { ...newList[index], ...updatedData };
            setOpportunities(newList);
            toast.success("Opportunity updated successfully!");
            setEditingOpportunity(null);
            setErrors({});
        } else {
            toast.error("Failed to update opportunity. Please try again.");
        }
    };

    // EDIT FORM VIEW 
    if (editingOpportunity) {
        return (
            <div className="max-w-3xl mx-auto my-8 bg-zinc-950 p-8 border border-zinc-900 rounded-xl">
                <Form onSubmit={handleSubmit} validationErrors={errors}>
                    <Fieldset className="space-y-5 w-full">

                        <legend className="text-white text-xl font-semibold border-b border-zinc-900 pb-3 w-full">
                            Edit Opportunity
                        </legend>

                        {/* Role Title & Required Skills */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <TextField
                                name="roleTitle"
                                defaultValue={editingOpportunity.roleTitle || ""}
                            >
                                <Label className="text-zinc-400">Role Title</Label>
                                <Input className={textInputClass} placeholder="e.g. Frontend Developer" />
                                {errors.roleTitle && (
                                    <FieldError>{errors.roleTitle}</FieldError>
                                )}
                            </TextField>

                            <TextField
                                name="requiredSkills"
                                defaultValue={editingOpportunity.requiredSkills || ""}
                            >
                                <Label className="text-zinc-400">Required Skills</Label>
                                <Input className={textInputClass} placeholder="React, Node.js, ..." />
                                {errors.requiredSkills && (
                                    <FieldError>{errors.requiredSkills}</FieldError>
                                )}
                            </TextField>
                        </div>

                        {/* Work Type & Commitment Level */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                            {/* Work Type */}
                            <div className="flex flex-col gap-1">
                                <label className="text-zinc-400 text-sm">Work Type</label>
                                <select
                                    name="workType"
                                    defaultValue={editingOpportunity.workType || ""}
                                    className={selectClass}
                                >
                                    <option value="" disabled>Select work type</option>
                                    <option value="remote">Remote</option>
                                    <option value="hybrid">Hybrid</option>
                                    <option value="onsite">On-site</option>
                                </select>
                                {errors.workType && (
                                    <p className="text-xs text-danger mt-1">{errors.workType}</p>
                                )}
                            </div>

                            {/* Commitment Level */}
                            <div className="flex flex-col gap-1">
                                <label className="text-zinc-400 text-sm">Commitment Level</label>
                                <select
                                    name="commitmentLevel"
                                    defaultValue={editingOpportunity.commitmentLevel || ""}
                                    className={selectClass}
                                >
                                    <option value="" disabled>Select commitment level</option>
                                    <option value="full-time">Full-time</option>
                                    <option value="part-time">Part-time</option>
                                    <option value="weekends">Weekends Only</option>
                                    <option value="flexible">Flexible</option>
                                </select>
                                {errors.commitmentLevel && (
                                    <p className="text-xs text-danger mt-1">{errors.commitmentLevel}</p>
                                )}
                            </div>
                        </div>

                        {/* Deadline */}
                        <TextField
                            name="deadline"
                            defaultValue={editingOpportunity.deadline ? editingOpportunity.deadline.slice(0, 10) : ""}
                        >
                            <Label className="text-zinc-400">Deadline</Label>
                            <Input type="date" className={textInputClass} />
                            {errors.deadline && (
                                <FieldError>{errors.deadline}</FieldError>
                            )}
                        </TextField>

                    </Fieldset>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 mt-6">
                        <Button type="button" variant="bordered" onPress={handleCancel}>
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-white text-black font-semibold">
                            Save
                        </Button>
                    </div>
                </Form>
            </div>
        );
    }

    // TABLE  
    return (
        <div className="relative p-6 max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
                <h1 className="text-2xl font-bold">Manage Opportunities</h1>
            </div>

            <Table>
                <Table.ResizableContainer>
                    <Table.Content aria-label="Opportunities management table" className="min-w-[800px]">
                        <Table.Header>
                            <Table.Column isRowHeader defaultWidth="2fr" id="role" minWidth={180}>
                                Role Title
                                <Table.ColumnResizer />
                            </Table.Column>
                            <Table.Column defaultWidth="1.5fr" id="skills" minWidth={150}>
                                Required Skills
                                <Table.ColumnResizer />
                            </Table.Column>
                            <Table.Column defaultWidth="1fr" id="type" minWidth={120}>
                                Work Type / Level
                                <Table.ColumnResizer />
                            </Table.Column>
                            <Table.Column defaultWidth="1.2fr" id="actions" minWidth={140}>
                                Actions
                            </Table.Column>
                        </Table.Header>

                        <Table.Body>
                            {opportunities.map((opportunity) => (
                                <Table.Row key={opportunity._id}>
                                    <Table.Cell>
                                        <span className="font-medium text-default-900">
                                            {opportunity.roleTitle}
                                        </span>
                                    </Table.Cell>

                                    <Table.Cell>
                                        <span className="text-default-600">
                                            {opportunity.requiredSkills}
                                        </span>
                                    </Table.Cell>

                                    <Table.Cell>
                                        <div className="flex flex-col gap-0.5">
                                            <span className="capitalize text-sm text-default-800">
                                                {opportunity.workType}
                                            </span>
                                            <span className="capitalize text-xs text-default-400">
                                                {opportunity.commitmentLevel}
                                            </span>
                                        </div>
                                    </Table.Cell>

                                    <Table.Cell>
                                        <div className="flex items-center gap-2">
                                            <Button
                                                isIconOnly
                                                size="sm"
                                                variant="light"
                                                aria-label="Edit opportunity"
                                                title="Edit opportunity"
                                                className="text-default-500"
                                                onPress={() => handleEditClick(opportunity)}
                                            >
                                                <PencilToSquare width={16} height={16} />
                                            </Button>
                                            <Button
                                                isIconOnly
                                                size="sm"
                                                variant="light"
                                                aria-label="Delete opportunity"
                                                title="Delete opportunity"
                                                className="text-danger"
                                                onPress={() => setDeletingOpportunity(opportunity)}
                                            >
                                                <TrashBin width={16} height={16} />
                                            </Button>
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Content>
                </Table.ResizableContainer>
            </Table>

            {/* Delete Confirmation Modal */}
            {deletingOpportunity && (
                <DeleteOpportunityModal
                    opportunityTitle={deletingOpportunity.roleTitle}
                    isDeleting={isDeleting}
                    onCancel={() => setDeletingOpportunity(null)}
                    onConfirm={async () => {
                        setIsDeleting(true);
                        try {
                            const result = await deleteOpportunity(deletingOpportunity._id);
                            if (result?.deletedCount > 0) {
                                toast.success("Opportunity deleted successfully.");
                                setOpportunities(opportunities.filter(opp => opp._id !== deletingOpportunity._id));
                                setDeletingOpportunity(null);
                            } else {
                                toast.error("Failed to delete opportunity. Please try again.");
                            }
                        } catch {
                            toast.error("Something went wrong.");
                        } finally {
                            setIsDeleting(false);
                        }
                    }}
                />
            )}
        </div>
    );
}
