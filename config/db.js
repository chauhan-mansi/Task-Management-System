const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((data) => {
        console.log("Database Connected Successfully");
      });
  } catch (error) {
    console.log(error);
    console.log("Database Connection Failed");
  }
};

module.exports = connectDB;
