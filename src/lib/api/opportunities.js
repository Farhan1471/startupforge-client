import { serverFetch } from "../core/server";

export const getOpportunity = async () => {
    return serverFetch('api/opportunities')
}

export const getOpportunitiesById = async (id) => {
    return serverFetch(`api/opportunities/${id}`)
}

export const getStartupOpportunities = async (startupId) => {
    return serverFetch(`api/opportunities?startupId=${startupId}`);
}