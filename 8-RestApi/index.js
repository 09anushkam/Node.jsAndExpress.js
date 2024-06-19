const express=require("express");
const app=express();
const PORT=8000;

const users=require('./MOCK_DATA.json');

// ROUTES

// renders data in html format
app.get('/users',(req,res)=>{
    const html=`<ul>${users.map(user=>`<li>${user.first_name}</li>`).join(" ")}</ul>`;
    res.send(html);
});

// REST API
// sends data in json format

// app.get('/api/users',(req,res)=>{
//     return res.json(users);
// });

// app.post('/api/users',(req,res)=>{
//     // TO DO : Create new user
//     return res.json({status:'pending'});
// });

// merging the above 2 methods as they have same routes

app
.route('/api/users')
.get((req,res)=>{
    return res.json(users);
})
.post((req,res)=>{
    // TO DO : Create new user
    return res.json({status:'pending'});
});

// app.get('/api/users/:id',(req,res)=>{
//     const id=Number(req.params.id);
//     const user=users.find(user=>user.id===id);
//     return res.json(user);
// });

// app.patch('/api/users/:id',(req,res)=>{
//     // TO DO : Edit the user with id
//     return res.json({status:'pending'});
// });

// app.delete('/api/users/:id',(req,res)=>{
//     // TO DO : Delete the user with id
//     return res.json({status:'pending'});
// });

// merging the above 3 methods as they have same routes

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
