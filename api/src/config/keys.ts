/* eslint-disable @typescript-eslint/no-non-null-assertion */
// .dotenv why you do me dirty like this D:
import dotenv from 'dotenv';
dotenv.config();

const mongoURI =
  'mongodb+srv://rishabh-malhotraa:ONEPLUS12345@cluster0.cjl2p.mongodb.net/Vita?retryWrites=true&w=majority';
export const DATABASE_URL = mongoURI || process.env.DATABASE_URL!;

export const GOOGLE_KEY = {
  clientID: process.env.GOOGLE_KEY_CLIENTID!,
  clientSecret: process.env.GOOGLE_KEY_CLIENTSECRET!,
};

export const PROD: boolean = JSON.parse(process.env.PROD!);

export const port = parseInt(<string>process.env.PORT) || 5000;

export const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3000';

export const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5000';

export const COOKIE_KEYS = [process.env.COOKIE_KEYS!];
