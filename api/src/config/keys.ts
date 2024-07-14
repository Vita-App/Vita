import dotenv from 'dotenv';
dotenv.config();

export const DATABASE_URL =
  process.env.DATABASE_URL || 'mongodb://localhost:27017/Vita';

export const GOOGLE_KEY = {
  clientID: process.env.GOOGLE_KEY_CLIENTID || ' ',
  clientSecret: process.env.GOOGLE_KEY_CLIENTSECRET || ' ',
  callbackURL: process.env.GOOGLE_KEY_CALLBACKURI || ' ',
};

export const LINKEDIN_KEY = {
  clientID: process.env.LINKEDIN_KEY_CLIENTID || ' ',
  clientSecret: process.env.LINKEDIN_KEY_CLIENTSECRET || ' ',
  callbackURL: process.env.LINKEDIN_KEY_CALLBACKURI || ' ',
};

export const CREATE_CALENDER_EMAIL = process.env.CREATE_CALENDER_EMAIL || ' ';

export const PROD: boolean = JSON.parse(process.env.PROD || 'false');

export const port = parseInt(<string>process.env.PORT, 10) || 5000;

export const SERVER_URL = process.env.SERVER_URL || 'http://localhost:5000';

export const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

export const ADMIN_URL = process.env.ADMIN_URL || 'http://localhost:3001';

export const CLIENT_DOMAIN = process.env.CLIENT_DOMAIN || 'localhost';

export const CORS_REGEX =
  process.env.CORS_REGEX || [CLIENT_URL, ADMIN_URL].join('|');

export const COOKIE_KEYS = [process.env.COOKIE_KEYS || 'key'];

export const JWT = {
  secret: process.env.JWT_SECRET || 'secret',
  expiresIn: '7d',
};

export const EMAIL_VERIFICATION_JWT = {
  secret: process.env.EMAIL_VERIFICATION_JWT_SECRET || 'secret',
  expiresIn: '1h',
};

export const ADMIN_JWT = {
  secret: process.env.ADMIN_JWT_SECRET || 'secret',
  expiresIn: '1d',
};

export const EMAIL_HOST = process.env.EMAIL_HOST || 'smtp.gmail.com';

export const EMAIL_PORT = parseInt(<string>process.env.EMAIL_PORT, 10) || 465;

export const { EMAIL_USER } = process.env;

export const { EMAIL_PASS } = process.env;

export const WHATSAPP_WEBHOOK_TOKEN =
  process.env.WHATSAPP_WEBHOOK_TOKEN || 'token';

export const WHATSAPP = {
  PHONE_NUMBER_ID: process.env.WHATSAPP_APP_ID || ' ',
  ACCESS_TOKEN: process.env.WHATSAPP_ACCESS_TOKEN || ' ',
};

export const CLOUDINARY = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || ' ',
  api_key: process.env.CLOUDINARY_API_KEY || ' ',
  api_secret: process.env.CLOUDINARY_API_SECRET || ' ',
};

export const APP_NAME = process.env.APP_NAME || 'Vita';
export const ASSET_FOLDER = process.env.ASSET_FOLDER || 'Vita';
export const ALLOW_MENTEE_SIGNUP = process.env.ALLOW_MENTEE_SIGNUP
  ? process.env.ALLOW_MENTEE_SIGNUP === 'true'
  : false;

export const FEATURE_FLAGS = {
  waitlist: process.env.WAITLIST_FEATURE || false,
};
