
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const serverFetch = async (path) => {
    const res = await fetch(`${baseUrl}/${path}`);
    const text = await res.text();
    try {
        return text ? JSON.parse(text) : null;
    } catch (err) {
        console.error("Error parsing JSON in serverFetch:", err);
        return null;
    }
}

export const serverMutation = async (path, data, method = 'POST') => {
    const res = await fetch(`${baseUrl}/${path}`, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    const text = await res.text();
    try {
        return text ? JSON.parse(text) : null;
    } catch (err) {
        console.error("Error parsing JSON in serverMutation:", err);
        return null;
    }
}