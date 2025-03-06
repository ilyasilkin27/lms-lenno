FROM node:18-alpine

WORKDIR /app/classService

COPY classService/package*.json ./

RUN npm install

COPY classService/ ./
COPY middlewares /app/middlewares

EXPOSE 4003

CMD ["npm", "start"] 