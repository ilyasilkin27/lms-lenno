import express from 'express';
import cors from 'cors';
import routes from './routes.js';
import errorHandler from '../middlewares/errorMiddleware.mjs';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const corsOptions = {
  origin: [
    process.env.FRONT_DEV_URL || 'http://localhost:3000',
    'https://lms-lenno-frontend.vercel.app',
    'https://calendar-servie.onrender.com'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400
};

const app = express();
const port = 4004;

// Handle preflight requests
app.options('*', cors(corsOptions));

app.use(cors(corsOptions));
app.use(express.json());
app.use(routes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Calendar service is running on port: ${port}`);
}); 