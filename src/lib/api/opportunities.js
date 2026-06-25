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

export const getOpportunityBySearch = async (search) => {
    return serverFetch(`api/opportunities?search=${encodeURIComponent(search)}`);
}

export const getOpportunityByFilters = async ({ search = '', workTypes = [] } = {}) => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    workTypes.forEach(t => params.append('workType', t));
    const queryString = params.toString();
    return serverFetch(`api/opportunities${queryString ? `?${queryString}` : ''}`);
}
