const mongoose = require("mongoose");
require("dotenv").config();

const  connection = mongoose.connect(`${process.env.mongoUrl}MasaiInsta`); 

module.exports={
    connection
}