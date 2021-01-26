const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const users = require('./data/users.js');
const products = require('./data/products.js');

const User = require('./models/userModel.js');
const Product = require('./models/productModel.js');
const Order = require('./models/orderModel.js');

const connectDB = require('./config/db.js');

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
