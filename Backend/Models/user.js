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
            required:true,
            default:"Student",
        },
        roomId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Room',
            default: null,
        },
    },
    {timestamps:true}
);

const User = mongoose.model("user",userSchema);

export default User;