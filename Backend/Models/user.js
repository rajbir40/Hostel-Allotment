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
        address:{
            type:String,
            required:true,
        },
        enrollmentId:{
            type:String,
            required:true,
            unique:true,
            default:"ADM123"
        },
        phoneNumber:{
            type:Number,
            required:true,
        },
        password:{
            type:String,
            required:true,
        },
        dob:{
            type:Date,
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
            default:"Student",
        },
        roomNumber:{
            type:Number,
            default:null,
        },
    },
    {timestamps:true}
);

const User = mongoose.model("user",userSchema);

export default User;