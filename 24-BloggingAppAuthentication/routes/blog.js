const {Router}=require("express");
const multer=require("multer");
const path=require("path");

const Blog=require("../models/blog");

// creating a router
const router=Router();

// creating diskStorage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,path.resolve(`./public/uploads/`));
  },
  filename: function (req, file, cb) {
    const fileName=`${Date.now()} - ${file.originalname}`
    cb(null,fileName);
  }
});

const upload = multer({ storage: storage });

// renders add new blog
router.get('/add-new',(req,res)=>{
    return res.render('addBlog',{
        user:req.user, //required for nav data
    });
});

// submiting blog via post method
router.post('/',upload.single('coverImage'),async(req,res)=>{
    const {title,body}=req.body;
    const blog=await Blog.create({
        title,
        body,
        createdBy:req.user._id,
        coverImageURL:`/uploads/${req.file.filename}`
    })
    return res.redirect(`/blog/${blog._id}`); //redirect to /blog
});

module.exports=router;