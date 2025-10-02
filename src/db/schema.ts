// // src/db/schema.ts
// import { pgTable, text, timestamp,date, uuid } from "drizzle-orm/pg-core";
// import { z } from "zod";




// export const users = pgTable("users", {
//   id: uuid("id").primaryKey().defaultRandom(), 
//   name: text("name").notNull(),
//   email: text("email").notNull().unique(),
//   createdAt: timestamp("created_at").defaultNow(),
//   updatedAt: timestamp("updated_at").defaultNow(),

// });

// export const events = pgTable("events", {
//   id: uuid("id").primaryKey().defaultRandom(), 
//   tripId: text("trip_id").notNull(),
//   title: text("title").notNull(),
//   category: text("category").notNull(),
//   startTime: timestamp("start_time").notNull(),
//   endTime: timestamp("end_time"),
//   location: text("location"),
//   details: text("details"),
// });

// export const trips = pgTable("trips", {
//   id: uuid("id").primaryKey().defaultRandom(), 
//   name: text("name").notNull(),
//   startDate: date("start_date"),      
//   endDate: date("end_date"),
//   createdAt: timestamp("created_at").defaultNow(),
//   userId: uuid("user_id").notNull().references(() => users.id)
  

// });


import {
  boolean,
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  date,
  uuid,
} from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import type { AdapterAccountType } from "@auth/core/adapters";
import { time } from "console";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
export const db = drizzle(pool);



export const users = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),   
  name: text("name"),
  email: text("email").notNull().unique(),        
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const accounts = pgTable(
  "account",
  {
    userId: uuid("userId")                        
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [
    primaryKey({ columns: [account.provider, account.providerAccountId] }),
  ]
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: uuid("userId")                         
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => [
    primaryKey({ columns: [verificationToken.identifier, verificationToken.token] }),
  ]
);

export const authenticators = pgTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: uuid("userId")                        
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => [
    primaryKey({ columns: [authenticator.userId, authenticator.credentialID] })
  ]
);


export const trips = pgTable("trips", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  startDate: date("start_date"),
  endDate: date("end_date"),
  createdAt: timestamp("created_at").defaultNow(),
  userId: uuid("user_id").notNull().references(() => users.id),  
});

export const events = pgTable("events", {
  id: uuid("id").primaryKey().defaultRandom(),
  tripId: uuid("trip_id").notNull().references(() => trips.id),   
  // title: text("title").notNull(),
  // category: text("category").notNull(),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time"),
  

  flightnumber: text("flightnumber"),
  flightdeparture: text("flightdeparture"),
  flightarrival: text("flightarrival"),
  flightduration: text("flightduration"),
  fightbookedby: text("fightbookedby"),
  flightairline: text("flightairline"),
  flightnotes: text("flightnotes"),

  activityname: text("activityname"),
  activitylocation: text("activitylocation"),
  activitytime: timestamp("activitytime"),
  activitynotes: text("activitynotes"),
  activitybookedby: text("activitybookedby"),

  accomodationname: text("accomodationname"),
  accomodationcheckin: text("accomodationcheckin"),
  accomodationcheckout: text("accomodationcheckout"),
  accomodationlocation: text("accomodationaddress"),
  accomodationbookedby: text("accomodationbookedby"),
  accomodationnotes: text("accomodationnotes"),
});




