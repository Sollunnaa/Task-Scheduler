import {drizzle} from "drizzle-orm/neon-serverless"
import {neon} from "@neondatabase/serverless"

import * as dotenv from "dotenv"

dotenv.config()

const sql = drizzle(process.env.DATABASE_URL!)


