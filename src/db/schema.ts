// src/db/schema.ts
import { pgTable, text, timestamp,date, uuid } from "drizzle-orm/pg-core";
import { z } from "zod";




export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(), 
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),

});

export const events = pgTable("events", {
  id: uuid("id").primaryKey().defaultRandom(), 
  tripId: text("trip_id").notNull(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time"),
  location: text("location"),
  details: text("details"),
});

export const trips = pgTable("trips", {
  id: uuid("id").primaryKey().defaultRandom(), 
  name: text("name").notNull(),
  startDate: date("start_date"),      
  endDate: date("end_date"),
  createdAt: timestamp("created_at").defaultNow(),
  userId: uuid("user_id").notNull().references(() => users.id)
  

});


