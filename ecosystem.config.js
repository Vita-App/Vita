// configuration for pm2
// pm2 start ~/env/ecosystem.config.js --env production
module.exports = {
  apps: [
    {
      name: 'vita-server',
      script: '~/Vita/api/dist/src/index.js',
      watch: true,
      env: {
        NODE_ENV: 'production',
        GOOGLE_KEY_CLIENTID: '',
        GOOGLE_KEY_CLIENTSECRET: '',
        GOOGLE_KEY_CALLBACKURI: '',
        LINKEDIN_KEY_CLIENTID: '',
        LINKEDIN_KEY_CLIENTSECRET: '',
        LINKEDIN_KEY_CALLBACKURI: '',
        COOKIE_KEYS: '',
        EMAIL_USER: '',
        EMAIL_PASS: '',
        DATABASE_URL: '',
        CORS_REGEX: '',
        PORT: '',
        PROD: '',
        CLIENT_URL: '',
        SERVER_URL: '',
      },
    },
  ],
};
