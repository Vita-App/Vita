FROM node:14-alpine
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production=false

COPY . .

RUN npm run build

EXPOSE 5000

CMD ["npm", "run", "start"]