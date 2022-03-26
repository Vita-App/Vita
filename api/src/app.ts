import express from 'express';
import http from 'http';
import apiRoutes from './routes/apiRoutes';
import './Models/User';
import cors from 'cors';
import { CORS_REGEX } from './config/keys';
// import passport from 'passport';
// import useMiddleWare from './middleware/index';

// import passportService from './service/passport';
// passportService(passport);

const createServer = () => {
  const app = express();
  const httpServer = new http.Server(app);

  // useMiddleWare(app);

  app.use(
    cors({
      origin: new RegExp(CORS_REGEX),
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      allowedHeaders: 'Content-Type',
      credentials: true, // allow session cookies from browser to pass throught
    }),
  );

  app.set('trust proxy', 1);

  // app.use(passport.initialize());
  // app.use(passport.session());

  app.use('/api', apiRoutes);

  app.use('/', (req, res) =>
    res.send(`
    <h1>Server is Running :)))</h1>
  `),
  );

  return {
    httpServer,
    app,
  };
};

export default createServer;
