import { Request,Response } from "express";
import { persons } from "../Config/schema";
import db from "../db";
import {eq,and} from 'drizzle-orm';

export const getPersons = async (req: Request, res: Response) => {
    try {
        const allPersons = await db.select().from(persons)
        .where(eq(persons.isDeleted, false)); // Exclude soft-deleted persons
        res.status(200).json(allPersons);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch persons" });
    }
};

export const getPersonById = async (req: Request, res: Response) => {
    console.log("getPerson route called with id:", req.params.id);
  const { id } = req.params;
  try {
    const person = await db.select().from(persons).where(and(
        eq(persons.id, Number(id)),
        eq(persons.isDeleted, false)
    ));
    if(person.length === 0) {
      return res.status(404).json({ error: "Person not found" });
    }
    res.status(200).json(person);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch person" });
  }
};

// Create a new person
export const createPerson = async (req: Request, res: Response) => {
    try {
        console.log("Incoming body:", req.body); // Debug log

        const { name, birthdate, gender, phoneNo } = req.body;
        const newPerson = await db.insert(persons).values({
            name,
            birthdate: new Date(birthdate), // Ensure it's a Date object
            gender,
            phoneNo,
        }).returning();
        res.status(201).json(newPerson);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create person" });
    }
};

export const editPerson = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        console.log("Editing person with id:", id); // Add this line
        const { name, birthdate, gender, phoneNo } = req.body;
        const updatedPerson = await db.update(persons).set({
            name,
            birthdate: new Date(birthdate), // Ensure it's a Date object
            gender,
            phoneNo,
        }).where(eq(persons.id, Number(id))).returning();
        if (updatedPerson.length === 0) {
            return res.status(404).json({ error: "Person not found" });
        }   
        res.status(200).json(updatedPerson);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update person" });
    }
};

export const softDeletePerson = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedPerson = await db.update(persons).set({
            isDeleted: true,
        }).where(eq(persons.id, Number(id))).returning();
        if (deletedPerson.length === 0) {
            return res.status(404).json({ error: "Person not found" });
        }
        res.status(200).json({ message: "Person soft-deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to soft-delete person" });
    }
};

export const restorePerson = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const restoredPerson = await db.update(persons).set({
            isDeleted: false,
        }).where(eq(persons.id, Number(id))).returning();
        if (restoredPerson.length === 0) {
            return res.status(404).json({ error: "Person not found" });
        }
        res.status(200).json({ message: "Person restored successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to restore person" });
    }
};

export const hardDeletePerson = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedCount = await db.delete(persons).where(eq(persons.id, Number(id))).returning();
        if (deletedCount.length === 0) {
            return res.status(404).json({ error: "Person not found" });
        }
        res.status(200).json({ message: "Person hard-deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to hard-delete person" });
    }
};

