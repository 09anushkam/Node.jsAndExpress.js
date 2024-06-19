const express=require("express");
const {connectMongodb}=require("./connection");

const {logReqRes}=require("./middlewares");

const userRouter=require("./routes/user");

const app=express();
const PORT=8000;

// Connection
connectMongodb("mongodb://localhost:27017/mongotut")
.then(()=>console.log("Mongodb Connected!"));

// Middleware - Plugin
app.use(express.urlencoded({extended: false}));
app.use(logReqRes('log.txt'));

// ROUTES
app.use("/api/users",userRouter);

app.listen(PORT,()=>console.log(`Server started at Port ${PORT}`));
