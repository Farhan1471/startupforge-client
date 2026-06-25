"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import { updateUser } from "@/lib/api/users";
import { useRouter } from "next/navigation";
import { Pencil, ArrowUpToLine } from "@gravity-ui/icons";

const ProfilePage = () => {
    const { data: session, isPending, refetch } = useSession();
    const router = useRouter();
    const user = session?.user;

    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [bio, setBio] = useState("");
    const [skills, setSkills] = useState("");
    const [loading, setLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });

    useEffect(() => {
        if (user) {
            console.log("Logged in user session:", user);
            setName(user.name || "");
            setImage(user.image || "");
            setBio(user.bio || "");
            setSkills(Array.isArray(user.skills) ? user.skills.join(", ") : (user.skills || ""));
        }
    }, [user]);

    if (isPending) {
        return (
            <div className="min-h-screen bg-zinc-950 text-zinc-400 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-sm font-medium text-zinc-500">Loading profile...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-zinc-950 text-zinc-400 flex items-center justify-center">
                <p>Please log in to view your profile.</p>
            </div>
        );
    }

    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            setMessage({ type: "error", text: "Image size must be less than 5MB" });
            return;
        }

        setIsUploading(true);
        setMessage({ type: "", text: "" });

        try {
            const formData = new FormData();
            formData.append("image", file);

            const API_KEY = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API;

            const res = await fetch(
                `https://api.imgbb.com/1/upload?key=${API_KEY || ""}`,
                { method: "POST", body: formData }
            );

            const data = await res.json();

            if (data.success) {
                setImage(data.data.url);
                setMessage({ type: "success", text: "Image uploaded successfully!" });
            } else {
                setMessage({ type: "error", text: "Image upload failed. Please try pasting a direct URL." });
            }
        } catch (error) {
            console.error("Upload error:", error);
            setMessage({ type: "error", text: "Network error during image upload." });
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: "", text: "" });

        const skillsArray = skills
            .split(",")
            .map((s) => s.trim())
            .filter((s) => s.length > 0);

        const updatedData = {
            name,
            image,
            bio,
            skills: skillsArray
        };

        const userId = user.id || user._id?.$oid || user._id;
        console.log("Updating profile database for user:", userId, updatedData);


            const result = await updateUser(userId, updatedData);
            console.log("Update database response:", result);

            if (result && (result.modifiedCount > 0 || result.acknowledged || result.ok)) {
                setMessage({ type: "success", text: "Profile updated successfully!" });
                setIsEditing(false);
                await refetch();
                router.refresh();
            } else {
                setMessage({ type: "error", text: "Failed to update profile or no changes made." });
            }

    };

    const handleCancel = () => {
        setIsEditing(false);
        setName(user.name || "");
        setImage(user.image || "");
        setBio(user.bio || "");
        setSkills(Array.isArray(user.skills) ? user.skills.join(", ") : (user.skills || ""));
    };

    const userName = user.name || "Anonymous User";
    const userImage = user.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80";
    const userBio = user.bio || "No bio added yet. Tell the community about yourself!";
    const userSkills = Array.isArray(user.skills) ? user.skills : [];

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 md:p-12">
            <div className="max-w-3xl mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl">
                
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-zinc-800/80">
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                        <div className="relative group flex-shrink-0 bg-zinc-800 p-1 rounded-full border border-zinc-700/50">
                            <img
                                src={userImage}
                                alt={`${userName}'s avatar`}
                                className="w-20 h-20 rounded-full object-cover"
                            />
                        </div>
                        
                        <div className="text-center sm:text-left space-y-1">
                            <h1 className="text-2xl font-bold text-white tracking-tight">
                                {userName}
                            </h1>
                            <p className="text-xs text-zinc-500">{user.email}</p>
                        </div>
                    </div>

                    {!isEditing && (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl bg-zinc-850 hover:bg-zinc-800 text-white border border-zinc-700/50 transition-all cursor-pointer"
                        >
                            <Pencil className="w-4 h-4 text-zinc-400" />
                            Edit Profile
                        </button>
                    )}
                </div>

                {isEditing ? (
                    <form onSubmit={handleSubmit} className="pt-8 space-y-6">
                        {message.text && (
                            <div className={`p-4 rounded-xl text-sm font-medium border ${
                                message.type === "success" 
                                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                                    : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                            }`}>
                                {message.text}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-blue-400 block">
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-zinc-950/80 border border-zinc-800 text-white rounded-xl px-4 py-3 outline-none placeholder:text-zinc-600 focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700 transition text-sm"
                                placeholder="Your Name"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-blue-400 block">
                                Profile Image
                            </label>

                            <label className="flex items-center gap-4 mt-2 cursor-pointer bg-zinc-950/40 p-4 border border-zinc-800 rounded-xl hover:bg-zinc-950/60 transition-all">
                                <input
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    disabled={isUploading}
                                />

                                <div className="w-16 h-16 border border-dashed border-zinc-700 flex items-center justify-center rounded-full overflow-hidden flex-shrink-0 bg-zinc-800">
                                    {image ? (
                                        <img
                                            src={image}
                                            className="w-full h-full object-cover"
                                            alt="Avatar Preview"
                                        />
                                    ) : (
                                        <ArrowUpToLine className="text-zinc-500 w-5 h-5" />
                                    )}
                                </div>

                                <div>
                                    <p className="text-sm text-zinc-300 font-medium">
                                        {isUploading ? "Uploading..." : "Upload Profile Picture"}
                                    </p>
                                    <p className="text-xs text-zinc-500 mt-0.5">
                                        PNG / JPG up to 5MB
                                    </p>
                                </div>
                            </label>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-blue-400 block">
                                Skills & Expertise
                            </label>
                            <input
                                type="text"
                                value={skills}
                                onChange={(e) => setSkills(e.target.value)}
                                className="w-full bg-zinc-950/80 border border-zinc-800 text-white rounded-xl px-4 py-3 outline-none placeholder:text-zinc-600 focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700 transition text-sm"
                                placeholder="React, Node.js, Python, Tailwind"
                            />
                            <p className="text-[11px] text-zinc-500 leading-normal">
                                Separate skills with commas.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-blue-400 block">
                                About Me (Bio)
                            </label>
                            <textarea
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                className="w-full bg-zinc-950/80 border border-zinc-800 text-white rounded-xl p-4 outline-none placeholder:text-zinc-600 focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700 transition text-sm min-h-[120px] resize-y"
                                placeholder="Tell us about yourself..."
                                rows={4}
                            />
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800/80">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="px-5 py-2.5 text-sm font-semibold rounded-xl bg-zinc-800 hover:bg-zinc-750 text-white border border-zinc-700/50 transition-all cursor-pointer"
                                disabled={loading || isUploading}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-5 py-2.5 text-sm font-semibold rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-all cursor-pointer shadow-lg shadow-blue-600/10 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                disabled={loading || isUploading}
                            >
                                {loading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Saving...
                                    </>
                                ) : (
                                    "Save Changes"
                                )}
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="pt-8 space-y-6">
                        {message.text && (
                            <div className={`p-4 rounded-xl text-sm font-medium border ${
                                message.type === "success" 
                                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                                    : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                            }`}>
                                {message.text}
                            </div>
                        )}

                        <div className="space-y-2">
                            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-400">
                                About Me
                            </h2>
                            <p className="text-sm text-zinc-300 leading-relaxed max-w-prose whitespace-pre-wrap">
                                {userBio}
                            </p>
                        </div>

                        <div className="space-y-3">
                            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-400">
                                Skills & Expertise
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {userSkills.length > 0 ? (
                                    userSkills.map((skill, index) => (
                                        <span 
                                            key={index}
                                            className="text-xs font-medium text-zinc-200 bg-zinc-800/60 border border-zinc-700/50 px-3 py-1.5 rounded-xl"
                                        >
                                            {skill}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-sm text-zinc-400">No skills added yet.</span>
                                )}
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default ProfilePage;