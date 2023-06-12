const mongoose = require("mongoose");


const blackListSchema = mongoose.Schema({
    token: {type:String,required:true},
})

const blackListModel = mongoose.model("masaiInsta_blacklist",blackListSchema);

module.exports={
    blackListModel
}