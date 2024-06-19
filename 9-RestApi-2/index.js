const express=require("express");
const app=express();
const PORT=8000;

const fs=require("fs");
const users=require('./MOCK_DATA.json');

// Middleware - Plugin

app.use(express.urlencoded({extended: false})); // adds data in req.body sent by post request

// ROUTES

// renders data in html format
app.get('/users',(req,res)=>{
    const html=`<ul>${users.map(user=>`<li>${user.first_name}</li>`).join(" ")}</ul>`;
    res.send(html);
});

// REST API
// sends data in json format

app
.route('/api/users')
.get((req,res)=>{
    return res.json(users);
})
.post((req,res)=>{
    // TO DO : Create new user
    const body=req.body;
    // console.log("Body",body);
    users.push({...body, id:users.length+1});
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
        return res.json({status:'success',id:users.length});
    });
    // return res.json({status:'pending'});
});

app
.route('/api/users/:id')
.get((req,res)=>{
    const id=Number(req.params.id);
    const user=users.find(user=>user.id===id);
    return res.json(user);
})
.patch((req,res)=>{
    // TO DO : Edit the user with id
    return res.json({status:'pending'});
})
.delete((req,res)=>{
    // TO DO : Delete the user with id
    return res.json({status:'pending'});
});

app.listen(PORT,()=>console.log(`Server started at Port ${PORT}`));
