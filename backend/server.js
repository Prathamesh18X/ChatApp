import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRouter from "./routes/auth.routes.js";
import messageRouter from "./routes/message.routes.js";
import userRouter from "./routes/user.routes.js";
import connectToMongoDB from './db/connect.js';

const app = express();

dotenv.config();
const PORT = process.env.PORT || 5000;
app.use(express.json()); // to parse upcoming JSON request from req.body
app.use(cookieParser());

app.get("/",(req,res)=>{
    res.send("hello from server");
})

app.use("/api/auth" , authRouter);
app.use("/api/messages" , messageRouter);
app.use("/api/user" , userRouter);

app.listen(PORT,()=>{
    connectToMongoDB();
    console.log(`server running on port , ${PORT}`)
});