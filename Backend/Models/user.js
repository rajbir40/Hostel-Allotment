import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
        },
        password:{
            type:String,
            required:true,
        },
        otp:{
            type:String,
            required:false,
        },
        expiredAt:{
            type:String,
            required:false,
        },
        role:{
            type:String,
            required:true,
            default:"Student",
        },
    },
    {timestamps:true}
);

const User = mongoose.model("user",userSchema);

export default User;