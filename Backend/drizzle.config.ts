import * as dotenv from 'dotenv';
import { defineConfig } from 'drizzle-kit';

dotenv.config({path: '../.env'});

export default defineConfig({
  out: './migrations',
  schema: './src/Config/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
  migrations: {schema: 'public'}, 
});
