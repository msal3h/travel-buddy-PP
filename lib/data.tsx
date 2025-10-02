import { db } from "../src/db";
import { events,trips, users } from "@/src/db/schema";
import { eq } from "drizzle-orm";


//for server-side code (server => database directly

export async function getEventsForTrip(tripId: string) {
const tripEvents = await db.select().from(events).where(eq(events.tripId, tripId));
return tripEvents;
}



export async function getTripByUserId(userId: string) {
  // Query the trips table for the first trip with the matching userId
  const trip = await db
    .select().from(trips).where(eq(trips.userId, userId )).limit(1);
    
  return trip[0] || null;
}


export async function getTripById(tripId: string) {
    console.log("tripId in getTripById:", tripId);
    const result = await db.select().from(trips).where(eq(trips.id, tripId));
    console.log("Fetched trip in getTripById:", result);

    return result[0];
}


export async function getUserById(userId: string) {
    const result = await db.select().from(users).where(eq(users.id, userId));
    return result[0];
}