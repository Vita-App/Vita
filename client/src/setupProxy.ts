import { createProxyMiddleware } from 'http-proxy-middleware';
import { SERVER_URL } from './config.keys';

const Proxy = (app: any) => {
  app.use(
    '/',
    createProxyMiddleware({
      target: SERVER_URL,
      changeOrigin: false,
    }),
  );
};

export default Proxy;
