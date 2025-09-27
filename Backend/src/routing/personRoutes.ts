import { createPerson, editPerson, getPersonById, getPersons, hardDeletePerson, restorePerson, softDeletePerson } from '../controllers/personController';
import express from 'express';

const router = express.Router();

router.post("/createPerson", createPerson);

router.get("/getPerson/:id", getPersonById);
router.get("/getAllPersons", getPersons)

router.put("/editPerson/:id", editPerson);

router.put("/softDeletePerson/:id", softDeletePerson);
router.put("/restorePerson/:id", restorePerson);

router.delete("/hardDeletePerson/:id", hardDeletePerson);
export default router;