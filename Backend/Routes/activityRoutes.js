// routes/activityRoutes.js
import express from 'express';
import RecentActivity from '../Models/RecentActivity.js'; // Adjust path if necessary

const router = express.Router();

router.get('/recent-activities', async (req, res) => {
    try {
        const activities = await RecentActivity.find().sort({ timestamp: -1 }).limit(10); // Limit to latest 10 activities
        res.json(activities);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching recent activities' });
    }
});

export default router;
