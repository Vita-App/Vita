const CLIENT_URL = process.env.REACT_APP_CLIENT_URL || 'http://localhost:3000';
const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:5000';
const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';
const CDRT_SERVER = process.env.REACT_APP_CRDT_SERVER || 'ws://localhost:1234';
const PRODUCTION = process.env.REACT_APP_NETLIFY === 'true';

export { SERVER_URL, CLIENT_URL, SOCKET_URL, CDRT_SERVER, PRODUCTION };
