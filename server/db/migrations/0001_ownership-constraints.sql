ALTER TABLE "assessment_attempts" DROP CONSTRAINT "assessment_attempts_assessment_id_assessments_id_fk";
--> statement-breakpoint
ALTER TABLE "conversation_summaries" DROP CONSTRAINT "conversation_summaries_conversation_id_conversations_id_fk";
--> statement-breakpoint
ALTER TABLE "quest_notes" DROP CONSTRAINT "quest_notes_quest_id_quests_id_fk";
--> statement-breakpoint
ALTER TABLE "quests" DROP CONSTRAINT "quests_journey_id_journeys_id_fk";
--> statement-breakpoint
ALTER TABLE "quests" ADD COLUMN "player_id" uuid;--> statement-breakpoint
UPDATE "quests" AS q SET "player_id"=j."player_id" FROM "journeys" AS j WHERE q."journey_id"=j."id";--> statement-breakpoint
ALTER TABLE "quests" ALTER COLUMN "player_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "assessments" ADD CONSTRAINT "assessments_id_player_unique" UNIQUE("id","player_id");--> statement-breakpoint
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_id_player_unique" UNIQUE("id","player_id");--> statement-breakpoint
ALTER TABLE "quests" ADD CONSTRAINT "quests_id_player_unique" UNIQUE("id","player_id");--> statement-breakpoint
ALTER TABLE "assessment_attempts" ADD CONSTRAINT "assessment_attempts_assessment_player_fk" FOREIGN KEY ("assessment_id","player_id") REFERENCES "public"."assessments"("id","player_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "conversation_summaries" ADD CONSTRAINT "conversation_summaries_conversation_player_fk" FOREIGN KEY ("conversation_id","player_id") REFERENCES "public"."conversations"("id","player_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quest_notes" ADD CONSTRAINT "quest_notes_quest_player_fk" FOREIGN KEY ("quest_id","player_id") REFERENCES "public"."quests"("id","player_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quests" ADD CONSTRAINT "quests_journey_player_fk" FOREIGN KEY ("journey_id","player_id") REFERENCES "public"."journeys"("id","player_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
