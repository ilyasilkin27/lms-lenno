import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import errorHandler from './middlewares/errorMiddleware.js';

const corsOptions = {
  origin: 'https://lms-lenno-frontend.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

const app = express();
const port = 5001;

app.use(cors(corsOptions));
app.use(express.json());
app.use(userRoutes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`User service is running on http://localhost:${port}`);
});
