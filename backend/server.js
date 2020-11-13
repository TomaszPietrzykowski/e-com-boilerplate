import express from 'express';
import dotenv from 'dotenv';
import products from './data/products.js';
import mongoose from 'mongoose';

dotenv.config();

const app = express();

app.get('/api', (req, res) => {
  res.send('API is running...');
});
app.get('/api/products', (req, res) => {
  res.json(products);
});
app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

const DB = process.env.DB_URI;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) =>
    console.log(
      `MongoDB connected.... \n database user: ${con.connections[0].user}`
    )
  );

const PORT = process.env.PORT;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
);
