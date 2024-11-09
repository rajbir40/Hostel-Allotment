import mongoose from "mongoose";

const outpassSchema = new mongoose.Schema(
    {
        name:{type:String,required:true,},
        roll_no:{type:String,required:true,unique:true},
        where:{type:String,required:true,},
        responsibility:{type:String, required:true, default:'Yes'},
        reason: { type: String, required: true },
        dateOfArrival: { type: Date, required: true },  
        status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
        },
    {timestamps:true}
);

const Outpass = mongoose.model("outpass",outpassSchema);

export default Outpass;