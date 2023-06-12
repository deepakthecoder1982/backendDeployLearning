const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
    name :{type:String,required:true},
    email:{type:String,required:true},
    gender : {type:String,required:true},
    password : {type:String,required:true},
    age : {type:String,required:true},
    city : {type:String,required:true},
    is_married : {type:String,required:true}
})

const userModel = mongoose.model("masaiInsta_users",userSchema);

module.exports={
    userModel
}