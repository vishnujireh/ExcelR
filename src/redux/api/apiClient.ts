// src/redux/api/apiClient.ts
import axios, { AxiosRequestConfig } from 'axios';

const BASE_URL = 'https://demo.excelr.com/api';
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
    const res = await api.post<T>(endpoint, body, {
      ...config,
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
  params?: Record<string, any>
): Promise<T> {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.append('api_key', API_KEY);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }

  const res = await fetch(url.toString(), {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`API Error: ${res.status}`);
  }

  return res.json();
}
