import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "@/db/schemas";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set in environment variables");
}

const db = drizzle(process.env.DATABASE_URL, { schema });

export default db;
