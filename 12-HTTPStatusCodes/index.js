const express=require("express");
const app=express();
const PORT=8000;

const fs=require("fs");
const users=require('./MOCK_DATA.json');

// Middleware - Plugin

app.use(express.urlencoded({extended: false})); 

app.use((req,res,next)=>{
    console.log("Hello from middleware 1");
    // return res.json({msg:"Hello from middleware 1"}); 
    next();
});

app.use((req,res,next)=>{
    console.log("Hello from middleware 2");
    // return res.end("middleware 2 is stoping u...");
    req.myUserName='anushkamurade.dev';
    next();
});

app.use((req,res,next)=>{
    console.log("Hello from middleware 3", req.myUserName);
    next();
});

app.use((req,res,next)=>{
    console.log("Hello from middleware 4");
    fs.appendFile('log.txt',`\n ${Date.now()} : ${req.ip} : ${req.method} : ${req.path}`,(err,data)=>{
        next();
    });
});

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
    // Always add X to custom headers
    res.setHeader("X-myName","Anushka Murade"); // custom header
    return res.json(users);
})
.post((req,res)=>{
    const body=req.body;
    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){
        return req.status(400).json({msg:"All fields are required"}); // status code
    }
    users.push({...body, id:users.length+1});
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
        return res.status(201).json({status:'success',id:users.length});
    });
});

app
.route('/api/users/:id')
.get((req,res)=>{
    const id=Number(req.params.id);
    const user=users.find(user=>user.id===id);
    if(!user) return res.status(404).json({error:"user not found"}); // status code
    return res.json(user);
})
.patch((req,res)=>{ 
    // TO DO : Edit the user with id
    return res.json({status:'pending'}); //HW
})
.delete((req,res)=>{
    // TO DO : Delete the user with id
    return res.json({status:'pending'}); //HW
});

app.listen(PORT,()=>console.log(`Server started at Port ${PORT}`));
