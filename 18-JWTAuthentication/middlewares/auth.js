const {getUser}=require("../service/auth");


async function restrictToLoggedinUserOnly(req,res,next){
    const userUid=req.cookies?.uid; //useUid <- cookie <- + uid

    if(!userUid) return res.redirect("/login");
    const user=getUser(userUid); //if !token user=null // refer to getUser func in service/auth.js

    if(!user) return res.redirect("/login");

    req.user=user;
    next();
}


async function checkAuth(req,res,next){
    const userUid=req.cookies?.uid;

    const user=getUser(userUid);

    req.user=user;
    next();
}


module.exports={
    restrictToLoggedinUserOnly,
    checkAuth,
};