import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  console.warn(
    "DATABASE_URL not set. Did you forget to provision a database? Continuing with in-memory storage.",
  );
}

export const pool = new Pool({ connectionString: process.env.DATABASE_URL || "postgres://user:pass@localhost:5432/db" });
export const db = drizzle(pool, { schema });