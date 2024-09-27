import express from "express";
import { connectMongoDB } from "./connection.js";
import userRoute from "./Routes/user.js";
import cors from "cors"
import cookieParser from "cookie-parser";
import outpassRoute from "./Routes/outpass.js"

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin:true,
    credentials:true
}))


connectMongoDB("mongodb://127.0.0.1:27017/hostel-allotment")
.then(()=>console.log("MongoDB connected"));

app.use(cookieParser());

app.use("/user",userRoute);
app.use("/pending",outpassRoute);
app.use("/update",outpassRoute);

app.listen(PORT,()=>{
    console.log("Running on port 8000");
})


