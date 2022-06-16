export const CLIENT_URL =
  import.meta.env.VITE_CLIENT_URL || 'http://localhost:3000';
export const SERVER_URL =
  import.meta.env.VITE_SERVER_URL || 'http://localhost:5000';
export const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';
export const PRODUCTION = import.meta.env.VITE_PROD === 'true';
export const GOOGLE_ANALYTICS_KEY =
  import.meta.env.VITE_GOOGLE_ANALYTICS_KEY || 'UA-000000000-0';
