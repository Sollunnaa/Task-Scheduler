import express from 'express';
import { getUsers, createUser, getUserById, editUser, softDeleteUser, restoreUser, hardDeleteUser } from '../controllers/userController';


const router = express.Router();


router.post("/createUser", createUser);

router.get("/getUsers", getUsers)
router.get("/getUser/:id", getUserById);

router.put("/editUser/:id", editUser);

router.put("/softDeleteUser/:id", softDeleteUser);
router.put("/restoreUser", restoreUser);

router.delete("/hardDeleteUser/:id", hardDeleteUser)
export default router;