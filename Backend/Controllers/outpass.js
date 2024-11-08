import Outpass from "../Models/outpass.js";
import RecentActivity from "../Models/RecentActivity.js";

export async function handleApplyOutpass(req, res) {
    try {
        console.log(req.body);
        
        // Create new outpass request
        const outpass = await Outpass.create({
            name: req.body.formData.name,
            roll_no: req.body.formData.roll_no,
            where: req.body.formData.where,
            reason: req.body.formData.reason,
            dateOfArrival: req.body.formData.dateOfArrival,
            responsibility: req.body.formData.responsibility,
            status: 'Pending' 
        });

        // Create a new recent activity entry
        await RecentActivity.create({
            type: "Outpass Request",
            description: `Outpass Request created for RollNumber ${req.body.formData.roll_no}`,
            resolved: false
        });

        return res.json(outpass);
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: "Please try again" });
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

export async function handleUpdateStatus(req, res) {
    const { status, roll_number } = req.body;
    try {
        const outpass = await Outpass.findOne({ roll_no: roll_number });
        if (!outpass || !outpass.status) {
            return res.status(404).json({ message: "Invalid outpass" });
        }

        // Update recent activity based on the new status
        let description = "";
        if (status === 'Approved') {
            description = `Request Approved for RollNumber ${roll_number}`;
        } else if (status === 'Rejected') {
            description = `Request Rejected for RollNumber ${roll_number}`;
        }

        // Create a new recent activity entry for approval/rejection
        await RecentActivity.create({
            type: "Outpass Request",
            description: description,
            resolved: true
        });

        // Update the outpass status
        outpass.status = status;
        await outpass.save();

        res.status(200).json({ message: 'Outpass status updated successfully', outpass });
    } catch (err) {
        console.log(err);
        return res.status(404).json({ message: "Status not updated" });
    }
}
