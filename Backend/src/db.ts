import {drizzle} from "drizzle-orm/neon-serverless"

import * as dotenv from "dotenv"

dotenv.config({path:"../../.env"})

const sql = drizzle(process.env.DATABASE_URL!)


export default sql