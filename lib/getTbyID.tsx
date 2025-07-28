import { db } from "../src/db"; // adjust this import to your Drizzle db instance
import { trips, users } from "../src/db/schema"; // adjust this import to your trips table/schema
import { eq } from "drizzle-orm";

export async function getTripByUserId(userId: string) {
  // Query the trips table for the first trip with the matching userId
  const trip = await db
    .select() .from(trips).where(trips.userId.eq(userId)).limit(1);

  return trip[0] || null;
}