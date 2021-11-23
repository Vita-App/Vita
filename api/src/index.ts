import express from 'express';
import chalk from 'chalk';
import authRoutes from './routes/auth-routes';
import apiRoutes from './routes/api-routes';
import http from 'http';
import socketioService from './service/socket-io-service';
import './service/passport';
import { COOKIE_KEYS, CLIENT_URL, port } from './config.keys';
import useMiddleWare from 'middleware/index';

// import cookieSession from "cookie-session";

const app = express();
const httpServer = new http.Server(app);

useMiddleWare(app);

app.use('/auth', authRoutes);
app.use('/api', apiRoutes);
socketioService(httpServer);

app.use('/', (req, res) =>
  res.send(`
  <h1>Server is Running :)))</h1>
  <div>The website is now hosted on netlify
    <a href="https://caucus.netlify.app/">https://caucus.netlify.app/</a>
  </div>
`),
);

httpServer.listen(port, () =>
  console.log(chalk.blueBright(`Express Server listening to port ${port}`)),
);

export type ServerType = typeof httpServer;
