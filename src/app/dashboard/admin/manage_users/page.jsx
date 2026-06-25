'use client'
import React, { useEffect, useState } from "react";
import { getUsers, updateUser } from "@/lib/api/users";
import { Chip, Button } from "@heroui/react";
import ClipLoader from "react-spinners/ClipLoader";

const ManageUsersPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getUsers();
                const nonAdmins = Array.isArray(data) ? data.filter(u => u.role !== "admin") : [];
                setUsers(nonAdmins);
            } catch (error) {
                console.error("Failed to fetch users:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const handleToggleBlock = async (userId, currentStatus) => {
        const newStatus = !currentStatus;
        setUsers(prevUsers =>
            prevUsers.map(user =>
                (user._id?.$oid ?? user._id) === userId ? { ...user, isBlocked: newStatus } : user
            )
        );

        try {
            await updateUser(userId, { isBlocked: newStatus });
        } catch (error) {
            console.error("Failed to update user block status:", error);
            setUsers(prevUsers =>
                prevUsers.map(user =>
                    (user._id?.$oid ?? user._id) === userId ? { ...user, isBlocked: currentStatus } : user
                )
            );
        }
    };

    if (loading) {
        return (
            <div className="min-h-[50vh] flex items-center justify-center">
                <ClipLoader color="#6366f1" size={48} speedMultiplier={0.8} />
            </div>
        );
    }
    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
                <h1 className="text-2xl font-bold text-white">Manage Users</h1>
                <Chip color="primary" variant="flat" size="sm">
                    {users.length} {users.length === 1 ? "user" : "users"}
                </Chip>
            </div>

            {users.length === 0 ? (
                <div className="py-16 text-center border border-dashed border-zinc-800 rounded-xl bg-zinc-950">
                    <p className="text-zinc-400 text-lg">No users found</p>
                    <p className="text-zinc-600 text-sm">There are no registered users yet.</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px]">
                        <thead>
                            <tr>
                                <th className="text-left text-zinc-400 pb-4 border-b border-zinc-800 px-2">Name</th>
                                <th className="text-left text-zinc-400 pb-4 border-b border-zinc-800 px-2">Email</th>
                                <th className="text-left text-zinc-400 pb-4 border-b border-zinc-800 px-2">Role</th>
                                <th className="text-left text-zinc-400 pb-4 border-b border-zinc-800 px-2">Status</th>
                                <th className="text-left text-zinc-400 pb-4 border-b border-zinc-800 px-2">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map((user) => (
                                <tr
                                    key={user._id?.$oid ?? user._id}
                                    className="border-b border-zinc-800/50 hover:bg-zinc-900/30 transition-colors"
                                >
                                    {/* Name */}
                                    <td className="py-4 px-2 text-zinc-100 font-semibold">
                                        {user.name}
                                    </td>

                                    {/* Email */}
                                    <td className="py-4 px-2 text-zinc-400">
                                        {user.email}
                                    </td>

                                    {/* Role */}
                                    <td className="py-4 px-2 text-zinc-200 capitalize">
                                        {user.role}
                                    </td>

                                    {/* Status badge */}
                                    <td className="py-4 px-2">
                                        <Chip
                                            color={user.isBlocked ? "danger" : "success"}
                                            size="sm"
                                            variant="flat"
                                            className="capitalize"
                                        >
                                            {user.isBlocked ? "Blocked" : "Active"}
                                        </Chip>
                                    </td>

                                    {/* Block / Unblock button */}
                                    <td className="py-4 px-2">
                                        <Button
                                            size="sm"
                                            color={user.isBlocked ? "success" : "danger"}
                                            variant="flat"
                                            className="text-xs font-semibold cursor-pointer"
                                            onPress={() => handleToggleBlock(user._id?.$oid ?? user._id, user.isBlocked)}
                                        >
                                            {user.isBlocked ? "Unblock" : "Block"}
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ManageUsersPage;