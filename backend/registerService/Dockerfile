FROM node:18-alpine

WORKDIR /app/registerService

COPY registerService/package*.json ./

RUN npm install

COPY registerService/ ./
COPY middlewares /app/middlewares

EXPOSE 5001

CMD ["npm", "start"]
