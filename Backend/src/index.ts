import express, { Express, Request, Response } from 'express';
import {eq} from 'drizzle-orm';

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

app.put("/createUser", (req: Request, res: Response) => {
    res.send("This is create user endpoint");
    console.log("Create user endpoint hit");
});
