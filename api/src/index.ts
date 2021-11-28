import express from 'express';
import chalk from 'chalk';
import http from 'http';
import { port } from './config/keys';
import useMiddleWare from './middleware/index';
import apiRoutes from './routes/apiRoutes';
import connectDB from './config/connectDatabase';
import './Models/User';
import socketioService from './service/socket-io-service';
import passport from 'passport';
// import passportService from './service/passport';
// passportService(passport);

const app = express();
const httpServer = new http.Server(app);

connectDB();
useMiddleWare(app);

app.use(passport.initialize());
app.use(passport.session());

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
