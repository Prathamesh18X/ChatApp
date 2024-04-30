import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';

import authRouter from "./routes/auth.routes.js";
import messageRouter from "./routes/message.routes.js";
import groupRouter from "./routes/group.routes.js";
import userRouter from "./routes/user.routes.js";
import connectToMongoDB from './db/connect.js';
import {app , server} from "./socket/socket.js" // 2.import socket

// const app = express();  // 1.move app to socket

dotenv.config();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();//provide absolute path to root folder

app.use(express.json()); // to parse upcoming JSON request from req.body
app.use(cookieParser());

// app.get("/",(req,res)=>{
//     res.send("hello from server");
// })

app.use("/api/auth" , authRouter);
app.use("/api/messages" , messageRouter);
app.use("/api/groups" , groupRouter);
app.use("/api/users" , userRouter);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});//to serve static files like: HTML and build frontend app

server.listen(PORT,()=>{//3.update app -> server
    connectToMongoDB();
    console.log(`server running on port , ${PORT}`)
});