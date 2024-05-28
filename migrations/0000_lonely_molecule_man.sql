CREATE TABLE IF NOT EXISTS "students" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"total_marks" numeric NOT NULL,
	"age" integer NOT NULL,
	"grade" varchar NOT NULL,
	"email" varchar NOT NULL
);
