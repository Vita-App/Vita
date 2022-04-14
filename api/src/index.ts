import express from 'express';
import chalk from 'chalk';
import http from 'http';
import { port, COOKIE_KEYS, CLIENT_DOMAIN, DATABASE_URL } from './config/keys';
import apiRoutes from './routes/apiRoutes';
import connectDB from './config/connectDatabase';
import './Models/User';
import socketioService from './service/socket-io-service';
import cors from 'cors';
import { CORS_REGEX } from './config/keys';
import './config/passport-config';
import expressSession from 'express-session';
import passport from 'passport';
import MongoStore from 'connect-mongo';

// import useMiddleWare from './middleware/index';

// import passportService from './service/passport';
// passportService(passport);

const app = express();
const httpServer = new http.Server(app);

const connection = connectDB();
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

app.use(expressSession({
  secret: COOKIE_KEYS[0],
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: DATABASE_URL }),
  cookie: {
    domain: CLIENT_DOMAIN,
    maxAge: 24*60*60*1000,
    // secure: true
  } 
}))
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
