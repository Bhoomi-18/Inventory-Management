import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // 90s timeout — Render free tier takes up to 60s to cold-start
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
 * True only in production Vercel deployment (VITE_API_URL is set at build time).
 * In local dev, VITE_API_URL is undefined so this is false.
 */
export const IS_PROD = Boolean(import.meta.env.VITE_API_URL);

/**
 * Returns true ONLY for genuine request timeouts (ECONNABORTED).
 * Does NOT match ERR_CONNECTION_REFUSED ("Network Error") — that is a local
 * backend-not-running error, not a Render cold-start.
 */
export const isRenderColdStart = (err: any): boolean =>
  IS_PROD && err?.code === 'ECONNABORTED';
