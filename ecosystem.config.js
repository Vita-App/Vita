// configuration for pm2
// pm2 start ~/env/ecosystem.config.js --env production
module.exports = {
  apps: [
    {
      name: 'vita-server',
      script: '/root/Vita/api/dist/index.js',
      watch: true,
      env: {
        NODE_ENV: '',
        GOOGLE_KEY_CLIENTID: '',
        GOOGLE_KEY_CLIENTSECRET: '',
        GOOGLE_KEY_CALLBACKURI: '',
        LINKEDIN_KEY_CLIENTID: '',
        LINKEDIN_KEY_CLIENTSECRET: '',
        LINKEDIN_KEY_CALLBACKURI: '',
        COOKIE_KEYS: '',
        EMAIL_USER: '',
        EMAIL_PASS: '',
        CLOUDINARY_CLOUD_NAME: '',
        CLOUDINARY_API_KEY: '',
        CLOUDINARY_API_SECRET: '',
        WHATSAPP_APP_ID: '',
        CREATE_CALENDER_EMAIL: '',
        WHATSAPP_ACCESS_TOKEN: '',
        DATABASE_URL: '',
        CLIENT_URL: '',
				SERVER_URL: '',
				ADMIN_URL: '',
				CORS_REGEX: '',
      },
    },
  ],
};
