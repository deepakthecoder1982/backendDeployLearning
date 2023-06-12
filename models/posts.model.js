const mongoose = require("mongoose");


const postSchema = mongoose.Schema({
    title : {type:String,required:true},
    body : {type:String,required:true},
    device : {type:String,enum:["Laptop", "Tablet", "Mobile"],required:true},
    no_of_comments : {type:Number,required:true},
    userID:{type:String},
    userEmail:{type:String}
    
})

const postModel = mongoose.model("masaiInsta_posts",postSchema);

module.exports={
    postModel
}