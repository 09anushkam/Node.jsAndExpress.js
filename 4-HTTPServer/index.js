const http=require('http');
const fs=require('fs');

const myServer=http.createServer((req,res)=>{
    // console.log("New Request received");
    // console.log(req.headers);

    const log=`${Date.now()} : ${req.url} : New Request Received\n`;
    fs.appendFile('log.txt',log,(err,data)=>{
        // res.end("Hello from Server\n");
        // res.end("Hello from Server again\n");
        switch(req.url){
            case '/':res.end("Home Page");
            break;
            case '/about':res.end("About Page");
            break;
            default :res.end("404 Not found");
        }
    });
});

myServer.listen(8000,()=>console.log("Server Started!"));
