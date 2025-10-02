ALTER TABLE "events" ADD COLUMN "flightnumber" text;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "flightdeparture" text;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "flightarrival" text;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "flightduration" text;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "fightbookedby" text;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "flightairline" text;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "flightnotes" text;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "activityname" text;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "activitylocation" text;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "activitytime" timestamp;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "activitynotes" text;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "activitybookedby" text;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "accomodationname" text;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "accomodationcheckin" text;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "accomodationcheckout" text;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "accomodationaddress" text;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "accomodationbookedby" text;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "accomodationnotes" text;--> statement-breakpoint
ALTER TABLE "events" DROP COLUMN "title";--> statement-breakpoint
ALTER TABLE "events" DROP COLUMN "category";--> statement-breakpoint
ALTER TABLE "events" DROP COLUMN "location";--> statement-breakpoint
ALTER TABLE "events" DROP COLUMN "details";