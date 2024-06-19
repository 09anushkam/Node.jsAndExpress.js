# Backend

## Lec 2,3 - Node js and npm  

Node js is run time environment for js  
npm is package manager  

`node -v` or `node --version` -> to check version of node  
`npm -v` -> to check the version of npm  
`node` -> to open nodejs interactive terminal  
`node filename.js` or `node filename` -> to execute particular js file  
`npm start` -> to execute a js file (if package.json contains `"start": "node filename.js"` in scripts)  
`npm init` -> creates package.json  

## Lec 4 - modules  

-> math.js  

function add(a,b){return a+b}  
function sub(a,b){return a-b}  
module.exports=add;
module.exports=sub; <!-- Overwrites add function -->  
module.exports={  
    addFn:add,  
    subFn:subtract  
}  

-> hello.js  
const math = require('./math');  
console.log(math.addFn(5,2));  
const {addFn,subFn} = require('./math');  <!-- destructing function to use directly -->
console.log(addFn(5,2));  

## Lec 5 - File Handling / fs module  

For synchronous functions -  
fs.function('filename.extension',"text");  
<!-- read request has one more parameter "utf-8" for encoding instead of text -->  

For asynchronous functions -  
fs.function('filename.extension',"text",callback);  

## Lec 6 - How Nodejs Works  

client make request to a server  
requests gets stored in `Event Queue`  
picking up requests is done by `Event Loop`  
Preferable: Async request -> Non-blocking Operations -> Processes the request  
Sync request -> Blocking Operations -> Thread Pool(gives thread for executing task)  

<!-- default thread pool size - 4 -->
const os=require('os');  
console.log(os.cpus().length);  

## Lec 7 - HTTP Server  

`npm init`  
<!-- Creating a server -->  
const http=require('http');  

const myServer=http.createServer((req,res)=>{  
    console.log("New Request received");  
    res.end("Hello from Server");  
});  

myServer.listen(8000,()=>console.log("Server Started!"));  

<!-- To run server -->
`npm start`  

## Lec 8 - Handling URLs / URL Modules  

URL - Uniform Resource Locator  
URL is userfriendly name of an IP address  
URL contains - path,nested path,query parameters  

`npm i url`  

const http=require('http');  
const url=require('url');  
const myServer=http.createServer((req,res)=>{  

    const myUrl=url.parse(req.url,true);  
    console.log(myUrl);  

    const username=myUrl.query.myname;  
    res.end(`hi,${username}`);  
});  

myServer.listen(8000,()=>console.log("Server Started!"));  

## Lec 9 - HTTP Methods  

GET - get some data from server  
POST - sending and mutating data on some server  
PUT - uploading file/image  
PATCH - changing  
DELETE - deleting account  

## Lec 10 - Express js  

Express js helps in keeping code clean and organized  
`npm i express`  

const express=require('express');  
const app=express(); //creating app or server  

// app.method(path,handler);  

app.get('/',(req,res)=>{  
    return res.send("Hello from Home Page");  
});  
app.get('/about',(req,res)=>{  
    return res.send(`Hello ${req.query.name}`);  
});  

app.listen(8000,()=>console.log("Server Started!"));  

## Lec 11 - Versioning  

eg : 4.18.2  
^ -> install all recommended and minor fixes automatically (can't change 1st part of version)  
~ -> install all minor fixes automatically (can't change 1st and 2nd part of version)  
1st part-> 4 -> major update (breaking update)  
2nd part-> 18 -> recommended bug fix (security update)  
3rd part-> 2 -> minor fixes (optinal update)  
versions contains ranges as well  

npm install express@4.17.2 <!-- installing particular version -->  

## Lec 12 - Rest Api  

1. server <-> client  
2. always respect all http methods  

## Lec 13 - Building Rest Api using Node.js and Express.js  

`npm init`  
`npm i express`  
`npm start`  

REST API - JSON  

HYBRID SERVER :-  
/api/users - return json (alexa and something like that can get data from here)  
/users - else html data will be returned (browser can get data from here)  

GET /users - HTML Document Render  
GET /api/users - List all users  

DYNAMIC PATH PARAMETERS :-  
GET /api/users/:id -> :id - variable  
GET /api/users/1 - Get the user with id 1  
GET /api/users/2 - Get the user with id 2  

POST /api/users - Create new user  
PATCH /api/users/1 - Edit the user with id 1  
DELETE /api/users/1 - Delete the user with id 1  

app  
.routes('')  
.method1(callback)  
.method2(callback)  

eg :  
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

## Lec 14 - Rest Api using Postman / Rest Api - 2  

// Middleware - Plugin  
app.use(express.urlencoded({extended: false})); // adds data in req.body sent by post request  

// post  
app  
.routes('/api/users')  
.post((req,res)=>{  
    // Create new user  
    const body=req.body;  
    // console.log("Body",body);  
    users.push({...body, id:users.length+1});  
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{  
        return res.json({status:'success',id:users.length});  
    });  
});  

## Lec 15 - Express Middlewares  

app.use((req,res,next)=>{  
    console.log("Hello from middleware 1");  
    // return res.json({msg:"Hello from middleware 1"});  
    next(); //go to next middleware or routes  
});  

## Lec 16 - HTTP Header  

http headers represent the meta data  
associated with the API request and response  

// Always add X to custom headers  
res.setHeader("X-myName","Anushka Murade");  

## Lec 17 - HTTP status codes  

100 - 199 -> Informational responses  

200 - 299 -> Successful responses  
200 -> OK  
201 -> Created  
202 -> Accepted  

300 - 399 -> Redirectional messages  

400 - 499 -> Client error response  
400 -> Bad Request  
401 -> Unauthorised  
402 -> Payment Required  
403 -> Forbidden  
404 -> NOT FOUND  
405 -> Method not allowed  
406 -> Not Acceptable  
407 -> Proxy Authentication Required  
408 -> Request Timeout

500 - 599 -> Server error responses  
500 -> Internal Server Error  
501 -> Not Implemented  
502 -> Bad Gateway  

### IMP NOTE  

`npm i nodemon` - TO AVOID RESTARTING OF SERVER USE THIS PACKAGE  
`"start": "nodemon index.js"` - in scripts of package.json  

## Lec 18 - Mongodb Setup  

- No-SQL Document Based Database  
- Strong Support for Aggregation Pipes  
- Works on BSON format  
- Best for Node Applications  

## Lec 19 - Connecting Node.js with MongoDB (Mongoose + Express)  

`npm i mongoose` - helps in connecting mongodb with nodejs  

const mongoose=require('mongoose');  

// Connection  
mongoose.connect("mongodb://localhost:27017/mongotut")  
.then(()=>console.log("Mongodb Connected!"))  
.catch((error)=>console.log("Mongodb connection error",error));  

// Schema  
const userSchema=new mongoose.Schema({  
    firstName:{  
        type:String,  
        required:true,  
    },  
    lastName:{  
        type:String,  
    },  
    email:{  
        type:String,  
        required:true,  
        unique:true,  
    },  
    jobTitle:{  
        type:String,  
    },  
    gender:{  
        type:String,  
    },  
});  

// User model  
const User=mongoose.model('user',userSchema);  

app  
.route('/api/users')  
.get(async(req,res)=>{  
    const alldbUsers=await User.find({});  
    return res.json(alldbUsers);  
})  
.post(async(req,res)=>{  
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
    return res.status(201).json({msg:"success"});  
});  

app  
.route('/api/users/:id')  
.get(async(req,res)=>{  
    const user=await User.findById(req.params.id);  
    if(!user) return res.status(404).json({error:"user not found"});  
    return res.json(user);  
})  
.patch(async(req,res)=>{  
    await User.findByIdAndUpdate(req.params.id,{lastName:"Changed"});  
    return res.status(200).json({status:'changed successfully'});  
})  
.delete(async(req,res)=>{  
    await User.findByIdAndDelete(req.params.id)  
    return res.json({status:'deleted successfully'});  
});  

## Lec 20 - MVC Pattern  

view -> middleware -> routes -> controllers -> models  

views (frontend)  
middleware(plugins)
routes (url handling and http methods)  
controllers (crud operations)  
models (database schema)  

## Lec 21 - Url Shortener  

npm init  
npm i express  
npm i mongoose  
npm i nodemon  
npm i nanoid - not working  
npm i shortid  

## Lec 22 - Serverside Rendering  

npm i ejs  

make dir views and inside of that home.ejs file

const URL=require('./models/url');
app.set('view engine',"ejs");  
app.set('views',path.resolve("./views"));  

app.get("/",async(req,res)=>{  
    const allUrls=await URL.find({});  
    return res.render('home',{  
        urls: allUrls,  
    });  
});  

`locals.user - locals takes data of user from backend in frontend`  

## Lec 23 - Authentication  

Authentication patterns - Statefull vs Stateless :  
Statefull - maintains state or data on server side  
Stateless - which has no state  

here session ids are created - statefull authentication  
keeps user logged in for shorter period of time  
signup  
login  
npm install uuid  
npm i cookie-parser  

## Lec 24 - JWT(json web token) Authentication  

jwt tokens (they are signed) - stateless authentication  
keeps user logged in for longer period of time  
npm i jsonwebtoken  

## Lec 25 - Cookies  

recap till now...  
db (checks login details) <- server <- (username,password) user  
|  
generates jwt token(with id,name,email as info on it)  

ways of giving token to user in secure way :  

1. through cookies - res.cookie()  
2. through simple response - res.json({token})  

cookies are domain specific  
cookies are secure  
we can even set expiry date on cookie  

so how to send the token to user and store it  
standard way : build-in header - `authorization :"Bearer <token>"`  
refer middlewares/auth.js for code  

## Lec 26 - Authorization  

Authorization means giving access to only admin/some specific user and not all users  

## Lec 27 - Creating Discord Bot  

npm init  
npm i nodemon  
npm install discord.js  

Discord settings -> advanced -> switch on developer's mode  
google -> discord developers portal -> create bot  
(incomplete info)  

## Lec 28 - Uploading Files with Nodejs and Multer  

npm init  
npm i express  
npm i nodemon  
npm i ejs  
npm start  
npm i multer  

index.js -  

            const path=require("path");
            const express=require("express");
            const multer  = require('multer');

            const app=express();
            const PORT=8001;

            // storage
            const storage=multer.diskStorage({
                destination:function(req,file,cb){
                    return cb(null,'./uploads');
                },
                filename:function(req,file,cb){
                    const filename=`${Date.now()}-${file.originalname}`
                    return cb(null,filename);
                },
            });
            const upload=multer({storage});

            // setting view engine as ejs
            app.set("view engine","ejs");
            app.set("views",path.resolve("./views"));

            // middleware
            app.use(express.urlencoded({extended:false})); //for post

            // route
            app.get("/",(req,res)=>{
                return res.render("homepage");
            });

            // app.post('/upload',upload.single('profileImage'),(req,res)=>{
            //    console.log("File Uploaded!");
            //    return res.redirect("/");
            // });
            app.post('/upload',upload.fields([{name:'profileImage'},{name:'coverImage'}]),(req,res)=>{
                console.log("File Uploaded!");
                return res.redirect("/");
            });

            app.listen(PORT,()=>console.log(`Server started at PORT : ${PORT}`));

views/homepage.ejs -  

            <!DOCTYPE html> 
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>File Upload</title>
            </head>
            <body>
                <form action="/upload" method="POST" enctype="multipart/form-data">
                    <input type="file" name="profileImage"/>
                    <input type="file" name="coverImage">
                    <button type="submit">Upload</button>
                </form>
            </body>
            </html>

## Lec 29 - Setting up Blogging App  

- npm init  
- npm i express  
- npm i nodemon -D  
- npm i ejs  
- npm i mongoose  

- crypto hash nodejs - creatHmac  
models -> user.js -  

      // created salt for password hashing  
      // crypto hash nodejs - createHmac  
      // when u save these details it generate a salt  
      userSchema.pre('save',function(next){  
          const user=this;  

          if(!user.isModified('password')) return;  

          const salt=randomBytes(16).toString();  
          const hashedPassword=createHmac("sha256",salt).update(user.password).digest("hex");  

          this.salt=salt;  
          this.password=hashedPassword;  

          next();  
      });  

- mongoose virtual function - userSchema.static("",function)  
models -> user.js -  

      // mongoose virtual function  
      userSchema.static('matchPassword',async function(email,password){  
          const user=await this.findOne({email});  

          if(!user) throw new Error("User not found!");  

          const salt=user.salt;  
          const hashedPassword=user.password;  

          const userProvidedHash=createHmac("sha256",salt).update(password).digest("hex");  

          if(hashedPassword!==userProvidedHash) throw new Error("Incorrect Password!");  

          return user;  
      });  

- index.js -> imported - path,mongoose,express,userRoute  
created express app,  
connected to mongodb,  
setting ejs view engine,  
middleware required for post,  
on / render home,  
added user route,  
app.listen(PORT,`Server started at PORT: ${PORT}`),  

- views -> home,signup,signin ( partials(kindoff component) -> head, nav, scripts )  
- models -> user.js -> schema , password hashing using salt  
- routes -> user.js -> get('/signup'), get('/signin'), post('/signin'), post('/signup')  

## Lec 30 - Adding Authentication to blogging App  

- npm i jsonwebtoken  
- npm i cookie-parser

- creating services/authentication.js -  

      const JWT=require("jsonwebtoken");
      const secret="$Superman@123";

      function createTokenForUser(user){
          const payload={
              _id:user._id,
              email:user.email,
              profileImageURL:user.profileImageURL,
              role:user.role,
          };
          const token=JWT.sign(payload,secret);
          return token;
      }

      function validateToken(token){
          const payload=JWT.verify(token,secret);
          return payload;
      }

      module.exports={createTokenForUser,validateToken};

- modified virtual function -> modes/user.js -  

      const {createTokenForUser}=require("../services/authentication");

      userSchema.static('matchPasswordAndGenerateToken',async function(email,password){
          const user=await this.findOne({email});

          if(!user) throw new Error("User not found!");

          const salt=user.salt;
          const hashedPassword=user.password;

          const userProvidedHash=createHmac("sha256",salt).update(password).digest("hex");

          if(hashedPassword!==userProvidedHash) throw new Error("Incorrect Password!");

          const token=createTokenForUser(user); //modified part
          return token;
      });

<!-- index.js -> user route,middlewares,blog route 
views -> home,signup,signin,addBlog ( partials -> head, nav, scripts )  
models -> user.js -> schema , password hashing using salt
models -> blog.js -> schema 
routes -> user routes created, blog routes created, -->

- routes -> user.js -> post('/signin') - (some changes are made)

          const token=await User.matchPasswordAndGenerateToken(email,password); //returns token  
          return res.cookie("token",token).redirect("/"); // returns cookie with token in it  

          // also to handle wrong password or email error try catch is added  
          router.post('/signin',async(req,res)=>{
          const {email,password}= req.body;
          try{
              const token=await User.matchPasswordAndGenerateToken(email,password); //returns token
              return res.cookie("token",token).redirect("/"); // returns cookie with token in it  
          }catch(error){
              return res.render("signin",{
                  error:"Incorrect Email or Password",
              });
          }
      });

- views ->  partials -> head -> error - added (for incorrect email and password)  

note - render() takes page name and not path where as redirect takes path  

- middlewares -> authentication.js created -  

      const { validateToken } = require("../services/authentication");

      // Checking authentication cookie
      function checkForAuthenticationCookie(cookieName){
          return (req,res,next)=>{
              const tokenCookieValue=req.cookies[cookieName];
              if(!tokenCookieValue){
                return next();
              }
              try{
                  const userPayload=validateToken(tokenCookieValue);
                  req.user=userPayload;
              }catch(error){}
              return next();
          }
      }

      module.exports={
          checkForAuthenticationCookie,
      }

- index.js (added middlewares and ) -

      const cookieParser=require("cookie-parser");
      const { checkForAuthenticationCookie } = require("./middlewares/authentication");

      // middlewares
      app.use(express.urlencoded({extended:false}));
      app.use(cookieParser());
      app.use(checkForAuthenticationCookie('token'));

      // homepage - some changes are made here
      app.get('/',(req,res)=>{
          res.render("home",{
          user:req.user, //required for nav data
          });
      });

- views ->  nav links edited and added some conditionals  

- routes/user.js (logout route added) -

      // logout  
      router.get('/logout',(req,res)=>{  
          res.clearCookie("token").redirect("/");  
      });  
      //also changes are made in nav link as per requirement  

- model -> blog.js created  
blogSchema and Blog model created  

- view -> addBlog.ejs created  

- routes -> blog.js created -

      const {Router}=require("express");
      const Blog=require("../models/blog");

      // creating a router
      const router=Router();

      // renders add new blog
      router.get('/add-new',(req,res)=>{
          return res.render('addBlog',{
              user:req.user, //required for nav data
          });
      });

- index.js -> blogRoute added

      const blogRoute=require("./routes/blog");
      app.use("/blog",blogRoute);

- views -> partials -> nav.ejs added /blog/add-new route in nav link  

- views -> addBlog.ejs -> form edited  

- routes/blog.js post method added  

      // submiting blog via post method
      router.post('/',(req,res)=>{
          console.log(req.body);
          return res.redirect("/"); //redirect to /blog
      });

- npm i multer  

- in routes/blog.js  

      // multer is imported and diskStorage is created for uploading cover image of blog  
      const multer=require("multer");
      const path=require("path");

      // creating diskStorage
      const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null,path.resolve('./public/uploads/'));
        },
        filename: function (req, file, cb) {
          const fileName=`${Date.now()} - ${file.originalname}`
          cb(null,fileName);
        }
      });

      const upload = multer({ storage: storage });

      // submiting blog via post method
      router.post('/',upload.single('coverImage'),async(req,res)=>{
          const {title,body}=req.body;
          const blog=await Blog.create({
              title,
              body,
              createdBy:req.user._id,
            coverImageURL:`/uploads/${req.file.filename}`
          });
          return res.redirect(`/blog/${blog._id}`); //redirect to /blog
      });

Note don't forget to add `enctype="multipart/form-data"` in form in addBlog.ejs  

- index.js - rendering blogs card on homepage  

      const Blog=require("../models/blog");

      // homepage
      app.get('/',async(req,res)=>{
        const allBlogs=await Blog.find({}).sort('createdAt',-1);
          res.render("home",{
              user:req.user, //required for nav data
              blogs:allBlogs,
          });
      });

- views/home.ejs card of blogs are added in foreach loop  

- index.js - added a middleware to tell express that it can serve public folder as static one

      app.use(express.static(path.resolve('./public'))); //serve whatever is inside the public statically

- home.ejs -  
changes made in path view button of blogs  

## Lec 31 - Remaining part of Blogging App  

- created a dynamic route in blog.js -

      // renders particular blog
      router.get('/:id',async(req,res)=>{
        const blog=await Blog.findById(req.params.id);
        return res.render('blog',{
          user:req.user,
          blog,
        });
      });

- view -> blog.ejs -> creating blog.ejs to render a particular blog  

- models -> comment.js - created comments model  

- route -> blog.js -> creating route for comments and editing rendering particular blog route

      // creating route for comments
      router.post('/comment/:blogId',async(req,res)=>{
        await Comment.create({
          content:req.body.content,
          blogId:req.params.blogId,
          createdBy:req.user._id,
        });
        return res.redirect(`/blog/${req.params.blogId}`);
      });
      // renders particular blog
      router.get('/:id',async(req,res)=>{
        const blog=await Blog.findById(req.params.id).populate('createdBy');
        const comments=await Comment.find({blogId:req.params.id}).populate(
          "createdBy"
        );
        console.log('comments',comments);
        return res.render('blog',{
          user:req.user,
          blog,
          comments,
        });
      });

- views -> blog.ejs -> handling add comments part

- till now  
we can signup  
signin  
logout  
submit a blog  
adding comments

- self learning topics -  
// handling admin part  
// edit/delete  
// issue - Anushka Murade (hard coded) in navbar <!-- Name should be dynamic in navbar -->  
// user profile image upload is not handled  

## Lec 32 - Deploying Blog App  

- for deployment purpose use env variable  
-> index.js -  

            const PORT=process.env.PORT||8000;  

- connecting to mongodb using mongoose  

            mongoose  
            .connect(process.env.MONGO_URL)    //'mongodb://localhost:27017/blogify'  
            .then((e)=>console.log("MongoDB Connected!"));  

- make sure inside of package.json u have proper start script cloud providers uses start script  

            "scripts": {  
                "start": "node app.js",  
                "dev": "nodemon app.js"  
            },  

- rename index.js -> app.js  

- accordingly make changes in package.json  

  "main": "app.js",  
  "scripts": {  
    "start": "node app.js",  
    "dev": "nodemon app.js"  
  },  

- create .env file  
.env -  

- npm i dovenv  

- app.js  
at the top import dotenv  

            require('dotenv').config();

- amazon web services  
make free acc  
select region mumbai to reduce the latency  
search for beanstalk in the website  
Note-`this deployment part is incomplete`
<!-- 9:43 -->

## Lec 33 - Socket.io  

Polling - requesting server after every sec to ask do u have any msg for me?  
req,res cycle is Unidirectional  
to make it bidirectional we use web sockets  

npm init -y  
npm i express  
npm i socket.io  

## Lec 34 - Streams  

Text file - content  
express server - / -> file.txt (content) -> user  
to reduce load while reading file we use streams  

npm init -y  
npm i express  
npm i nodemon  
npm i express-status-monitor  
const zlib=require("zlib"); // zipping a file without memory usage  

## Lec 35 - Clusters  

Clusters of Node.js processes can be used to run multiple instances of Node.js that can distribute workloads among their application threads. When process isolation is not needed, use the worker_threads module instead, which allows running multiple application threads within a single Node.js instance.

The cluster module allows easy creation of child processes that all share server ports.

process -> divide multiple threads to reduce load  
