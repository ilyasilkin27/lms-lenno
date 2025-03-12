FROM node:18-alpine

WORKDIR /app/calendarService

COPY calendarService/package*.json ./

RUN npm install

COPY calendarService/ ./
COPY middlewares /app/middlewares

EXPOSE 4004

CMD ["npm", "start"] 