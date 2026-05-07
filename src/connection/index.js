const mongoose = require("mongoose");
require("dotenv").config();

const connectionUrl = process.env.MONGO_URL;

const connectDb = async () => {
  try {
    await mongoose.connect(connectionUrl);
    console.log("Database connected successfully");
  } catch (error) {
    console.log(`Error while connecting database: ${error?.message}`);
    process.exit(1);
  }
};

module.exports = { connectDb };
