const path=require("path");
const express=require("express");
const multer  = require('multer');

const app=express();
const PORT=8001;

// storage
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        return cb(null,'./uploads');
    },
    filename:function(req,file,cb){
        const filename=`${Date.now()}-${file.originalname}`
        return cb(null,filename);
    },
});
const upload=multer({storage});

// setting view engine as ejs
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

// middleware
app.use(express.urlencoded({extended:false})); //for post

// route
app.get("/",(req,res)=>{
    return res.render("homepage");
});

// app.post('/upload',upload.single('profileImage')
app.post('/upload',upload.fields([{name:'profileImage'},{name:'coverImage'}]),(req,res)=>{
    console.log("File Uploaded!");
    return res.redirect("/");
});

app.listen(PORT,()=>console.log(`Server started at PORT : ${PORT}`));
