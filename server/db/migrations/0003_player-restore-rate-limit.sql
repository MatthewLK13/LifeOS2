CREATE TABLE "restore_attempts" (
	"bucket_key" text PRIMARY KEY NOT NULL,
	"window_started_at" timestamp with time zone NOT NULL,
	"attempts" integer DEFAULT 0 NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "restore_attempts_nonnegative" CHECK ("restore_attempts"."attempts" >= 0)
);
--> statement-breakpoint
CREATE INDEX "restore_attempts_updated_at_idx" ON "restore_attempts" USING btree ("updated_at");