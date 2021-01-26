const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./backend/config/db.js');
const productRoutes = require('./backend/routes/productRoutes.js');
const userRoutes = require('./backend/routes/userRoutes.js');
const orderRoutes = require('./backend/routes/orderRoutes.js');
const uploadRoutes = require('./backend/routes/uploadRoutes.js');
const errorMiddleware = require('./backend/middleware/errorMiddleware.js');

dotenv.config();
connectDB();
const app = express();

app.use(cors());
app.options('*', cors());

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

app.use(errorMiddleware.notFound);
app.use(errorMiddleware.errorHandler);

app.listen(console.log('server started...'));
