import express from 'express';
import {hardDeleteActivity, createActivity, getActivities, getActivityById ,editActivity, softDeleteActivity, restoreActivity} from '../controllers/activityController';

const router = express.Router();

router.post("/createActivity", createActivity);

router.get("/getActivities", getActivities);
router.get("/getActivity/:id", getActivityById);

router.put("/editActivity/:id", editActivity);

router.put("/softDeleteActivity/:id", softDeleteActivity);
router.put("/restoreActivity/:id", restoreActivity);

router.delete("/hardDeleteActivity/:id", hardDeleteActivity);

export default router;