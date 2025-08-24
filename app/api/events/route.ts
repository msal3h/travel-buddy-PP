// app/api/events/route.ts
// for client-side fetches (browser → server)


import { db } from "../../../src/db";
import { events } from "../../../src/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { auth } from "@/auth"


// GET /api/events?tripId=123 → Get all events for one trip
export const GET = auth(async (req) => {
  const { searchParams } = new URL(req.url);
  const tripId = searchParams.get("tripId");

  if (!tripId) {
    return NextResponse.json({ error: "tripId is required" }, { status: 400 });
  }

  const result = await db.select().from(events).where(eq(events.tripId, tripId));
  return NextResponse.json(result);
})

// POST /api/events → Create a new event
export const POST = auth(async (req) => {
  const body = await req.json();
  const { title, category, startTime, endTime, location, details, tripId } = body;

  if (!title || !category || !startTime || !tripId) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const result = await db.insert(events).values({
    title,
    category,
    startTime: new Date(startTime),
    endTime: endTime ? new Date(endTime) : null,
    location,
    details,
    tripId,
  }).returning();

  return NextResponse.json(result[0]);
})
