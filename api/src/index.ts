import express from 'express';
import chalk from 'chalk';
import http from 'http';
import { COOKIE_KEYS, CLIENT_URL, port, DATABASE_URL } from './config/keys';
import useMiddleWare from './middleware/index';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import apiRoutes from './routes/apiRoutes';
import authRoutes from './routes/authRoutes';
import connectDB from './config/connectDatabase';
import './Models/User';
import socketioService from './service/socket-io-service';
import cors from 'cors';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passportService from './service/passport';

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
app.use(express.json());
app.use(cookieParser()); // parse cookies

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    secret: COOKIE_KEYS,
    name: 'caucus-session',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: true,
      httpOnly: true,
      secure: false,
    },
  }),
);

passportService(passport);
app.use(passport.initialize());
app.use(passport.session());

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
