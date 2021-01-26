import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import connectDB from './backend/config/db.js';
import productRoutes from './backend/routes/productRoutes.js';
import userRoutes from './backend/routes/userRoutes.js';
import orderRoutes from './backend/routes/orderRoutes.js';
import uploadRoutes from './backend/routes/uploadRoutes.js';
import {
  notFound,
  errorHandler,
} from './backend/middleware/errorMiddleware.js';

dotenv.config();
connectDB();
const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

const __dirname = path.resolve(); // __dirname unavailable for es6 syntax
app.use(
  '/public/images',
  express.static(path.join(__dirname, '/public/images'))
);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running in development mode...');
  });
}

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
  )
);
