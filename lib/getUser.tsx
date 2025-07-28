import { db } from "../src/db";
import { users } from "../src/db/schema";
import { eq } from "drizzle-orm";

export async function getUserById(userId: string) {
    const result = await db.select().from(users).where(eq(users.id, userId));
    return result[0];
}