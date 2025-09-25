
import { relations } from "drizzle-orm";
import { boolean,pgTable, serial, varchar, timestamp, integer, pgSchema } from "drizzle-orm/pg-core";


export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull().unique(),
    email: varchar("email", { length: 256 }).notNull(),
    password: varchar("password", { length: 256 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    personId: integer("person_id").unique().references(() => persons.id), // one-to-one
});

export const persons = pgTable("persons", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 50 }).notNull(),
    birthdate: timestamp("birthdate").notNull(),
    gender: varchar("gender", { length: 10 }).notNull(),
    phoneNo: varchar("phone_no", { length: 15 }).notNull()
});

export const activities = pgTable("activities", {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 256 }).notNull(),
    description: varchar("description", { length: 1024 }),
    scheduledAt: timestamp("scheduled_at").notNull(),
});

export const userActivities = pgTable("user_activities", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").references(() => users.id).notNull(),
    activityId: integer("activity_id").references(() => activities.id).notNull(),
    status: varchar("status", { length: 50 }).notNull(), // e.g., "pending", "completed"
});

export const tasks = pgTable("tasks", {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 256 }).notNull(), 
    description: varchar("description", { length: 1024 }),
    isDone: boolean("is_done").default(false).notNull(),
    userActivitiesId: integer("user_activities_id").references(() => userActivities.id).notNull(),
});

//Define relations 
export const usersRelations = relations(users, ({ many, one }) => ({
    activities: many(userActivities),
    person: one(persons, { 
        fields: [users.personId], 
        references: [persons.id] }), // one-to-one
}));

export const personsRelations = relations(persons, ({ one }) => ({
    user: one(users), // one-to-one
}));

export const activitiesRelations = relations(activities, ({ many }) => ({
    users: many(userActivities),
}));

export const userActivitiesRelations = relations(userActivities, ({ one, many }) => ({
    user: one(users, {
        fields: [userActivities.userId],
        references: [users.id],
    }),
    activity: one(activities, {
        fields: [userActivities.activityId],
        references: [activities.id],
    }),
    tasks: many(tasks),
}));

export const tasksRelations = relations(tasks, ({ one }) => ({
    userActivity: one(userActivities, {
        fields: [tasks.userActivitiesId],   
        references: [userActivities.id],
    }),
}));