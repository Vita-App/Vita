import express from 'express';
import chalk from 'chalk';
import http from 'http';
import { port } from './config/keys';
import apiRoutes from './routes/apiRoutes';
import connectDB from './config/connectDatabase';
import './Models/User';
import socketioService from './service/socket-io-service';
import cors from 'cors';
import { CLIENT_URL } from './config/keys';
// import passport from 'passport';
// import useMiddleWare from './middleware/index';

// import passportService from './service/passport';
// passportService(passport);

const app = express();
const httpServer = new http.Server(app);

connectDB();
// useMiddleWare(app);

app.use(
  cors({
    origin: CLIENT_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type',
    credentials: true, // allow session cookies from browser to pass throught
  }),
);

app.set('trust proxy', 1);

// app.use(passport.initialize());
// app.use(passport.session());

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
