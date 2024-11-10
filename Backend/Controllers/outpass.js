import Outpass from "../Models/outpass.js";
import User from "../Models/user.js";
import RecentActivity from "../Models/RecentActivity.js";
import nodemailer from 'nodemailer';

export async function handleApplyOutpass(req, res) {
    try {
        console.log(req.body.roll_no);
        
        // Create new outpass request
        const outpass = await Outpass.create({
            name: req.body.name,
            roll_no: req.body.roll_no,
            where: req.body.where,
            reason: req.body.reason,
            dateOfArrival: req.body.dateOfArrival,
            responsibility: req.body.responsibility,
            status: 'Pending' 
        });
        // Create a new recent activity entry
        await RecentActivity.create({
            type: "Outpass Request",
            description: `Outpass Request created for RollNumber ${req.body.roll_no}`,
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
        const user = await User.findOne({ enrollmentId: roll_number });
        const outpass = await Outpass.findOne({ roll_no: roll_number });

        if (!outpass || !outpass.status) {
            return res.status(404).json({ message: "Invalid outpass" });
        }
        const updatedOutpass = await Outpass.findOneAndUpdate(
            { roll_no: roll_number },
            { $set :{status: 'Approved'} },
            { new: true }
        );

        // Update recent activity based on the new status
        let description = "";
        if (status === 'Approved') {
            
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth: {
                    user: "ggbackup8520@gmail.com",
                    pass: "swpj cbea mdni rbdv",
                },
            });

            const mailOptions = {
                from: 'ggbackup8520@gmail.com',
                to: user.email,
                subject: 'Your OTP for Order Confirmation',
                text: `Your OTP for confirming your order is ${roll_number}.`,
            };

            await transporter.sendMail(mailOptions);
            description = `Request Approved for RollNumber ${roll_number}`;
        }

        // Update the outpass status directly using findOneAndUpdate
        

        if (!updatedOutpass) {
            return res.status(404).json({ message: "Outpass status update failed" });
        }

        // Log the updated outpass status to confirm the update
        console.log(updatedOutpass);

        // Create a new recent activity entry for approval/rejection
        await RecentActivity.create({
            type: "Outpass Request",
            description: description,
            resolved: true
        });

        res.status(200).json({ message: 'Outpass status updated successfully', outpass: updatedOutpass });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Status not updated due to server error" });
    }
}


export async function handleFetchOutpass(req, res) {
    try {
      const studentId = String(req.params.id);
      const outpasses = await Outpass.find({ roll_no: studentId }).sort({ createdAt: -1 }).limit(10);
      res.json(outpasses);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching outpass requests' });
    }
  }
