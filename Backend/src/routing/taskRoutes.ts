import express from 'express';
import { createTask, editTask, getTaskById, getTasks, hardDeleteTask, restoreTask, softDeleteTask } from '../controllers/taskController';

const router = express.Router();

router.post('/createTask', createTask);

router.get('/getTasks', getTasks);
router.get('/getTask/:id', getTaskById);

router.put('/editTask/:id', editTask);

router.put('/softDeleteTask/:id', softDeleteTask);
router.put('/restoreTask/:id', restoreTask);

router.delete('/deleteTask/:id', hardDeleteTask);

export default router;