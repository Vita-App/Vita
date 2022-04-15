import express, { Express } from 'express';
import cors from 'cors';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import jwtCookieMiddleware from './jwtAuth';
import { COOKIE_KEYS, CORS_REGEX, DATABASE_URL } from '../config/keys';
import MongoStore from 'connect-mongo';

const corsOptions = {
  origin: new RegExp(CORS_REGEX),
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
      store: MongoStore.create({ mongoUrl: DATABASE_URL }),
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

  app.use(jwtCookieMiddleware);
};

export default addMiddleWare;
