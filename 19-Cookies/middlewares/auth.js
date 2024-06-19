const {getUser}=require("../service/auth");

async function restrictToLoggedinUserOnly(req,res,next){
    // const userUid=req.cookies?.uid;
    const userUid=req.headers['authorization'];
    const token=userUid.split("Bearer ")[1] //"Bearer [23u123ukhdjdh]"

    if(!userUid) return res.redirect("/login");

    // const user=getUser(userUid);
    const user=getUser(token);

    if(!user) return res.redirect("/login");

    req.user=user;
    next();
}

async function checkAuth(req,res,next){
    // const userUid=req.cookies?.uid;
    // const user=getUser(userUid);
    const userUid=req.headers['authorization'];
    const token=userUid.split("Bearer ")[1]

    const user=getUser(token);

    req.user=user;
    next();
}

module.exports={
    restrictToLoggedinUserOnly,
    checkAuth,
};

// const value="Bearer 233929473728192940"
// value.split("Bearer ") // answer = ['','233929473728192940']
