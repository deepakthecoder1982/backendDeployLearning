const validator = (req,res,next)=>{
    // here check alll the details are passed or not but in the model we have mentioned it has isrequire so 
    // for now we don't need it just created it for future reference 
    const {email, pass} = req.body;
    if(email && pass){
        next();
    }else{
        res.json({err:"Please Enter all the details"});
    }
}
module.exports={
    validator
}