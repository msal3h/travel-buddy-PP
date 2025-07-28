// for client-side fetches (browser → server)

import {db} from "../../../src/db";
import {users} from "../../../src/db/schema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();
    const { name,email} = body; // extracting fields from req bod

    if(!name ||!email){
    return NextResponse.json({error: "Name and email are required"}, {status: 400});
    }// validation
    
    const result = await db.insert(users).values({name,email}).returning(); // inserting 
    return NextResponse.json(result[0]);  //return statemnt  
}

export async function GET() {
    const result = await db.select().from(users).orderBy(users.createdAt)
    return NextResponse.json(result)
}