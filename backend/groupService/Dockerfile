FROM node:18-alpine

WORKDIR /app/groupService

COPY groupService/package*.json ./

RUN npm install

COPY groupService/ ./
COPY middlewares /app/middlewares

EXPOSE 5002

CMD ["npm", "start"]
