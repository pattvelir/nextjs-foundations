const BASE_URL = "https://vercel-daily-news-api.vercel.app/api";
const TOKEN = process.env.NEWS_API_TOKEN!;

export async function apiFetch<T>(
  endpointPath: string,
  method: string = "GET",
  headers: Record<string, string> = {},
): Promise<T> {
  if (!endpointPath.startsWith("/")) {
    endpointPath = `/${endpointPath}`;
  }
  console.log("fetching data from api: " + endpointPath);
  headers["x-vercel-protection-bypass"] = TOKEN;
  const response = await fetch(`${BASE_URL}${endpointPath}`, {
    method,
    headers: headers,
  });
  console.log("response:", response);
  // If the endpoint returns a 404, we'll return null instead of throwing an error.
  // This handles expired and not found subscriptions gracefully.
  if (response.status === 404 && endpointPath.startsWith("/subscription")) {
    return null as unknown as T;
  }

  if (response.status === 404) {
    throw new Error("NOT_FOUND");
  }

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  const json = await response.json();

  if (!json.success) {
    throw new Error(`Error: ${json.error?.message}` || "Unknown error");
  }

  return json.data;
}
