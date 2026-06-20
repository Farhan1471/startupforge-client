'use server'

const { serverMutation } = require("../core/server")

export const createStartup = async (newStartupData) => {
    return serverMutation('api/startups', newStartupData);
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