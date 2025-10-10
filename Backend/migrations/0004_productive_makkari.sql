CREATE TYPE "public"."role" AS ENUM('owner', 'collaborator', 'viewer');--> statement-breakpoint
ALTER TABLE "activities" ADD COLUMN "created_by_user_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "tasks" ADD COLUMN "created_by_user_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "user_activities" ADD COLUMN "role" varchar(50) DEFAULT 'owner' NOT NULL;--> statement-breakpoint
ALTER TABLE "activities" ADD CONSTRAINT "activities_created_by_user_id_users_id_fk" FOREIGN KEY ("created_by_user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_created_by_user_id_users_id_fk" FOREIGN KEY ("created_by_user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;