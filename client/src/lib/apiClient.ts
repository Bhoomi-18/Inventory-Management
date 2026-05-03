import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // 90s timeout – Render free tier can take 50-60s to cold-start
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
 * Wakes up the Render backend by hitting /health.
 * Call this once when the app loads so the server is ready by login time.
 */
export const pingServer = async (): Promise<void> => {
  try {
    await axios.get(`${API_BASE_URL}/health`, { timeout: 90000 });
  } catch {
    // Ignore errors – this is fire-and-forget
  }
};
