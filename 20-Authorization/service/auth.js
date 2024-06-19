// const sessionIdToUserMap=new Map();

const secret="Anushka$123@$";
const jwt=require("jsonwebtoken");

// token assignment for user
function setUser(user){
    // sessionIdToUserMap.set(id,user); id and user are function parameters
    return jwt.sign({
        _id:user._id,
        email:user.email,
        role:user.role,
    },secret);
}

function getUser(token){
    if(!token) return null;
    try{
        return jwt.verify(token,secret);
    }
    catch(error){
        return null;
    }
    // return sessionIdToUserMap.get(id); id was func parameter
}

module.exports={
    setUser,
    getUser,
}

