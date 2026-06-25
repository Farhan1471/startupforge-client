import { serverFetch, serverMutation } from "../core/server";

export const getUsers = async () => {
    return serverFetch(`api/users`);
}

export const updateUser = async (id, data) => {
    return serverMutation(`api/users/${id}`, data, 'PATCH');
}