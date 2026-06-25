import { serverFetch } from "../core/server"

export const getApplicationsByApplicant = async (applicantId) => {
    return serverFetch(`api/applications?applicantId=${applicantId}`)
}

export const getApplicationsByEmail = async (email) => {
    return serverFetch(`api/applications?email=${email}`)
}

export const getApplicationsByStartup = async (startupId) => {
    return serverFetch(`api/applications?startupId=${startupId}`)
}