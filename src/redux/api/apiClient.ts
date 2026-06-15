// src/redux/api/apiClient.ts
import axios, { AxiosRequestConfig } from 'axios';

//const BASE_URL = 'https://demo.excelr.com/api';
const BASE_URL = 'https://demo3.excelr.com/api';
//const BASE_URL = 'https://www.excelr.com/api';
const API_KEY = 'sk_KcJ4OSav26Zm240UNRgZeFDgZZ6vKsiK';

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  params: { api_key: API_KEY }, // Default API key
});

// ======================================================
// CLIENT apiGet (fixed to always send api_key)
// ======================================================
export async function apiGet<T = any>(
  endpoint: string,
  params: Record<string, any> = {}
): Promise<T> {
  try {
    const res = await api.get<T>(endpoint, {
      params: {
        api_key: API_KEY, // Always include API key
        ...params,         // Merge with caller params
      },
    });

    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

// ======================================================
// CLIENT apiPost
// ======================================================
export async function apiPost<T = any>(
  endpoint: string,
  body?: any,
  config?: AxiosRequestConfig
): Promise<T> {
  try {
    const isFormData =
      typeof FormData !== "undefined" && body instanceof FormData;
    const headers: Record<string, any> = { ...(config?.headers || {}) };

    if (isFormData) {
      // Let the browser set the boundary for multipart/form-data
      headers["Content-Type"] = undefined;
      headers["content-type"] = undefined;
    }

    const res = await api.post<T>(endpoint, body, {
      ...config,
      headers,
      params: {
        api_key: API_KEY,
        ...(config?.params || {}),
      },
    });

    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

// ======================================================
// SERVER apiGet (for Next.js server components)
// ======================================================
export async function serverApiGet<T = any>(
  endpoint: string,
  params?: Record<string, any>,
  /** Seconds to cache the response in Next.js's server-side fetch cache.
   *  Pass 0 (default) to opt out of caching (previous behaviour). */
  revalidate: number = 0
): Promise<T> {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.append('api_key', API_KEY);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }

  const fetchOptions: RequestInit & { next?: { revalidate: number } } =
    revalidate > 0
      ? { method: 'GET', headers: { 'Content-Type': 'application/json' }, next: { revalidate } }
      : { method: 'GET', headers: { 'Content-Type': 'application/json' }, cache: 'no-store' };

  const res = await fetch(url.toString(), {
    ...fetchOptions,
    // (cache / next already set above — kept for legacy callers)
  });

  if (!res.ok) {
    throw new Error(`API Error: ${res.status}`);
  }

  return res.json();
}
