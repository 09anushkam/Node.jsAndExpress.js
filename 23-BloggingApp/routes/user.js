const {Router}=require("express");
const User=require("../models/user");

// creating a router
const router=Router();

// renders signin page
router.get('/signin',(req,res)=>{
    return res.render("signin");
});

// renders signup page
router.get('/signup',(req,res)=>{
    return res.render("signup");
});

// sends signin data
router.post('/signin',async(req,res)=>{
    const {email,password}= req.body;
    const user=await User.matchPassword(email,password);
    console.log(user);
    return res.redirect("/");
});

// sends signup data
router.post('/signup',async (req,res)=>{
    const {fullName,email,password}= req.body;
    await User.create({
        fullName,
        email,
        password,
    });
    return res.redirect("/");
});

module.exports=router;