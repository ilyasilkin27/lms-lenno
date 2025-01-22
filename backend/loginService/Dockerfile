FROM node:18-alpine

WORKDIR /app/loginService

COPY loginService/package*.json ./

RUN npm install

COPY loginService/ ./
COPY middlewares /app/middlewares

EXPOSE 5001

CMD ["npm", "start"]
