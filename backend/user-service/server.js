import express from 'express';
import userRoutes from './routes/userRoutes.js';
import errorHandler from './middlewares/errorMiddleware.js';

const app = express();
const port = 5001;

app.use(express.json());

app.use(userRoutes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`User service is running on http://localhost:${port}`);
});
