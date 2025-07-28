// app/api/trips/route.ts
// for client-side fetches (browser → server)

import { db } from "../../../src/db"; 
import { trips } from "../../../src/db/schema";
import { NextResponse } from "next/server";
// GET  Get all trips
export async function GET() {
   const allTrips = await db.select().from(trips).orderBy(trips.createdAt);
   //asks for all trips then organized by createdAt
  return NextResponse.json(trips);
}


// POST  Create a new trip
export async function POST(req: Request) {
  const body = await req.json();
  const { name, startDate, endDate } = body;
  console.log("Creating trip with data:", body); // ✅ Log the incoming data
  if (!name) {
  return NextResponse.json({ error: "Trip name is required" }, { status: 400 });
}

const result = await db.insert(trips).values({
  name:name, // Use the correct field name
  startDate: startDate ? new Date(startDate) : null, // Handle optional startDate
   endDate: endDate ? new Date(endDate) : null, // Handle optional endDate
}).returning();

return NextResponse.json(result[0]);
}
