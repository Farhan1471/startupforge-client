'use server'

import { revalidatePath } from 'next/cache';
const { serverMutation } = require("../core/server")

export const createOpportunity = async (newOpportunityData) => {
    return serverMutation('api/opportunities', newOpportunityData);
}

export const updateOpportunity = async (id, data) => {
    const result = await serverMutation(`api/opportunity/${id}`, data, 'PATCH');
    revalidatePath('/dashboard/founder/opportunity');
    return result;
}

export const deleteOpportunity = async (id) => {
    const result = await serverMutation(`api/opportunity/${id}`, {}, 'DELETE');
    revalidatePath('/dashboard/founder/opportunity');
    return result;
}

// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
// export const createOpportunity = async (newOpportunityData) => {
//     const res = await fetch(`${baseUrl}/api/opportunities`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newOpportunityData),
//     })

//     return res.json();
// }