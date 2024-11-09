import express from "express";
import { connectMongoDB } from "./connection.js";
import userRoute from "./Routes/user.js";
import cors from "cors"
import cookieParser from "cookie-parser";
import outpassRoute from "./Routes/outpass.js";
import hostelRoute from "./Routes/Hostel.js";
import adminRoute from "./Routes/admin.js";
import activityRoutes from "./Routes/activityRoutes.js";

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin:true,
    credentials:true
}))

connectMongoDB("mongodb+srv://software:jupyter@cluster0.tv4pl.mongodb.net/")
.then(()=>console.log("MongoDB connected"));

app.use(cookieParser());

app.use("/activity",activityRoutes);
app.use("/user",userRoute);
app.use("/pending",outpassRoute);
app.use("/update",outpassRoute);
app.use("/addhostel",hostelRoute);
app.use("/bookroom",hostelRoute);
app.use("/room",hostelRoute);
app.use("/getuser",userRoute);
app.use("/outpasses",outpassRoute);

app.use("/getrooms",hostelRoute);
app.use("/gethostel",hostelRoute);
app.use("/rooms",hostelRoute);

app.use("/bookroomrequest",hostelRoute);
app.use("/roomrequests",hostelRoute);

app.use("/getnumber",adminRoute);



app.listen(PORT,()=>{
    console.log("Running on port 8000");
})


