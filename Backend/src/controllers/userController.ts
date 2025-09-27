import {Request, Response} from 'express';
import { users } from '../Config/schema';
import db from '../db';
import {eq} from 'drizzle-orm';
import validator from 'validator';
import bcrypt from 'bcryptjs';

// Create a new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, personId } = req.body;

    if(!name || !email || !password) {
      return res.status(400).json({ error: "Name, email, and password are required" });
    }
    // Hash the password before storing
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    // Validate email format
    if(!req.body.email || !validator.isEmail(req.body.email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
    
    const newUser = await db.insert(users).values({
      name,
      email,
      password: hashedPass,
      personId,
    }).returning();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await db.select().from(users)
    .where(eq(users.isDeleted, false)); // Exclude soft-deleted users
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await db.select().from(users).where(eq(users.id, Number(id))
  && eq(users.isDeleted, false));
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

export const editUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, password, personId } = req.body; 
    const updatedUser = await db.update(users).set({
      name,
      email,
      password,
      personId,
    }).where(eq(users.id, Number(id))).returning();
    if(updatedUser.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to update user" });
  }
};  

export const softDeleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedUser = await db.update(users).set({
      isDeleted: true,
    }).where(eq(users.id, Number(id))).returning();
    if(deletedUser.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User soft-deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to soft-delete user" });
  }
};

export const restoreUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const restoredUser = await db.update(users).set({
      isDeleted: false, 
    }).where(eq(users.id, Number(id))).returning();
    if(restoredUser.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User restored successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to restore user" });
  }
};

export const hardDeleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedCount = await db.delete(users).where(eq(users.id, Number(id))).returning();
    if(deletedCount.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User hard-deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to hard-delete user" });
  }
};

