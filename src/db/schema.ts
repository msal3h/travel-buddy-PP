// src/db/schema.ts
import { pgTable, text, timestamp,date, uuid } from "drizzle-orm/pg-core";


// columnName: columnType("column_name_in_db")[.modifiers()]
// [.modifiers()] ---> Definition: Modifiers are methods that you chain onto a column definition to give it extra rules or behaviors.
// ex:  .notNull(), .primaryKey(), .defaultNow()

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(), // ✅ change this
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
  id: uuid("id").primaryKey().defaultRandom(), // ✅ change this
  name: text("name").notNull(),
  startDate: date("start_date"),       // optional but useful
  endDate: date("end_date"),
  createdAt: timestamp("created_at").defaultNow(),
  userId: uuid("user_id").notNull().references(() => users.id)
  
  // createdBy: text("created_by").notNull().references(
  //   () => users.id, // ✅ change this
  //   { onDelete: "cascade" } // if user is deleted, their trips are also deleted
  // ) // userId of the creator
});