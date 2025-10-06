import { Request,Response } from "express";
import { activities } from "../Config/schema";
import db from "../db";
import {eq,and} from 'drizzle-orm';

export const createActivity = async (req: Request, res: Response) => {
    try {
        const { title, description, date,createdByUserId } = req.body;    
        const newActivity = await db.insert(activities).values({
            title,
            description,
            scheduledAt: new Date(date),
            createdByUserId 
        }).returning();
        res.status(201).json(newActivity);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create activity" });
    }
};

export const getActivities = async (req: Request, res: Response) => {
    try {
        const allActivities = await db.select().from(activities)
        .where(eq(activities.isDeleted, false)); // Exclude soft-deleted activities
        res.status(200).json(allActivities);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch activities" });
    }
};

export const getActivityById = async (req: Request, res: Response) => {
    console.log("getActivity route called with id:", req.params.id);
  const { id } = req.params;
    try {
    const activity = await db.select().from(activities).where(and(
        eq(activities.id, Number(id)),
        eq(activities.isDeleted, false)
    ));
    if(activity.length === 0) {
      return res.status(404).json({ error: "Activity not found" });
    }
    res.status(200).json(activity);
  }catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch activity" });
  }
};

export const editActivity = async (req: Request, res: Response) => {
    
    try {
        const { id } = req.params;
        console.log("Editing activity with id:", id);
        const { title, description, date,createdByUserId } = req.body;
        const updatedActivity = await db.update(activities).set({   
            title,
            description,
            scheduledAt: new Date(date), 
            createdByUserId
        }).where(eq(activities.id, Number(id))).returning();
        if(updatedActivity.length === 0) {
          return res.status(404).json({ error: "Activity not found" });
        }
        res.status(200).json(updatedActivity);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update activity" });
    }
};

export const softDeleteActivity = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedActivity = await db.update(activities).set({
            isDeleted: true,
        }).where(eq(activities.id, Number(id))).returning();
        if(deletedActivity.length === 0) {
          return res.status(404).json({ error: "Activity not found" });
        }
        res.status(200).json(deletedActivity);
    } catch (error) {
        res.status(500).json({ error: "Failed to delete activity" });
    }
};

export const restoreActivity = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const restoredActivity = await db.update(activities).set({
            isDeleted: false, 
        }).where(eq(activities.id, Number(id))).returning();
        if(restoredActivity.length === 0) {
            return res.status(404).json({ error: "Activity not found" });
        }
        res.status(200).json(restoredActivity);
    } catch (error) {
        res.status(500).json({ error: "Failed to restore activity" });
    }
};

export const hardDeleteActivity = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedCount = await db.delete(activities).where(eq(activities.id, Number(id))).returning();  
        if(deletedCount.length === 0) {
          return res.status(404).json({ error: "Activity not found" });
        }
        res.status(200).json({ message: "Activity hard-deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to hard-delete activity" });
    }
};