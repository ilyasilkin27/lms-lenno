FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

WORKDIR /app/build

EXPOSE 3000

CMD ["npx", "serve", "-s", "."]
