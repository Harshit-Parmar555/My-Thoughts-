const mongoose = require("mongoose");

const connecttodb = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Connection SuccessFull With Database");
  } catch (error) {
    console.log("error in connecting to database" + error);
  }
};

module.exports = connecttodb;
