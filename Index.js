const express = require("express");
const { connection } = require("./config/db");
const { validator } = require("./middlewares/validator.middleware");
const { userRouter } = require("./routes/user.routes");
const { postRouter } = require("./routes/posts.routes");
const { auth } = require("./middlewares/auth.middlewares");
require("dotenv").config();

const app = express();
app.use(express.json())
app.use("/users",validator,userRouter);
app.use("/posts",auth,postRouter);

app.get("/",(req,res)=>{
    res.send("server is working")
})
app.listen(process.env.port,async()=>{
try {
   let connect =  await connection
   console.log("DB connected");
   console.log("server is running on port :-",process.env.port)
} catch (error) {
    console.log(error?.message)
}
})
