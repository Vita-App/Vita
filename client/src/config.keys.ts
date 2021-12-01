export const CLIENT_URL =
  process.env.REACT_APP_CLIENT_URL || 'http://localhost:3000';
export const SERVER_URL =
  process.env.REACT_APP_SERVER_URL || 'http://localhost:5000';
export const SOCKET_URL =
  process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';
export const CDRT_SERVER =
  process.env.REACT_APP_CRDT_SERVER || 'ws://localhost:1234';
export const PRODUCTION = process.env.REACT_APP_PROD === 'true';
export const GOOGLE_ANALYTICS_KEY =
  process.env.REACT_APP_GOOGLE_ANALYTICS_KEY || 'UA-000000000-0';
