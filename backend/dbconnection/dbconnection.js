const mongoose = require("mongoose");
require("dotenv").config();

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      tlsInsecure: true,
    });
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("Database connection failed:", error.message);
  }
};

module.exports = connection;
