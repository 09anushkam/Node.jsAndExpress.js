const express=require("express");
const app=express();
const PORT=8000;

const fs=require("fs");
const mongoose=require('mongoose');

// Connection
mongoose.connect("mongodb://localhost:27017/mongotut")
.then(()=>console.log("Mongodb Connected!"))
.catch((error)=>console.log("Mongodb connection error",error));

// Schema
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    jobTitle:{
        type:String,
    },
    gender:{
        type:String,
    },
},{timestamps:true});

const User=mongoose.model('user',userSchema);

// Middleware - Plugin
app.use(express.urlencoded({extended: false}));

app.use((req,res,next)=>{
    console.log("Hello from middleware");
    fs.appendFile('log.txt',`\n ${Date.now()} : ${req.ip} : ${req.method} : ${req.path}`,(err,data)=>{
        next();
    });
});

// ROUTES

// renders data in html format
app.get('/users',async(req,res)=>{
    const alldbUsers=await User.find({});
    const html=`<ul>${alldbUsers.map(user=>`<li>${user.firstName} - ${user.email}</li>`).join(" ")}</ul>`;
    res.send(html);
});

// REST API
// sends data in json format

app
.route('/api/users')
.get(async(req,res)=>{
    const alldbUsers=await User.find({});
    return res.json(alldbUsers);
})
.post(async(req,res)=>{
    const body=req.body;
    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){
        return req.status(400).json({msg:"All fields are required"});
    }
    const result=await User.create({
        firstName:body.first_name,
        lastName:body.last_name,
        email:body.email,
        gender:body.gender,
        jobTitle:body.job_title,
    });
    return res.status(201).json({msg:"success"});
});

app
.route('/api/users/:id')
.get(async(req,res)=>{
    const user=await User.findById(req.params.id);
    if(!user) return res.status(404).json({error:"user not found"});
    return res.json(user);
})
.patch(async(req,res)=>{
    await User.findByIdAndUpdate(req.params.id,{lastName:"Changed"});
    return res.status(200).json({status:'changed successfully'});
})
.delete(async(req,res)=>{
    await User.findByIdAndDelete(req.params.id)
    return res.json({status:'deleted successfully'});
});

app.listen(PORT,()=>console.log(`Server started at Port ${PORT}`));
