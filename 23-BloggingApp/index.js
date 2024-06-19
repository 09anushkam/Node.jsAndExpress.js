const path=require("path");
const express=require("express");
const mongoose=require("mongoose");

const userRoute=require("./routes/user");

// creating express app
const app=express();
const PORT=8000;

// connecting to mongodb using mongoose
mongoose
.connect('mongodb://localhost:27017/blogify')
.then((e)=>console.log("MongoDB Connected!"));

// setting ejs view engine
app.set("view engine",'ejs');
app.set("views",path.resolve("./views"));

// middleware
app.use(express.urlencoded({extended:false}));

// homepage
app.get('/',(req,res)=>{
    res.render("home");
}); 

//routes - get(renders page) and post(sending data) of signup,signin
app.use("/user",userRoute); 

app.listen(PORT,()=>console.log(`Server started at PORT:${PORT}`));