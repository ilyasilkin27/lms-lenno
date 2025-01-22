import express from 'express';
import cors from 'cors';
import routes from './routes.js';
import errorHandler from '../middlewares/errorMiddleware.mjs';

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

const app = express();
const port = 5000;

app.use(cors(corsOptions));
app.use(express.json());
app.use(routes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Login service is running on port: ${port}`);
});
