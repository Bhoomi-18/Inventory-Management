import axios from 'axios';

// In dev (npm run dev): baseURL = '/api' (Vite proxies to localhost:5000)
// In prod (npm run build): baseURL = VITE_API_URL (the Render backend URL)
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  // 90s — Render free tier can take up to 60s to cold-start
  timeout: 90000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

/**
 * True only in a production Vite build (npm run build).
 * Always false during local dev (npm run dev), regardless of any .env files.
 * This is Vite's built-in environment flag — the most reliable way to detect prod.
 */
export const IS_PROD: boolean = import.meta.env.PROD;

/**
 * Returns true only for a genuine Render cold-start timeout (ECONNABORTED).
 * Does NOT match ERR_NETWORK / ERR_CONNECTION_REFUSED.
 */
export const isRenderColdStart = (err: any): boolean =>
  IS_PROD && err?.code === 'ECONNABORTED';
