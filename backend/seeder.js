import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';

import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // remove existing data from db
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // import users
    const createdUsers = await User.insertMany(users);

    // get admin id for reference in products
    const adminUser = createdUsers[0]._id;

    // assign admin's id to sample products
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log('Data imported!'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(`Error: ${err.message}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    // remove existing data from db
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data destroyed!'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(`Error: ${err.message}`.red.inverse);
    process.exit(1);
  }
};

// configure backend/seeder to run import and flag -d run destroy
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
