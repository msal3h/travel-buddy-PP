import { db } from "../src/db"; 
import { trips, users } from "../src/db/schema"; 
import { eq } from "drizzle-orm";

export async function getTripByUserId(userId: string) {
  // Query the trips table for the first trip with the matching userId
  const trip = await db
    .select().from(trips).where(eq(trips.userId, userId )).limit(1);
    
  return trip[0] || null;
}