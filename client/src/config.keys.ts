export const CLIENT_URL =
  import.meta.env.VITE_CLIENT_URL || 'http://localhost:3000';
export const SERVER_URL =
  import.meta.env.VITE_SERVER_URL || 'http://localhost:5000';
export const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';
export const PRODUCTION = import.meta.env.VITE_PROD === 'true';
export const GOOGLE_ANALYTICS_KEY =
  import.meta.env.VITE_GOOGLE_ANALYTICS_KEY || 'UA-000000000-0';
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'Vita';
export const ASSET_FOLDER = import.meta.env.VITE_ASSET_FOLDER || 'Vita';
export const TAWK_PROPERTY_ID = import.meta.env.VITE_TAWK_PROPERTY_ID || '';
export const TAWK_WIDGET_ID = import.meta.env.VITE_TAWK_WIDGET_ID || '';

// export const ASSET_FOLDER = 'Vita';
// export const APP_NAME = 'Vita';
