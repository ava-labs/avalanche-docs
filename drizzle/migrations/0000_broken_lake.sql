CREATE TABLE "hackathons" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"date" date NOT NULL,
	"location" varchar(255) NOT NULL,
	"total_prizes" integer,
	"tags" jsonb,
	"status" varchar(50) NOT NULL,
	"registration_deadline" date NOT NULL,
	"address" varchar(255),
	"agenda" jsonb,
	"partners" jsonb,
	"tracks" jsonb
);
