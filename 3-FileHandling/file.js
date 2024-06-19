const fs = require('fs');
const os=require('os');

// // Write : Sync
// fs.writeFileSync('./test.txt','Hello world!');

// // Write : Async 
// fs.writeFile('./test.txt','This is async file',(err)=>err);

// // Read : Sync - stores in variable
// const result=fs.readFileSync("./contacts.txt","utf-8");
// console.log(result);

// // Read : Async - cannot store in variable
// fs.readFile("./contacts.txt","utf-8",(err,result)=>{
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log(result);
//     }
// });

// Append
// fs.appendFileSync("./test.txt","\n"+new Date().getDate().toLocaleString());
// fs.appendFileSync("./test.txt",`\nHey There,${Date.now()}\n`);

// copy file
// fs.cpSync('./test.txt','./copytest.txt');
// fs.unlinkSync('./copytest.txt');

// stats
// console.log(fs.statSync("./test.txt"));

// mkdir
// fs.mkdirSync('mydocs/a/b',{recursive:true});

// rmdir
// fs.rmdirSync('mydocs/a/b'); // deletes only b

// thread pool size
// console.log(os.cpus().length); 