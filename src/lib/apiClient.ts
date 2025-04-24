export default async function apiRequest(
  endpoint: string,
  payload: object | FormData,
  method = "POST"
) {
  const isFormData = payload instanceof FormData;

  const url = isFormData ? "/api/proxy/form" : "/api/proxy/json";

  const options: RequestInit = {
    method,
    headers: isFormData
      ? undefined // Let the browser handle the headers for FormData
      : { "Content-Type": "application/json" },
    body: isFormData
      ? payload
      : JSON.stringify({ endpoint, payload }),
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "API request failed");
  }

  return response.json();
}
