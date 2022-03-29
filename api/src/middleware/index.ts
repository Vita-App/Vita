import express, { Express } from 'express';
import cors from 'cors';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import {
  COOKIE_KEYS,
  CLIENT_URL,
  NETLIFY_PREVIEW_DEPLOYMENT_REGEX,
} from '../config/keys';

const corsOptions = {
  // origin: CLIENT_URL,
  // @ts-ignore
  origin: function (origin, callback) {
    console.log('entered the function');
    if (!origin) return callback(null, true);
    if (CLIENT_URL.indexOf(origin) === -1)
      if (NETLIFY_PREVIEW_DEPLOYMENT_REGEX.test(origin))
        return callback(null, true);
      else return callback(new Error('Not allowed by CORS'));
    else return callback(null, true);
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type',
  credentials: true,
};

const addMiddleWare = (app: Express) => {
  app.use(cors(corsOptions));
  app.set('trust proxy', 1);
  app.use(express.json());
  app.use(cookieParser()); // parse cookies

  app.use(express.urlencoded({ extended: true }));
  app.use(
    session({
      secret: COOKIE_KEYS,
      name: 'vitaa-session',
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

  app.use(passport.initialize());
  app.use(passport.session());
};

export default addMiddleWare;
