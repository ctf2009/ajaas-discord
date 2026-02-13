import { config } from './config.js';

export type ApiResult = { message: string } | { error: string };
export type TypesResult = { types: string[] } | { error: string };

function buildUrl(path: string, params?: Record<string, string | undefined>): string {
  const url = new URL(path, config.ajaasBaseUrl);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) {
        url.searchParams.set(key, value);
      }
    }
  }
  return url.toString();
}

async function fetchJson<T>(url: string): Promise<T | { error: string }> {
  try {
    const response = await fetch(url, {
      headers: { Accept: 'application/json' },
    });
    const data = (await response.json()) as Record<string, unknown>;
    if (!response.ok) {
      return { error: (data.error as string) || `API returned ${response.status}` };
    }
    return data as T;
  } catch (err) {
    return { error: `Failed to reach AJaaS API: ${err instanceof Error ? err.message : String(err)}` };
  }
}

export function fetchAwesome(name: string, from?: string): Promise<ApiResult> {
  return fetchJson<{ message: string }>(buildUrl(`/api/awesome/${encodeURIComponent(name)}`, { from }));
}

export function fetchWeekly(name: string, from?: string, tz?: string): Promise<ApiResult> {
  return fetchJson<{ message: string }>(buildUrl(`/api/weekly/${encodeURIComponent(name)}`, { from, tz }));
}

export function fetchRandom(name: string, from?: string): Promise<ApiResult> {
  return fetchJson<{ message: string }>(buildUrl(`/api/random/${encodeURIComponent(name)}`, { from }));
}

export function fetchMessage(type: string, name: string, from?: string): Promise<ApiResult> {
  return fetchJson<{ message: string }>(buildUrl(`/api/message/${encodeURIComponent(type)}/${encodeURIComponent(name)}`, { from }));
}

export function fetchTypes(): Promise<TypesResult> {
  return fetchJson<{ types: string[] }>(buildUrl('/api/types'));
}
