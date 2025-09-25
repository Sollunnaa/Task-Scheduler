import {Request, Response} from 'express';
import { users } from '../Config/schema';
import db from '../db';

// Create a new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, personId } = req.body;
    const newUser = await db.insert(users).values({
      name,
      email,
      password,
      personId,
    }).returning();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
};


