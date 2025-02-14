ALTER TABLE "hackathons" ALTER COLUMN "id" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "hackathons" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();