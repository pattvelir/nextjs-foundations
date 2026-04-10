const BASE_URL = "https://vercel-daily-news-api.vercel.app/api";
const TOKEN = process.env.NEWS_API_TOKEN!;

export async function apiFetch<T>(
  endpointPath: string,
  method: string = "GET",
  headers: Record<string, string> = {},
): Promise<T> {
  console.log(TOKEN);
  if (!endpointPath.startsWith("/")) {
    endpointPath = `/${endpointPath}`;
  }
  headers["x-vercel-protection-bypass"] = TOKEN;
  const response = await fetch(`${BASE_URL}${endpointPath}`, {
    method,
    headers: headers,
    cache: "no-store", // or "force-cache" depending on use case
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  const json = await response.json();

  if (!json.success) {
    throw new Error(`Error: ${json.error?.message}` || "Unknown error");
  }

  return json.data;
}
