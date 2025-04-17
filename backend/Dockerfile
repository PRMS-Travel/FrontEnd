FROM node:16-alpine

WORKDIR /node-app

COPY package*.json ./

RUN npm ci

COPY . .

CMD ["node", "app.js"]