import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import {getTasks, getTaskById, createTask, updateTask, deleteTask } from '../controllers/taskController.js';

const router = express.Router();

router.get('/tasks', getTasks)
router.get('/tasks/:id', getTaskById)

router.post('/tasks', authMiddleware, createTask);
router.patch('/tasks/:id', authMiddleware, updateTask);
router.delete('/tasks/:id', authMiddleware, deleteTask);	

export default router;
