import { serverFetch } from "@/lib/core/server";

export async function GET() {
  const startups = await serverFetch("api/startups");

  return new Response(JSON.stringify(startups), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

