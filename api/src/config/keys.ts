/* eslint-disable @typescript-eslint/no-non-null-assertion */
// .dotenv why you do me dirty like this D:
import dotenv from 'dotenv';
dotenv.config();

export const DATABASE_URL =
  process.env.DATABASE_URL || 'mongodb://localhost:27017/Vita';

export const GOOGLE_KEY = {
  clientID: process.env.GOOGLE_KEY_CLIENTID || " ",
  clientSecret: process.env.GOOGLE_KEY_CLIENTSECRET || " ",
};

export const PROD: boolean = JSON.parse(process.env.PROD || 'false');

export const port = parseInt(<string>process.env.PORT) || 5000;

export const SERVER_URL = process.env.SERVER_URL || 'http://localhost:5000';

export const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

export const CORS_REGEX = process.env.CORS_REGEX || CLIENT_URL;

export const COOKIE_KEYS = [process.env.COOKIE_KEYS!];

export const EMAIL_HOST = process.env.EMAIL_HOST || 'smtp.gmail.com';

export const EMAIL_PORT = parseInt(<string>process.env.EMAIL_PORT) || 465;

export const EMAIL_USER = process.env.EMAIL_USER

export const EMAIL_PASS = process.env.EMAIL_PASS;
