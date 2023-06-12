const express = require("express");
const { postModel } = require("../models/posts.model");

const postRouter = express.Router();

postRouter.get("/",async (req,res)=>{
    const {device,device1,device2} = req.query;
    const {userID} = req.body;
    try {
        // if(device){
        //     let posts = await postModel.find({userID,device});
        //     res.json({msg:"Your Posts",posts});
        // }else if(device1){
        //     let posts = await postModel.find({userID,device1});
        //     res.json({msg:"Your Posts",posts});
        // }else if(device2){
        //     let posts = await postModel.find({userID,device2});
        //     res.json({msg:"Your Posts",posts});
        // }else{
        //     let posts = await postModel.find({userID});
        //     res.json({msg:"Your Posts",posts});
        // }
        let posts = await postModel.find({userID,device,device1,device2});
        res.json({msg:"Your Posts",posts});
    } catch (error) {
        res.status(400).json({err:error?.message});
    }
})
postRouter.post("/add",async(req,res)=>{
    try {
        let posts = postModel(req.body);
        await posts.save();
        res.json({msg:"Posts Added Succefully",posts});
    } catch (error) {
        res.status(400).json({err:error?.message});
    }
})
postRouter.patch("/update/:id",async(req,res)=>{
    const {id} = req.params;
    try {
        let posts = await postModel.findByIdAndUpdate({_id:id},{...req.body});
        res.json({msg:"Your Posts has Been updated Succesfully"});
    } catch (error) {
        res.status(400).json({err:error?.message});
    }
})
postRouter.get("/top",async(req,res)=>{
    const {userID} = req.body;
    const {pg} = req.body.params||1;
    const limit =3;
    try {
        let posts = await postModel.find({userID}).sort({no_of_comments:1}).skip((pg*3)-limit).limit(limit);
        res.json({posts});
    } catch (error) {
        res.status(400).json({err:error?.message});
    }
})
postRouter.delete("/delete/:id",async(req,res)=>{
    const {userID} = req.body;
    const {id} = req.params;
    try {
        let posts = await postModel.findByIdAndDelete({_id:id});
        res.json({msg:"Your Posts has been Deleted Succesfully"});
    } catch (error) {
        res.status(400).json({err:error?.message});
    }
})

module.exports={
    postRouter
}