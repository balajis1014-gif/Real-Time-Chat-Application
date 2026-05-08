const mongoose = require("mongoose");
const { CONFIG } = require("../config");

const connectionUrl = CONFIG.DB.URL;

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
