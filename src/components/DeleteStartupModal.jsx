'use client';

import { Button } from "@heroui/react";

export default function DeleteStartupModal({ startupName, isDeleting, onCancel, onConfirm }) {
    return (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-black/70 backdrop-blur-sm">
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 w-full max-w-sm mx-4 space-y-4 shadow-2xl">
                <h2 className="text-white text-lg font-semibold">Delete Startup?</h2>
                <p className="text-zinc-400 text-sm">
                    This will permanently delete{" "}
                    <span className="text-white font-medium">{startupName}</span>.
                    This action cannot be undone.
                </p>
                <div className="flex justify-end gap-3 pt-2">
                    <Button
                        variant="bordered"
                        onPress={onCancel}
                        isDisabled={isDeleting}
                    >
                        Cancel
                    </Button>
                    <Button
                        color="danger"
                        isLoading={isDeleting}
                        onPress={onConfirm}
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    );
}
