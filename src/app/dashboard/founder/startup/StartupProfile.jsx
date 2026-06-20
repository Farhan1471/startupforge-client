'use client';

import React, { useState } from "react";
import {
    Form,
    Fieldset,
    TextField,
    TextArea,
    Label,
    Input,
    Button,
    FieldError,
    toast
} from "@heroui/react";

import {
    Factory,
    ArrowRight,
    Pencil,
    ArrowUpToLine
} from "@gravity-ui/icons";
import { createStartup } from "@/lib/actions/startups";

const textInputClass =
    "w-full bg-zinc-900/50 border border-zinc-800 text-white rounded-lg px-3 py-2.5 outline-none placeholder:text-zinc-600 focus:border-zinc-700 transition";

const textAreaClass =
    "w-full bg-zinc-900/50 border border-zinc-800 text-white rounded-lg p-3 resize-none";

export default function StartupProfile({ founder, founderEmail, founderStartup }) {
    const [startup, setStartup] = useState(founderStartup);
    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState({});

    const [logoUrl, setLogoUrl] = useState("");
    const [isUploading, setIsUploading] = useState(false);

    // status
    const getStatusStyles = (status) => {
        switch (status) {
            case "Approved":
                return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
            case "Rejected":
                return "bg-rose-500/10 text-rose-400 border-rose-500/20";
            default:
                return "bg-amber-500/10 text-amber-400 border-amber-500/20";
        }
    };

    // image upload
    const handleLogoUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            setErrors((p) => ({ ...p, logo: "Max 5MB allowed" }));
            return;
        }

        setIsUploading(true);

        try {
            const formData = new FormData();
            formData.append("image", file);

            const API_KEY = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API;

            const res = await fetch(
                `https://api.imgbb.com/1/upload?key=${API_KEY}`,
                { method: "POST", body: formData }
            );

            const data = await res.json();

            if (data.success) {
                setLogoUrl(data.data.url);
                setErrors((p) => ({ ...p, logo: null }));
            } else {
                setErrors((p) => ({ ...p, logo: "Upload failed" }));
            }
        } catch {
            setErrors((p) => ({ ...p, logo: "Network error" }));
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const name = formData.get("name");
        const industry = formData.get("industry");
        const fundingStage = formData.get("fundingStage");
        const founderEmail = formData.get("founderEmail");
        const description = formData.get("description");

        // simple validation
        const newErrors = {};

        if (!name) newErrors.name = "Startup name is required";
        if (!industry) newErrors.industry = "Industry is required";
        if (!fundingStage) newErrors.fundingStage = "Funding stage is required";
        if (!founderEmail) newErrors.founderEmail = "Founder email is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const newStartupData = {
            name,
            industry,
            fundingStage,
            founderEmail,
            description,
            logo: logoUrl || startup?.logo || "",
            status: startup ? startup.status : "Pending",
            founderId: founder?.id
        };
        // const newStartupData = {
        //     startup_name, 
        //     industry,
        //     funding_stage,
        //     founder_email,
        //     description,
        //     logo: logoUrl || startup?.logo || "",
        //     status: startup ? startup.status : "Pending",
        //     founderId: founder?.id || founder?._id 
        // }; 
  
        setStartup(newStartupData);
 
        console.log("Submitted Startup Profile Data:", newStartupData);

        const payload = await createStartup(newStartupData);

        if (payload.insertedId) {
            toast.success("Startup profile created successfully!");
        }


        setErrors({});
        setIsEditing(false);
    };






    if (!startup?._id && !isEditing) {
        return (
            <div className="max-w-xl mx-auto my-10 p-8 bg-zinc-950 border border-zinc-900 rounded-xl text-center">
                <Factory className="mx-auto text-zinc-500" />
                <h2 className="text-white text-xl mt-4">No Startup Profile</h2>
                <p className="text-zinc-500 text-sm mt-2">
                    Create your startup profile to get started.
                </p>

                <Button
                    onPress={() => setIsEditing(true)}
                    className="mt-5 bg-white text-black font-semibold"
                >
                    Register Startup <ArrowRight className="ml-2" />
                </Button>
            </div>
        );
    }

    if (startup && !isEditing) {
        return (
            <div className="max-w-3xl mx-auto my-8 bg-zinc-950 border border-zinc-900 rounded-xl p-8 space-y-6">

                <div className="flex justify-between items-center">
                    <div className="flex gap-4 items-center">
                        {startup.logo ? (
                            <img
                                src={startup.logo}
                                className="w-14 h-14 rounded-lg object-cover"
                            />
                        ) : (
                            <div className="w-14 h-14 bg-zinc-900 rounded-lg" />
                        )}

                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-white text-xl font-bold">
                                    {startup.name}
                                </h1>

                                <span className={`text-xs px-2 py-1 rounded-full border ${getStatusStyles(startup.status)}`}>
                                    {startup.status}
                                </span>
                            </div>

                            <p className="text-zinc-500 text-sm">
                                {startup.industry}
                            </p>
                        </div>
                    </div>

                    <Button variant="bordered" onPress={() => setIsEditing(true)}>
                        <Pencil size={14} /> Edit
                    </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-zinc-900/30 p-3 rounded">
                        <p className="text-zinc-500 text-xs">Funding Stage</p>
                        <p className="text-white">{startup.fundingStage}</p>
                    </div>

                    <div className="bg-zinc-900/30 p-3 rounded">
                        <p className="text-zinc-500 text-xs">Founder Email</p>
                        <p className="text-white">{startup.founderEmail}</p>
                    </div>
                </div>

                {startup.description && (
                    <p className="text-zinc-300 text-sm leading-relaxed">
                        {startup.description}
                    </p>
                )}
            </div>
        );
    }


    return (
        <div className="max-w-3xl mx-auto my-8 bg-zinc-950 p-8 border border-zinc-900 rounded-xl">

            <Form onSubmit={handleSubmit} validationErrors={errors}>

                <Fieldset className="space-y-5">

                    <legend className="text-white text-xl font-semibold border-b border-zinc-900 pb-3">
                        {startup ? "Edit Startup" : "Create Startup"}
                    </legend>

                    {/* ROW 1 */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <TextField name="name" defaultValue={startup?.name || ""}>
                            <Label className="text-zinc-400">Startup Name</Label>
                            <Input className={textInputClass} />
                            {errors.name && <FieldError>{errors.name}</FieldError>}
                        </TextField>

                        <TextField name="industry" defaultValue={startup?.industry || ""}>
                            <Label className="text-zinc-400">Industry</Label>
                            <Input className={textInputClass} />
                            {errors.industry && <FieldError>{errors.industry}</FieldError>}
                        </TextField>
                    </div>

                    {/* ROW 2 */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <TextField name="fundingStage" defaultValue={startup?.fundingStage || ""}>
                            <Label className="text-zinc-400">Funding Stage</Label>
                            <Input className={textInputClass} />
                            {errors.fundingStage && <FieldError>{errors.fundingStage}</FieldError>}
                        </TextField>

                        <TextField name="founderEmail" defaultValue={founderEmail}>
                            <Label className="text-zinc-400">Founder Email</Label>
                            <Input className={textInputClass} />
                            {errors.founderEmail && <FieldError>{errors.founderEmail}</FieldError>}
                        </TextField>
                    </div>

                    {/* ROW 3 - LOGO */}
                    <div>
                        <Label className="text-zinc-400">Logo</Label>

                        <label className="flex items-center gap-4 mt-2 cursor-pointer">
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={handleLogoUpload}
                            />

                            <div className="w-12 h-12 border border-dashed border-zinc-700 flex items-center justify-center rounded">
                                {logoUrl ? (
                                    <img
                                        src={logoUrl}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <ArrowUpToLine className="text-zinc-500" />
                                )}
                            </div>

                            <div>
                                <p className="text-sm text-zinc-300">
                                    {isUploading ? "Uploading..." : "Upload logo"}
                                </p>
                                <p className="text-xs text-zinc-600">
                                    PNG / JPG up to 5MB
                                </p>

                                {errors.logo && (
                                    <p className="text-xs text-red-400">
                                        {errors.logo}
                                    </p>
                                )}
                            </div>
                        </label>
                    </div>

                    {/* ROW 4 */}
                    <TextField name="description" defaultValue={startup?.description || ""}>
                        <Label className="text-zinc-400">Description</Label>
                        <TextArea rows={3} className={textAreaClass} />
                    </TextField>

                </Fieldset>

                {/* ACTIONS */}
                <div className="flex justify-end gap-3 mt-6">
                    {startup && (
                        <Button
                            type="button"
                            variant="bordered"
                            onPress={() => setIsEditing(false)}
                        >
                            Cancel
                        </Button>
                    )}

                    <Button type="submit" className="bg-white text-black">
                        {startup ? "Save" : "Create"}
                    </Button>
                </div>

            </Form>
        </div>
    );
}