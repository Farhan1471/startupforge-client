'use server'

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";

export const submitApplication = async (applicationData) => {
    return serverMutation('api/applications', applicationData);
} 

export const updateApplicationStatus = async (id, status) => {
    const result = await serverMutation(`api/applications/${id}`, { Status: status }, 'PATCH');
    revalidatePath('/dashboard/founder/applications');
    return result;
} 