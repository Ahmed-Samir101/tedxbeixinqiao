import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";
import type { NeonHttpDatabase } from "drizzle-orm/neon-http";

config({ path: ".env" }); // or .env.local

let dbInstance: NeonHttpDatabase | null = null;

export const db = new Proxy({} as NeonHttpDatabase, {
  get(_target, prop) {
    if (!dbInstance) {
      if (!process.env.DATABASE_URL) {
        throw new Error("DATABASE_URL environment variable is not set");
      }
      dbInstance = drizzle(process.env.DATABASE_URL);
    }
    return dbInstance[prop as keyof NeonHttpDatabase];
  },
});
