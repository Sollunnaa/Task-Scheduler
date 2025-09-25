CREATE TABLE "activities" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(256) NOT NULL,
	"description" varchar(1024),
	"scheduled_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "persons" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"birthdate" timestamp NOT NULL,
	"gender" varchar(10) NOT NULL,
	"phone_no" varchar(15) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tasks" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(256) NOT NULL,
	"description" varchar(1024),
	"is_done" boolean DEFAULT false NOT NULL,
	"user_activities_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_activities" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"activity_id" integer NOT NULL,
	"status" varchar(50) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"email" varchar(256) NOT NULL,
	"password" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"person_id" integer,
	CONSTRAINT "users_name_unique" UNIQUE("name"),
	CONSTRAINT "users_person_id_unique" UNIQUE("person_id")
);
--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_user_activities_id_user_activities_id_fk" FOREIGN KEY ("user_activities_id") REFERENCES "public"."user_activities"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_activities" ADD CONSTRAINT "user_activities_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_activities" ADD CONSTRAINT "user_activities_activity_id_activities_id_fk" FOREIGN KEY ("activity_id") REFERENCES "public"."activities"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_person_id_persons_id_fk" FOREIGN KEY ("person_id") REFERENCES "public"."persons"("id") ON DELETE no action ON UPDATE no action;