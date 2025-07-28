import type { Config } from "drizzle-kit";
import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

// 👇 Explicitly load the right env file
dotenv.config({ path: ".env.development.local" });

export default defineConfig ({

  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql", // ✅ REQUIRED
  // driver: "pg",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})  

