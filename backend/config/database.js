const mongoose = require("mongoose");
const config = require("./config");

const connectDB = async () => {
    try{ 
      await mongoose.connect(config.databaseURI);
    }catch(error){
       process.exit(1);
    }
}

module.exports = connectDB;