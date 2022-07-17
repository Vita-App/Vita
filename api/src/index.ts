import express from 'express';
import chalk from 'chalk';
import http from 'http';
import { port } from './config/keys';
import apiRoutes from './routes';
import connectDB from './config/connectDatabase';
import './Models/User';
import './config/passport-config';
import socketioService from './service/socket-io-service';
import { useMiddleWare } from './middleware';

const app = express();
const httpServer = new http.Server(app);

connectDB();
useMiddleWare(app);

app.use('/api', apiRoutes);
socketioService(httpServer);

app.use('/', (req, res) =>
  res.send(`
  <h1>Server is Running :)))</h1>
`),
);

httpServer.listen(port, () =>
  console.log(chalk.blueBright(`Express Server listening to port ${port}`)),
);
