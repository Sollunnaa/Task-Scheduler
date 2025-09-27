import { Request,Response } from "express";
import {userActivities } from "../Config/schema";
import db from "../db";
import {eq,and} from 'drizzle-orm';

export const createUserActivity = async (req: Request, res: Response) => {
    try {
        const { userId, activityId, status } = req.body;
        const newUserActivity = await db.insert(userActivities).values({
            userId,
            activityId,
            status, // (default in-progress)
        }).returning();
        res.status(201).json(newUserActivity);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create user activity" });
    }
};

export const getUserActivities = async (req: Request, res: Response) => {
    try {
        const allUserActivities = await db.select().from(userActivities)
        .where(eq(userActivities.isDeleted, false)); // Exclude soft-deleted user activities
        res.status(200).json(allUserActivities);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch user activities" });
    }
};
export const getUserActivityById = async (req: Request, res: Response) => {
    console.log("getUserActivity route called with id:", req.params.id);
  const { id } = req.params;
    try {
    const userActivity = await db.select().from(userActivities).where(and(
        eq(userActivities.id, Number(id)),
        eq(userActivities.isDeleted, false)
    ));
    if(userActivity.length === 0) {
      return res.status(404).json({ error: "User Activity not found" });
    }
    res.status(200).json(userActivity);
  }catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch user activity" });
  }
};

export const editUserActivity = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        console.log("Editing user activity with id:", id);
        const { userId, activityId, status } = req.body;
        const updatedUserActivity = await db.update(userActivities).set({
            userId,
            activityId,
            status, // e.g., "pending", "completed"," in-progress ")
        }).where(eq(userActivities.id, Number(id))).returning();
        if(updatedUserActivity.length === 0) {
          return res.status(404).json({ error: "User Activity not found" });
        }
        res.status(200).json(updatedUserActivity);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update user activity" });
    }
};

export const softDeleteUserActivity = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedUserActivity = await db.update(userActivities).set({
            isDeleted: true,
        }).where(eq(userActivities.id, Number(id))).returning();
        if(deletedUserActivity.length === 0) {
          return res.status(404).json({ error: "User Activity not found" });
        }
        res.status(200).json(deletedUserActivity);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete user activity" });
    }
};

export const restoreUserActivity = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const restoredUserActivity = await db.update(userActivities).set({
            isDeleted: false, 
        }).where(eq(userActivities.id, Number(id))).returning();
        if(restoredUserActivity.length === 0) {
          return res.status(404).json({ error: "User Activity not found" });
        }
        res.status(200).json(restoredUserActivity);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to restore user activity" });
    }
};

export const hardDeleteUserActivity = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedCount = await db.delete(userActivities).where(eq(userActivities.id, Number(id))).returning();
        if(deletedCount.length === 0) {
          return res.status(404).json({ error: "User Activity not found" });
        }
        res.status(200).json({ message: "User Activity hard-deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to hard-delete user activity" });
    }
};