"use client";

import { useState } from "react";
import { Card, Button, Link, TextField, Label, InputGroup, Input } from "@heroui/react";
import { Radio, RadioGroup } from "@heroui/react";
import { Eye, EyeSlash, Person, At, ShieldKeyhole, ArrowUpToLine } from "@gravity-ui/icons";
import { authClient, signUp } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";

export default function SignupPage() {
    // Form fields
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("collaborator");

    const [logoUrl, setLogoUrl] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [errors, setErrors] = useState({});

    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirect") || "/";

    // UI States
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const toggleVisibility = () => setIsVisible(!isVisible);

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

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }
        if (!/[A-Z]/.test(password)) {
            setError("Password must contain at least one uppercase letter (A-Z).");
            return;
        }
        if (!/[a-z]/.test(password)) {
            setError("Password must contain at least one lowercase letter (a-z).");
            return;
        }

        setIsLoading(true);

        try {
            const { data, error: authError } = await signUp.email({
                email,
                password,
                name,
                role,
                image: logoUrl || undefined,
            });

            if (authError) {
                setError(authError.message || "Something went wrong during signup.");
            } else {
                setSuccess("Account created successfully! Welcome.");
                setName("");
                setEmail("");
                setPassword("");
                router.push(redirectTo);
            }
        } catch (err) {
            setError("An unexpected network error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    // Google Login
    const handleGoogleLogin = async () => {
        await authClient.signIn.social({
            provider: "google",
        });
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4 py-8">
            <Card className="w-full max-w-md p-6 shadow-sm border border-zinc-200 dark:border-zinc-800">

                {/* Header Container */}
                <div className="flex flex-col items-center justify-center gap-1 pb-6 border-b border-zinc-100 dark:border-zinc-800 mb-6 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">Create an account</h1>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">Fill in the fields below to get started</p>
                </div>

                {/* Form Body */}
                <form onSubmit={handleSignup} className="flex flex-col gap-5">

                    {/* Name Field */}
                    <TextField isRequired name="name" className="flex flex-col gap-1.5">
                        <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Name</Label>
                        <InputGroup className="flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 bg-zinc-50 dark:bg-zinc-900 focus-within:border-primary transition-colors">
                            <Person className="text-zinc-400 pointer-events-none" size={16} />
                            <Input
                                type="text"
                                placeholder="Enter your full name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-transparent py-2 text-sm outline-none border-none text-zinc-900 dark:text-zinc-100"
                            />
                        </InputGroup>
                    </TextField>

                    {/* Profile Image */}
                    <div>
                        <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Profile Picture</Label>

                        <label className="flex items-center gap-4 mt-2 cursor-pointer">
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={handleLogoUpload}
                            />

                            <div className="w-12 h-12 border border-dashed border-zinc-300 dark:border-zinc-700 flex items-center justify-center rounded-xl bg-zinc-50 dark:bg-zinc-900 overflow-hidden">
                                {logoUrl ? (
                                    <img
                                        src={logoUrl}
                                        className="w-full h-full object-cover"
                                        alt="Avatar preview"
                                    />
                                ) : (
                                    <ArrowUpToLine className="text-zinc-500" size={16} />
                                )}
                            </div>

                            <div>
                                <p className="text-sm text-zinc-700 dark:text-zinc-300">
                                    {isUploading ? "Uploading..." : "Upload profile picture"}
                                </p>
                                <p className="text-xs text-zinc-500 dark:text-zinc-500">
                                    PNG / JPG up to 5MB
                                </p>

                                {errors.logo && (
                                    <p className="text-xs text-red-500 dark:text-red-400 mt-0.5">
                                        {errors.logo}
                                    </p>
                                )}
                            </div>
                        </label>
                    </div>

                    {/* Email Field */}
                    <TextField isRequired name="email" type="email" className="flex flex-col gap-1.5">
                        <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Email Address</Label>
                        <InputGroup className="flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 bg-zinc-50 dark:bg-zinc-900 focus-within:border-primary transition-colors">
                            <At className="text-zinc-400 pointer-events-none" size={16} />
                            <Input
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-transparent py-2 text-sm outline-none border-none text-zinc-900 dark:text-zinc-100"
                            />
                        </InputGroup>
                    </TextField>

                    {/* Password Field */}
                    <TextField isRequired name="password" className="flex flex-col gap-1.5">
                        <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Password</Label>
                        <InputGroup className="flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 bg-zinc-50 dark:bg-zinc-900 focus-within:border-primary transition-colors">
                            <ShieldKeyhole className="text-zinc-400 pointer-events-none" size={16} />
                            <Input
                                type={isVisible ? "text" : "password"}
                                placeholder="Choose a password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-transparent py-2 text-sm outline-none border-none text-zinc-900 dark:text-zinc-100"
                            />
                            <button
                                className="focus:outline-none text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition"
                                type="button"
                                onClick={toggleVisibility}
                                aria-label="toggle password visibility"
                            >
                                {isVisible ? <EyeSlash size={18} /> : <Eye size={18} />}
                            </button>
                        </InputGroup>
                    </TextField>

                    {/* Role Selection */}
                    <div className="flex flex-col gap-2.5">
                        <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Subscription plan</Label>
                        <RadioGroup defaultValue="collaborator" name="role" onChange={value => setRole(value)} orientation="horizontal">
                            <Radio value="collaborator">
                                <Radio.Content>
                                    <Radio.Control>
                                        <Radio.Indicator />
                                    </Radio.Control>
                                    Collaborator
                                </Radio.Content>
                            </Radio>
                            <Radio value="founder">
                                <Radio.Content>
                                    <Radio.Control>
                                        <Radio.Indicator />
                                    </Radio.Control>
                                    Founder
                                </Radio.Content>
                            </Radio>
                        </RadioGroup>
                    </div>

                    {/* Dynamic Status Error Box */}
                    {error && (
                        <div className="p-3.5 text-xs font-medium rounded-xl bg-red-100/60 dark:bg-red-950/50 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900">
                            <span className="font-semibold">Error:</span> {error}
                        </div>
                    )}

                    {success && (
                        <div className="p-3.5 text-xs font-medium rounded-xl bg-emerald-100/60 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900">
                            <span className="font-semibold">Success:</span> {success}
                        </div>
                    )}

                    {/* Action Button */}
                    <Button
                        type="submit"
                        color="primary"
                        className="w-full font-semibold rounded-xl text-sm h-12"
                        isLoading={isLoading}
                        isDisabled={isLoading}
                    >
                        Register
                    </Button>

                    <div className="space-y-4">
                        <Button
                            onPress={handleGoogleLogin}
                            variant="bordered"
                            className="w-full h-12 font-bold rounded-xl border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors gap-3 text-zinc-900 dark:text-zinc-100"
                        >
                            <img
                                width={20}
                                height={20}
                                src="https://www.google.com/favicon.ico"
                                className="w-5 h-5"
                                alt="Google"
                            />
                            Sign in with Google
                        </Button>
                    </div>

                    {/* Navigation Option */}
                    <div className="text-center pt-4 border-t border-zinc-100 dark:border-zinc-800 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                        Already have an account?{" "}
                        <Link href={`/auth/signin?redirect=${redirectTo}`} className="font-medium cursor-pointer text-sm text-blue-600 dark:text-blue-400">
                            Login instead
                        </Link>
                    </div>

                </form>
            </Card>
        </div>
    );
}