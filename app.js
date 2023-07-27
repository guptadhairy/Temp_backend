import express from "express";
import {config} from 'dotenv';
import mongoose from "mongoose";
import userRouter from './routes/user.js';
import contactRouter from './routes/contact.js';
import newsRouter from './routes/news.js';
import paymentRouter from "./routes/payment.js";
import cookieParser from "cookie-parser";
import cors from 'cors'

const app = express();
config({
    path: "./data/config.env",
});


app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: [process.env.FRONTEND_URL],
        methods: ["GET","POST"],
        credentials: true,
    })
);

app.use(userRouter);
app.use(contactRouter);
app.use(newsRouter);
app.use(paymentRouter);
mongoose.connect(process.env.MONGO_URI,{
    dbName:"temple",
}).then((c)=> console.log(`Database is connected  with ${c.connection.host}`)).catch((e)=>console.log(e));


app.get("/",(req,res)=>{
    res.send("Hey Tony its me dober");
})

app.listen(4000,()=>{
    console.log(`Server is working on ${process.env.PORT}`);
})