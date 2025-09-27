import express, { Express, Request, Response } from 'express';
import {eq} from 'drizzle-orm';
import { createUser } from './controllers/userController';
import { persons, users } from './Config/schema';
import db from './db';
import personRoutes from './routing/personRoutes';
import userRoutes from './routing/userRoutes';
import activityRoutes from './routing/activityRoutes';
import userActivityRoutes from './routing/userActivityRoutes';

const app: Express = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});


app.get("/", (req: Request, res: Response) => {
  res.send("This is a test home");
  console.log("Server is running");
});


app.use('/person', personRoutes);
app.use('/user', userRoutes);
app.use('/activity', activityRoutes);
app.use('/user-activity', userActivityRoutes);


