import mongoose from 'mongoose';

const connectDB = async () => {
  const DB = process.env.DB_URI;
  try {
    const conn = await mongoose.connect(DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log(
      `MongoDB connected.... \n database user: ${conn.connections[0].user}.cyan.underline`
    );
  } catch (err) {
    console.error(`Error connecting DB: ${err.message}`);
    process.exit(1);
  }
};

export default connectDB;
