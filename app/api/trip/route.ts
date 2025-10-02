// app/api/trips/route.ts
// for client-side fetches (browser → server)

import { db } from "../../../src/db"; 
import { trips } from "../../../src/db/schema";
import { NextResponse } from "next/server";
import { auth } from "@/auth"


export const GET = auth(async (req) => {

  if (!req.auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const allTrips = await db.select()
    .from(trips)
    .orderBy(trips.createdAt);

  return NextResponse.json(allTrips);
});


// POST  Create a new trip
export const  POST=auth((async (req) => { // auth wraps our handler and looks for session info in the request
  const body = await req.json(); 
  const { name, startDate, endDate } = body;
 
  if (!name) {
  return NextResponse.json({ error: "Trip name is required" }, { status: 400 });
}


if (!req.auth) { //req.auth returns a session object, if there is no session it returns error
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

const userINFO = req.auth.user?.id; 
if (!userINFO) {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

const [trip] = await db.insert(trips).values({
  name: name,
  startDate: startDate || null,
  endDate: endDate || null,
  userId: userINFO
}).returning({id: trips.id, 
  name: trips.name,
  startDate: trips.startDate,
  endDate: trips.endDate});

return NextResponse.json(trip);
}))
