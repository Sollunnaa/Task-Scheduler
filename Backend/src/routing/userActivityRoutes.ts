import express from 'express';
import { createUserActivity, getUserActivities, getUserActivityById,editUserActivity, softDeleteUserActivity, restoreUserActivity, hardDeleteUserActivity} from '../controllers/user_activityController';
import { editUser } from '../controllers/userController';

export const router = express.Router();

router.post("/createUserActivity", createUserActivity);

router.get("/getUserActivities", getUserActivities);
router.get("/getUserActivity/:id", getUserActivityById);

router.put("/editUserActivity/:id", editUserActivity);

router.put("/softDeleteUserActivity/:id", softDeleteUserActivity);
router.put("/restoreUserActivity/:id", restoreUserActivity);

router.delete("/hardDeleteUserActivity/:id", hardDeleteUserActivity);

export default router;