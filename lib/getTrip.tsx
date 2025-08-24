import { db } from "../src/db";
import { trips } from "../src/db/schema";
import { eq } from "drizzle-orm";


//for server-side code (server => database directly)

export async function getTripById(tripId: string) {
  console.log("tripId in getTripById:", tripId); 
  const result = await db.select().from(trips).where(eq(trips.id, tripId));
  console.log("Fetched trip in getTripById:", result);

  return result[0];
}

