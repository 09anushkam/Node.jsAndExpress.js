// This is improved code which can handle both authentication and authorization

const {getUser}=require("../service/auth");

// Authentication
function checkForAuthentication(req,res,next){
    const tokenCookie=req.cookies?.token;

    req.user=null;

    if(!tokenCookie) return next();

    const token=tokenCookie;
    const user=getUser(token); //if(!token) return null; else verify and return the token

    req.user=user;
    return next();
}

// Admin,Normal (authorization)
function restrictTo(roles=[]){
    return function(req,res,next){
        if(!req.user) return res.redirect("/login");
        if(!roles.includes(req.user.role)) return res.end("UnAuthorized");
        return next();
    }
}

module.exports={
    checkForAuthentication,
    restrictTo
};

// const value="Bearer 233929473728192940"
// value.split("Bearer ") // answer = ['','233929473728192940']
