const User=require("../models/user");

async function handleGetAllUsers(req,res){
    const alldbUsers=await User.find({});
    return res.json(alldbUsers);
}

async function handleGetUserById(req,res){
    const user=await User.findById(req.params.id);
    if(!user) return res.status(404).json({error:"user not found"});
    return res.json(user);
}

async function handleCreateNewUserById(req,res){
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
    return res.status(201).json({msg:"success",id:result._id});
}

async function handleUpdateUserById(req,res){
    await User.findByIdAndUpdate(req.params.id,{lastName:"Changed"});
    return res.status(200).json({status:'changed successfully'});
}

async function handleDeleteUserById(req,res){
    await User.findByIdAndDelete(req.params.id)
    return res.json({status:'deleted successfully'});
}

module.exports={
    handleGetAllUsers,
    handleGetUserById,
    handleCreateNewUserById,
    handleUpdateUserById,
    handleDeleteUserById
};