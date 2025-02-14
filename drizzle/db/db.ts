import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "@neondatabase/serverless";
import * as schema from "../schema/schema";
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, { schema });