import { Request,Response } from "express";
import {tasks } from "../Config/schema";
import db from "../db";
import {eq,and} from 'drizzle-orm';

export const createTask = async (req: Request, res: Response) => {
    try {
        const { title, description, userActivitiesId } = req.body;
        const newTask = await db.insert(tasks).values({
            title,
            description,
            userActivitiesId,
        }).returning();
        res.status(201).json(newTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create task" });
    }
};

export const getTasks = async (req: Request, res: Response) => {
    try {
        const allTasks = await db.select().from(tasks)
        .where(eq(tasks.isDeleted, false)); // Exclude soft-deleted tasks
        res.status(200).json(allTasks);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch tasks" });
    }
};
export const getTaskById = async (req: Request, res: Response) => {
    console.log("getTask route called with id:", req.params.id);    
    const { id } = req.params;
    try {
    const task = await db.select().from(tasks).where(and(
        eq(tasks.id, Number(id)),
        eq(tasks.isDeleted, false)
    ));
    if(task.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json(task);
  }catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch task" });
  }
};

export const editTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        console.log("Editing task with id:", id);
        const { title, description, isDone, userActivitiesId } = req.body;
        const updatedTask = await db.update(tasks).set({
            title,
            description,
            isDone,
            userActivitiesId,
        }).where(eq(tasks.id, Number(id))).returning(); 
        if(updatedTask.length === 0) {
          return res.status(404).json({ error: "Task not found" });
        } res.status(200).json(updatedTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update task" });
    }
};

export const softDeleteTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedTask = await db.update(tasks).set({
            isDeleted: true,
        }).where(eq(tasks.id, Number(id))).returning();
        if(deletedTask.length === 0) {
          return res.status(404).json({ error: "Task not found" });
        }
        res.status(200).json(deletedTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete task" });
    }
};

export const restoreTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const restoredTask = await db.update(tasks).set({
            isDeleted: false, 
        }).where(eq(tasks.id, Number(id))).returning();
        if(restoredTask.length === 0) {
          return res.status(404).json({ error: "Task not found" });
        }
        res.status(200).json(restoredTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to restore task" });
    }
};

export const hardDeleteTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedCount = await db.delete(tasks).where(eq(tasks.id, Number(id))).returning();
        if(deletedCount.length === 0) {
          return res.status(404).json({ error: "Task not found" });
        }
        res.status(200).json({ message: "Task hard-deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to hard-delete task" });
    }
};

