import { serverFetch } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getOpportunity = async () => {
    return serverFetch('api/opportunities')
}

export const getOpportunitiesById = async (id) => {
    return serverFetch(`api/opportunities/${id}`)
}

export const getStartupOpportunities = async (opportunityId, status = 'active') => {
    const res = await fetch(`${baseUrl}/api/opportunities?opportunityId${opportunityId}&status${status}`);
    return res.json();
}