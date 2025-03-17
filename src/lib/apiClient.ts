export default async function apiRequest(endpoint: string, payload: any, method = "POST") {
  const response = await fetch("/api/proxy", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ endpoint, payload, method }),
  });

  return response.json();
}