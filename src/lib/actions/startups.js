'use server'

import { revalidatePath } from "next/cache";

const { serverMutation } = require("../core/server")

export const createStartup = async (newStartupData) => {
    return serverMutation('api/startups', newStartupData);
}

export const updateStartup = async (id, data) => {
    const result = await serverMutation(`api/startup/${id}`, data, 'PATCH');
    revalidatePath('/dashboard/admin/manage_startups');
    return result;
}

export const deleteStartup = async (id) => {
    return serverMutation(`api/startup/${id}`, {}, 'DELETE');
}

// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// export const createStartup = async (newStartupData) => {
//     const res = await fetch(`${baseUrl}/api/startups`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newStartupData),
//     })

//     return res.json();
// }