const DEFAULT_API_BASE_URL = "http://localhost:4000";

type ApiRequestParams = {
  path: string;
  query?: Record<string, string | number>;
};

export class ApiRequestError extends Error {
  constructor(message = "API request failed") {
    super(message);
    this.name = "ApiRequestError";
  }
}

export async function getJson<T>({
  path,
  query,
}: ApiRequestParams): Promise<T> {
  const requestUrl = createApiUrl({ path, query });
  const response = await fetch(requestUrl);

  if (!response.ok) {
    throw new ApiRequestError();
  }

  return response.json() as Promise<T>;
}

function createApiUrl({
  path,
  query,
}: Pick<ApiRequestParams, "path" | "query">) {
  const requestUrl = new URL(
    path,
    process.env.NEXT_PUBLIC_API_BASE_URL ?? DEFAULT_API_BASE_URL,
  );

  Object.entries(query ?? {}).forEach(([key, value]) => {
    requestUrl.searchParams.set(key, String(value));
  });

  return requestUrl;
}
