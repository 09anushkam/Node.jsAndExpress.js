const express=require("express");
const { handleGetAllUsers,
        handleGetUserById,
        handleCreateNewUserById,
        handleUpdateUserById,
        handleDeleteUserById
    } = require("../controllers/user");

const router=express.Router();

// ROUTES

// renders data in html format
// router.get('/',async(req,res)=>{
//     const alldbUsers=await User.find({});
//     const html=`<ul>${alldbUsers.map(user=>`<li>${user.firstName} - ${user.email}</li>`).join(" ")}</ul>`;
//     res.send(html);
// });

// REST API
// sends data in json format

router
.route('/')
.get(handleGetAllUsers)
.post(handleCreateNewUserById);

router
.route('/:id')
.get(handleGetUserById)
.patch(handleUpdateUserById)
.delete(handleDeleteUserById);

module.exports=router;