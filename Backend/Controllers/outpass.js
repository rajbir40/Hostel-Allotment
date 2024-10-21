import Outpass from "../Models/outpass.js";

export async function handleApplyOutpass(req,res) {
    try{
        console.log(req.body)
        const outpass = await Outpass.create({
            name: req.body.formData.name,
            roll_no:req.body.formData.roll_no,
            where:req.body.formData.where,
            reason: req.body.formData.reason,
            dateOfArrival: req.body.formData.dateOfArrival,
            responsibility: req.body.formData.responsibility,
            status: 'Pending' 
          });
          return res.json(outpass);
    }
    catch(error){
        console.log(error)
        res.status(401).json({error:"Please try again"});
    }
}

export async function handleFetchAllRequests(req,res) {
    try{
        const pendingOutpasses =  await Outpass.find({status:"Pending"}).select('-_id');
        res.status(200).json(pendingOutpasses);
    }
    catch(error){
        res.status(401).json({error:"Nothing found"});
    }
}

export async function handleUpdateStatus(req,res) {
    const {Id} = req.params;
    const {update} = req.body;
    try{
        const outpass = await Outpass.findById(Id);
        if(!outpass || !outpass.status){
            return res.status(404).json({message:"invalid outpass"})
        }
        outpass.status = update;
        await outpass.save;
        res.status(200).json({ message: 'Outpass status updated successfully', status });
    }
    catch(err){
        console.log(err);
        return res.status(404).json({message:"stats not updated"});
    }
}

