const jwt = require('jsonwebtoken');
require('dotenv').config();
const auth = (req,res,next)=>{
    let token = req.body.authorization?.split(" ")[1];
    if(token){
        jwt.verify(token,process.env.secret,(err,decode)=>{
            if(err){
                res.status(400).json({err:err.message});
            }else{
                req.body.userID = decode.userID;
                req.body.userEmail = decode.userEmail;
                next();
            }
        })
    }else{
        res.json({msg:"User Not Authenticated"})
    }
}
module.exports={
    auth
}