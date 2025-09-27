CREATE TYPE "public"."status" AS ENUM('pending', 'completed', 'in-progress');--> statement-breakpoint
ALTER TABLE "user_activities" ALTER COLUMN "status" SET DATA TYPE varchar(10);--> statement-breakpoint
ALTER TABLE "user_activities" ALTER COLUMN "status" SET DEFAULT 'in-progress';