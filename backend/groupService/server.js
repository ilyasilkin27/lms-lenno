import express from 'express';
import cors from 'cors';
import routes from './routes.js';
import errorHandler from '../middlewares/errorMiddleware.mjs';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const corsOptions = {
  origin: `${process.env.FRONT_DEV_URL || 'https://lms-lenno-frontend.vercel.app'}`,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

const app = express();
const port = 4002;

app.use(cors(corsOptions));
app.use(express.json());
app.use(routes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Group service is running on port: ${port}`);
});
