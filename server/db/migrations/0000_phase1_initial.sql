CREATE TYPE "public"."ai_purpose" AS ENUM('COMPANION', 'ROADMAP', 'ASSESSMENT', 'KNOWLEDGE_ANALYSIS', 'SUMMARY', 'MEMORY', 'CONCEPT_MATCH');--> statement-breakpoint
CREATE TYPE "public"."assessment_subtype" AS ENUM('QUIZ', 'CODE_REVIEW', 'WRITTEN');--> statement-breakpoint
CREATE TYPE "public"."assessment_verdict" AS ENUM('NEEDS_WORK', 'GOOD', 'STRONG');--> statement-breakpoint
CREATE TYPE "public"."catalog_source" AS ENUM('SEED', 'AI_DYNAMIC');--> statement-breakpoint
CREATE TYPE "public"."conversation_status" AS ENUM('ACTIVE', 'CLOSED');--> statement-breakpoint
CREATE TYPE "public"."item_category" AS ENUM('AVATAR', 'FRAME', 'TITLE', 'GRIMOIRE_SKIN', 'COMPANION_COSMETIC');--> statement-breakpoint
CREATE TYPE "public"."journey_status" AS ENUM('ACTIVE', 'COMPLETED', 'ARCHIVED');--> statement-breakpoint
CREATE TYPE "public"."knowledge_level" AS ENUM('UNSEEN', 'DISCOVERED', 'EXPLORING', 'UNDERSTANDING', 'APPLYING', 'MASTERED');--> statement-breakpoint
CREATE TYPE "public"."memory_status" AS ENUM('PENDING', 'CONFIRMED', 'DISMISSED');--> statement-breakpoint
CREATE TYPE "public"."message_role" AS ENUM('USER', 'ASSISTANT', 'SYSTEM');--> statement-breakpoint
CREATE TYPE "public"."message_status" AS ENUM('COMPLETE', 'FAILED');--> statement-breakpoint
CREATE TYPE "public"."notification_status" AS ENUM('PENDING', 'SENT', 'FAILED', 'SKIPPED');--> statement-breakpoint
CREATE TYPE "public"."player_role" AS ENUM('GUEST', 'USER', 'ADMIN', 'DEMO');--> statement-breakpoint
CREATE TYPE "public"."player_status" AS ENUM('ACTIVE', 'DISABLED');--> statement-breakpoint
CREATE TYPE "public"."proposal_status" AS ENUM('PENDING', 'ACCEPTED', 'REJECTED', 'EXPIRED');--> statement-breakpoint
CREATE TYPE "public"."proposal_type" AS ENUM('CREATE', 'MODIFY', 'PACING');--> statement-breakpoint
CREATE TYPE "public"."quest_source" AS ENUM('TEMPLATE', 'AI', 'HYBRID');--> statement-breakpoint
CREATE TYPE "public"."quest_status" AS ENUM('AVAILABLE', 'IN_PROGRESS', 'COMPLETED', 'SKIPPED');--> statement-breakpoint
CREATE TYPE "public"."quest_type" AS ENUM('LEARN', 'PRACTICE', 'ASSESSMENT', 'PROJECT');--> statement-breakpoint
CREATE TYPE "public"."signal_source" AS ENUM('CHAT', 'QUIZ', 'WRITTEN', 'CODE_REVIEW', 'QUEST_REFLECTION');--> statement-breakpoint
CREATE TYPE "public"."signal_type" AS ENUM('DISCOVERY', 'EXPLORATION', 'UNDERSTANDING', 'APPLICATION');--> statement-breakpoint
CREATE TABLE "achievements" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"key" text NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"rule_key" text NOT NULL,
	"reward_coins" integer DEFAULT 0 NOT NULL,
	"icon_asset_key" text,
	"active" boolean DEFAULT true NOT NULL,
	CONSTRAINT "achievements_key_unique" UNIQUE("key"),
	CONSTRAINT "achievements_reward_nonnegative" CHECK ("achievements"."reward_coins" >= 0)
);
--> statement-breakpoint
CREATE TABLE "ai_usage" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"player_id" uuid,
	"provider" text NOT NULL,
	"model" text NOT NULL,
	"purpose" "ai_purpose" NOT NULL,
	"input_tokens" integer DEFAULT 0 NOT NULL,
	"output_tokens" integer DEFAULT 0 NOT NULL,
	"estimated_cost_micros" bigint DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "ai_usage_nonnegative" CHECK ("ai_usage"."input_tokens" >= 0 AND "ai_usage"."output_tokens" >= 0 AND "ai_usage"."estimated_cost_micros" >= 0)
);
--> statement-breakpoint
CREATE TABLE "assessment_attempts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"assessment_id" uuid NOT NULL,
	"player_id" uuid NOT NULL,
	"answer_text" text NOT NULL,
	"verdict" "assessment_verdict" NOT NULL,
	"feedback" text NOT NULL,
	"structured_result" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "assessment_attempt_answer_limit" CHECK (octet_length("assessment_attempts"."answer_text") <= 204800)
);
--> statement-breakpoint
CREATE TABLE "assessments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"player_id" uuid NOT NULL,
	"quest_id" uuid,
	"subtype" "assessment_subtype" NOT NULL,
	"prompt" text NOT NULL,
	"content_json" jsonb NOT NULL,
	"template_key" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "assessments_prompt_limit" CHECK (octet_length("assessments"."prompt") <= 204800)
);
--> statement-breakpoint
CREATE TABLE "chapters" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"journey_id" uuid NOT NULL,
	"arc_id" uuid,
	"title" text NOT NULL,
	"summary" text,
	"order_index" integer NOT NULL,
	"lane" text,
	"metadata" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "chapters_id_journey_unique" UNIQUE("id","journey_id"),
	CONSTRAINT "chapters_journey_order_unique" UNIQUE("journey_id","order_index")
);
--> statement-breakpoint
CREATE TABLE "coin_ledger" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"player_id" uuid NOT NULL,
	"source" text NOT NULL,
	"amount" integer NOT NULL,
	"reference_key" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "coin_ledger_amount_nonzero" CHECK ("coin_ledger"."amount" <> 0)
);
--> statement-breakpoint
CREATE TABLE "concept_progress" (
	"player_id" uuid NOT NULL,
	"concept_id" uuid NOT NULL,
	"level" "knowledge_level" DEFAULT 'UNSEEN' NOT NULL,
	"signal_counts" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"first_seen_at" timestamp with time zone,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"mastered_at" timestamp with time zone,
	CONSTRAINT "concept_progress_player_id_concept_id_pk" PRIMARY KEY("player_id","concept_id")
);
--> statement-breakpoint
CREATE TABLE "concepts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"domain_id" uuid NOT NULL,
	"owner_player_id" uuid,
	"key" text,
	"name" text NOT NULL,
	"normalized_name" text NOT NULL,
	"description" text,
	"source" "catalog_source" DEFAULT 'SEED' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "conversation_summaries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"conversation_id" uuid NOT NULL,
	"player_id" uuid NOT NULL,
	"summary" text NOT NULL,
	"key_topics" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "conversation_summaries_conversation_unique" UNIQUE("conversation_id")
);
--> statement-breakpoint
CREATE TABLE "conversations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"player_id" uuid NOT NULL,
	"title" text,
	"status" "conversation_status" DEFAULT 'ACTIVE' NOT NULL,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"last_message_at" timestamp with time zone DEFAULT now() NOT NULL,
	"closed_at" timestamp with time zone,
	"summarized_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "domains" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"owner_player_id" uuid,
	"key" text,
	"name" text NOT NULL,
	"normalized_name" text NOT NULL,
	"description" text,
	"source" "catalog_source" DEFAULT 'SEED' NOT NULL,
	"icon_key" text,
	"color_key" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "inventory_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"key" text NOT NULL,
	"category" "item_category" NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"rarity" text,
	"price_coins" integer DEFAULT 0 NOT NULL,
	"asset_key" text NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "inventory_items_key_unique" UNIQUE("key"),
	CONSTRAINT "inventory_items_price_nonnegative" CHECK ("inventory_items"."price_coins" >= 0)
);
--> statement-breakpoint
CREATE TABLE "journey_arcs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"journey_id" uuid NOT NULL,
	"title" text NOT NULL,
	"summary" text,
	"order_index" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "journey_arcs_journey_order_unique" UNIQUE("journey_id","order_index")
);
--> statement-breakpoint
CREATE TABLE "journey_templates" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"key" text NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"catalog_version" integer NOT NULL,
	"curriculum" jsonb NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "journey_templates_key_unique" UNIQUE("key")
);
--> statement-breakpoint
CREATE TABLE "journeys" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"player_id" uuid NOT NULL,
	"title" text NOT NULL,
	"goal" text NOT NULL,
	"status" "journey_status" DEFAULT 'ACTIVE' NOT NULL,
	"version" integer DEFAULT 1 NOT NULL,
	"minutes_per_day" integer NOT NULL,
	"experience_level" text,
	"template_key" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"completed_at" timestamp with time zone,
	"archived_at" timestamp with time zone,
	CONSTRAINT "journeys_id_player_id_unique" UNIQUE("id","player_id"),
	CONSTRAINT "journeys_version_positive" CHECK ("journeys"."version" > 0),
	CONSTRAINT "journeys_minutes_range" CHECK ("journeys"."minutes_per_day" BETWEEN 15 AND 120)
);
--> statement-breakpoint
CREATE TABLE "knowledge_signals" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"player_id" uuid NOT NULL,
	"concept_id" uuid NOT NULL,
	"conversation_id" uuid,
	"source_type" "signal_source" NOT NULL,
	"source_id" uuid,
	"signal_type" "signal_type" NOT NULL,
	"confidence" numeric(4, 3) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "knowledge_signals_confidence_range" CHECK ("knowledge_signals"."confidence" BETWEEN 0 AND 1)
);
--> statement-breakpoint
CREATE TABLE "memories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"player_id" uuid NOT NULL,
	"text" text NOT NULL,
	"status" "memory_status" DEFAULT 'PENDING' NOT NULL,
	"source_conversation_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"decided_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "messages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"conversation_id" uuid NOT NULL,
	"role" "message_role" NOT NULL,
	"content" text NOT NULL,
	"status" "message_status" DEFAULT 'COMPLETE' NOT NULL,
	"input_tokens" integer,
	"output_tokens" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "milestones" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"key" text NOT NULL,
	"category" text NOT NULL,
	"threshold" integer NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"reward_coins" integer DEFAULT 0 NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	CONSTRAINT "milestones_key_unique" UNIQUE("key"),
	CONSTRAINT "milestones_threshold_positive" CHECK ("milestones"."threshold" > 0),
	CONSTRAINT "milestones_reward_nonnegative" CHECK ("milestones"."reward_coins" >= 0)
);
--> statement-breakpoint
CREATE TABLE "notifications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"player_id" uuid NOT NULL,
	"type" text NOT NULL,
	"local_date" date NOT NULL,
	"status" "notification_status" DEFAULT 'PENDING' NOT NULL,
	"payload_json" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"sent_at" timestamp with time zone,
	"error" text,
	CONSTRAINT "notifications_player_type_date_unique" UNIQUE("player_id","type","local_date")
);
--> statement-breakpoint
CREATE TABLE "player_achievements" (
	"player_id" uuid NOT NULL,
	"achievement_id" uuid NOT NULL,
	"unlocked_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "player_achievements_player_id_achievement_id_pk" PRIMARY KEY("player_id","achievement_id")
);
--> statement-breakpoint
CREATE TABLE "player_inventory" (
	"player_id" uuid NOT NULL,
	"item_id" uuid NOT NULL,
	"unlocked_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "player_inventory_player_id_item_id_pk" PRIMARY KEY("player_id","item_id")
);
--> statement-breakpoint
CREATE TABLE "player_milestones" (
	"player_id" uuid NOT NULL,
	"milestone_id" uuid NOT NULL,
	"reached_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "player_milestones_player_id_milestone_id_pk" PRIMARY KEY("player_id","milestone_id")
);
--> statement-breakpoint
CREATE TABLE "players" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code_digest" text NOT NULL,
	"role" "player_role" DEFAULT 'GUEST' NOT NULL,
	"is_demo" boolean DEFAULT false NOT NULL,
	"status" "player_status" DEFAULT 'ACTIVE' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"last_active_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "players_code_digest_unique" UNIQUE("code_digest")
);
--> statement-breakpoint
CREATE TABLE "profiles" (
	"player_id" uuid PRIMARY KEY NOT NULL,
	"display_name" text NOT NULL,
	"xp" integer DEFAULT 0 NOT NULL,
	"coins" integer DEFAULT 0 NOT NULL,
	"daily_xp" integer DEFAULT 0 NOT NULL,
	"daily_xp_date" date NOT NULL,
	"streak" integer DEFAULT 0 NOT NULL,
	"longest_streak" integer DEFAULT 0 NOT NULL,
	"last_quest_completed_date" date,
	"timezone" text DEFAULT 'Asia/Ho_Chi_Minh' NOT NULL,
	"avatar_item_id" uuid,
	"frame_item_id" uuid,
	"title_item_id" uuid,
	"grimoire_skin_item_id" uuid,
	"companion_cosmetic_item_id" uuid,
	"preferences" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "profiles_nonnegative_progress" CHECK ("profiles"."xp" >= 0 AND "profiles"."coins" >= 0 AND "profiles"."daily_xp" BETWEEN 0 AND 120 AND "profiles"."streak" >= 0 AND "profiles"."longest_streak" >= "profiles"."streak")
);
--> statement-breakpoint
CREATE TABLE "push_subscriptions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"player_id" uuid NOT NULL,
	"endpoint" text NOT NULL,
	"p256dh" text NOT NULL,
	"auth" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"last_success_at" timestamp with time zone,
	"disabled_at" timestamp with time zone,
	CONSTRAINT "push_subscriptions_endpoint_unique" UNIQUE("endpoint")
);
--> statement-breakpoint
CREATE TABLE "quest_notes" (
	"quest_id" uuid PRIMARY KEY NOT NULL,
	"player_id" uuid NOT NULL,
	"content" text DEFAULT '' NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "quest_notes_content_limit" CHECK (octet_length("quest_notes"."content") <= 20000)
);
--> statement-breakpoint
CREATE TABLE "quest_steps" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"quest_id" uuid NOT NULL,
	"order_index" integer NOT NULL,
	"content" text NOT NULL,
	"completed" boolean DEFAULT false NOT NULL,
	"completed_at" timestamp with time zone,
	CONSTRAINT "quest_steps_quest_order_unique" UNIQUE("quest_id","order_index")
);
--> statement-breakpoint
CREATE TABLE "quests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"journey_id" uuid NOT NULL,
	"chapter_id" uuid NOT NULL,
	"type" "quest_type" NOT NULL,
	"assessment_subtype" "assessment_subtype",
	"title" text NOT NULL,
	"description" text,
	"topic" text,
	"prompt" text,
	"difficulty" text,
	"xp_reward" integer NOT NULL,
	"minutes" integer NOT NULL,
	"status" "quest_status" DEFAULT 'AVAILABLE' NOT NULL,
	"order_index" integer NOT NULL,
	"source" "quest_source" DEFAULT 'TEMPLATE' NOT NULL,
	"metadata" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"started_at" timestamp with time zone,
	"completed_at" timestamp with time zone,
	"skipped_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "quests_id_journey_unique" UNIQUE("id","journey_id"),
	CONSTRAINT "quests_journey_order_unique" UNIQUE("journey_id","order_index"),
	CONSTRAINT "quests_reward_minutes_nonnegative" CHECK ("quests"."xp_reward" >= 0 AND "quests"."minutes" > 0),
	CONSTRAINT "quests_completion_timestamp" CHECK (("quests"."status" <> 'COMPLETED' OR "quests"."completed_at" IS NOT NULL))
);
--> statement-breakpoint
CREATE TABLE "roadmap_proposals" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"player_id" uuid NOT NULL,
	"journey_id" uuid NOT NULL,
	"base_version" integer NOT NULL,
	"type" "proposal_type" NOT NULL,
	"status" "proposal_status" DEFAULT 'PENDING' NOT NULL,
	"reason" text,
	"patch_json" jsonb NOT NULL,
	"preview_json" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"decided_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "roadmap_revisions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"journey_id" uuid NOT NULL,
	"version_from" integer NOT NULL,
	"version_to" integer NOT NULL,
	"reason" text,
	"diff_json" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "roadmap_revisions_version_unique" UNIQUE("journey_id","version_to"),
	CONSTRAINT "roadmap_revisions_forward" CHECK ("roadmap_revisions"."version_to" > "roadmap_revisions"."version_from")
);
--> statement-breakpoint
CREATE TABLE "xp_ledger" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"player_id" uuid NOT NULL,
	"quest_id" uuid,
	"source" text NOT NULL,
	"amount" integer NOT NULL,
	"local_date" date NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "xp_ledger_amount_nonnegative" CHECK ("xp_ledger"."amount" >= 0)
);
--> statement-breakpoint
ALTER TABLE "ai_usage" ADD CONSTRAINT "ai_usage_player_id_players_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."players"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "assessment_attempts" ADD CONSTRAINT "assessment_attempts_assessment_id_assessments_id_fk" FOREIGN KEY ("assessment_id") REFERENCES "public"."assessments"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "assessment_attempts" ADD CONSTRAINT "assessment_attempts_player_id_players_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."players"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "assessments" ADD CONSTRAINT "assessments_player_id_players_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."players"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "assessments" ADD CONSTRAINT "assessments_quest_id_quests_id_fk" FOREIGN KEY ("quest_id") REFERENCES "public"."quests"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chapters" ADD CONSTRAINT "chapters_journey_id_journeys_id_fk" FOREIGN KEY ("journey_id") REFERENCES "public"."journeys"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chapters" ADD CONSTRAINT "chapters_arc_id_journey_arcs_id_fk" FOREIGN KEY ("arc_id") REFERENCES "public"."journey_arcs"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "coin_ledger" ADD CONSTRAINT "coin_ledger_player_id_players_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."players"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "concept_progress" ADD CONSTRAINT "concept_progress_player_id_players_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."players"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "concept_progress" ADD CONSTRAINT "concept_progress_concept_id_concepts_id_fk" FOREIGN KEY ("concept_id") REFERENCES "public"."concepts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "concepts" ADD CONSTRAINT "concepts_domain_id_domains_id_fk" FOREIGN KEY ("domain_id") REFERENCES "public"."domains"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "concepts" ADD CONSTRAINT "concepts_owner_player_id_players_id_fk" FOREIGN KEY ("owner_player_id") REFERENCES "public"."players"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "conversation_summaries" ADD CONSTRAINT "conversation_summaries_conversation_id_conversations_id_fk" FOREIGN KEY ("conversation_id") REFERENCES "public"."conversations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "conversation_summaries" ADD CONSTRAINT "conversation_summaries_player_id_players_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."players"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_player_id_players_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."players"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "domains" ADD CONSTRAINT "domains_owner_player_id_players_id_fk" FOREIGN KEY ("owner_player_id") REFERENCES "public"."players"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "journey_arcs" ADD CONSTRAINT "journey_arcs_journey_id_journeys_id_fk" FOREIGN KEY ("journey_id") REFERENCES "public"."journeys"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "journeys" ADD CONSTRAINT "journeys_player_id_players_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."players"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "knowledge_signals" ADD CONSTRAINT "knowledge_signals_player_id_players_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."players"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "knowledge_signals" ADD CONSTRAINT "knowledge_signals_concept_id_concepts_id_fk" FOREIGN KEY ("concept_id") REFERENCES "public"."concepts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "memories" ADD CONSTRAINT "memories_player_id_players_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."players"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "memories" ADD CONSTRAINT "memories_source_conversation_id_conversations_id_fk" FOREIGN KEY ("source_conversation_id") REFERENCES "public"."conversations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_conversation_id_conversations_id_fk" FOREIGN KEY ("conversation_id") REFERENCES "public"."conversations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_player_id_players_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."players"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "player_achievements" ADD CONSTRAINT "player_achievements_player_id_players_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."players"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "player_achievements" ADD CONSTRAINT "player_achievements_achievement_id_achievements_id_fk" FOREIGN KEY ("achievement_id") REFERENCES "public"."achievements"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "player_inventory" ADD CONSTRAINT "player_inventory_player_id_players_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."players"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "player_inventory" ADD CONSTRAINT "player_inventory_item_id_inventory_items_id_fk" FOREIGN KEY ("item_id") REFERENCES "public"."inventory_items"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "player_milestones" ADD CONSTRAINT "player_milestones_player_id_players_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."players"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "player_milestones" ADD CONSTRAINT "player_milestones_milestone_id_milestones_id_fk" FOREIGN KEY ("milestone_id") REFERENCES "public"."milestones"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_player_id_players_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."players"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_avatar_item_id_inventory_items_id_fk" FOREIGN KEY ("avatar_item_id") REFERENCES "public"."inventory_items"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_frame_item_id_inventory_items_id_fk" FOREIGN KEY ("frame_item_id") REFERENCES "public"."inventory_items"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_title_item_id_inventory_items_id_fk" FOREIGN KEY ("title_item_id") REFERENCES "public"."inventory_items"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_grimoire_skin_item_id_inventory_items_id_fk" FOREIGN KEY ("grimoire_skin_item_id") REFERENCES "public"."inventory_items"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_companion_cosmetic_item_id_inventory_items_id_fk" FOREIGN KEY ("companion_cosmetic_item_id") REFERENCES "public"."inventory_items"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "push_subscriptions" ADD CONSTRAINT "push_subscriptions_player_id_players_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."players"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quest_notes" ADD CONSTRAINT "quest_notes_quest_id_quests_id_fk" FOREIGN KEY ("quest_id") REFERENCES "public"."quests"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quest_notes" ADD CONSTRAINT "quest_notes_player_id_players_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."players"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quest_steps" ADD CONSTRAINT "quest_steps_quest_id_quests_id_fk" FOREIGN KEY ("quest_id") REFERENCES "public"."quests"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quests" ADD CONSTRAINT "quests_journey_id_journeys_id_fk" FOREIGN KEY ("journey_id") REFERENCES "public"."journeys"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quests" ADD CONSTRAINT "quests_chapter_journey_fk" FOREIGN KEY ("chapter_id","journey_id") REFERENCES "public"."chapters"("id","journey_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "roadmap_proposals" ADD CONSTRAINT "roadmap_proposals_player_id_players_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."players"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "roadmap_proposals" ADD CONSTRAINT "roadmap_proposals_journey_player_fk" FOREIGN KEY ("journey_id","player_id") REFERENCES "public"."journeys"("id","player_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "roadmap_revisions" ADD CONSTRAINT "roadmap_revisions_journey_id_journeys_id_fk" FOREIGN KEY ("journey_id") REFERENCES "public"."journeys"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "xp_ledger" ADD CONSTRAINT "xp_ledger_player_id_players_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."players"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "xp_ledger" ADD CONSTRAINT "xp_ledger_quest_id_quests_id_fk" FOREIGN KEY ("quest_id") REFERENCES "public"."quests"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "ai_usage_created_player_idx" ON "ai_usage" USING btree ("created_at","player_id");--> statement-breakpoint
CREATE UNIQUE INDEX "coin_ledger_source_once_idx" ON "coin_ledger" USING btree ("player_id","source","reference_key") WHERE "coin_ledger"."reference_key" IS NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX "concepts_global_name_unique" ON "concepts" USING btree ("domain_id","normalized_name") WHERE "concepts"."owner_player_id" IS NULL;--> statement-breakpoint
CREATE UNIQUE INDEX "concepts_player_name_unique" ON "concepts" USING btree ("owner_player_id","domain_id","normalized_name") WHERE "concepts"."owner_player_id" IS NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX "concepts_global_key_unique" ON "concepts" USING btree ("key") WHERE "concepts"."owner_player_id" IS NULL AND "concepts"."key" IS NOT NULL;--> statement-breakpoint
CREATE INDEX "conversation_summaries_player_created_idx" ON "conversation_summaries" USING btree ("player_id","created_at");--> statement-breakpoint
CREATE INDEX "conversations_player_last_message_idx" ON "conversations" USING btree ("player_id","last_message_at");--> statement-breakpoint
CREATE UNIQUE INDEX "domains_global_name_unique" ON "domains" USING btree ("normalized_name") WHERE "domains"."owner_player_id" IS NULL;--> statement-breakpoint
CREATE UNIQUE INDEX "domains_player_name_unique" ON "domains" USING btree ("owner_player_id","normalized_name") WHERE "domains"."owner_player_id" IS NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX "domains_global_key_unique" ON "domains" USING btree ("key") WHERE "domains"."owner_player_id" IS NULL AND "domains"."key" IS NOT NULL;--> statement-breakpoint
CREATE INDEX "journeys_player_status_idx" ON "journeys" USING btree ("player_id","status");--> statement-breakpoint
CREATE INDEX "knowledge_signals_player_concept_idx" ON "knowledge_signals" USING btree ("player_id","concept_id");--> statement-breakpoint
CREATE INDEX "memories_player_status_idx" ON "memories" USING btree ("player_id","status");--> statement-breakpoint
CREATE INDEX "messages_conversation_created_idx" ON "messages" USING btree ("conversation_id","created_at");--> statement-breakpoint
CREATE INDEX "players_last_active_at_idx" ON "players" USING btree ("last_active_at");--> statement-breakpoint
CREATE INDEX "roadmap_proposals_player_status_idx" ON "roadmap_proposals" USING btree ("player_id","status");--> statement-breakpoint
CREATE INDEX "xp_ledger_player_date_idx" ON "xp_ledger" USING btree ("player_id","local_date");