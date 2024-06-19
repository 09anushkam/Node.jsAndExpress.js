// const http=require('http');
// const fs=require('fs');
// const url=require('url');

// function myHandler(req,res){
//      if(req.url==='/favicon.ico') return res.end();

//     const log=`${Date.now()} : ${req.url} : ${req.method} : New Request Received\n`;
//     const myUrl=url.parse(req.url,true);

//     fs.appendFile('log.txt',log,(err,data)=>{
//         switch(myUrl.pathname)
//         {
//             case '/':
//                 if(req.method==="GET") res.end("Home Page");
//             break;

//             case '/signup':
//                 if(req.method==="GET") res.end("This is a signup form\n");
//                 else if(req.method==="POST"){
//                     // DB Query
//                     res.end("Success");
//                 }
//             break;

//             case '/about':
//                 const username=myUrl.query.myname;
//                 // res.end("About Page");
//                 res.end(`hi,${username}`);
//             break;

//             case '/search':
//                 const search=myUrl.query.search_query;
//                 res.end("Here are your results for "+search);
                
//             default :
//             res.end("404 not found");
//         }
//     });

// }

// const myServer=http.createServer(myHandler);
// myServer.listen(8000,()=>console.log("Server Started!"));

// Express js for writing a clean code and handling requests more efficiently

const express=require('express');
const app=express(); //creating app or server

app.get('/',(req,res)=>{
    return res.send("Hello from Home Page");
});
app.get('/about',(req,res)=>{
    return res.send(`Hello ${req.query.name}`);
});

app.listen(8000,()=>console.log("Server Started!"));

// not needed any more
// const myServer=http.createServer(app);
// myServer.listen(8000,()=>console.log("Server Started!"));