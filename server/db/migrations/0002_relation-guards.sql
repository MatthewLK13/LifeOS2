CREATE OR REPLACE FUNCTION lifeos_check_chapter_arc_journey() RETURNS trigger
LANGUAGE plpgsql AS $$
BEGIN
  IF NEW.arc_id IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM journey_arcs a WHERE a.id=NEW.arc_id AND a.journey_id=NEW.journey_id
  ) THEN
    RAISE EXCEPTION 'chapter arc must belong to the chapter journey' USING ERRCODE='23503';
  END IF;
  RETURN NEW;
END; $$;
--> statement-breakpoint
CREATE TRIGGER chapters_arc_journey_guard
BEFORE INSERT OR UPDATE OF arc_id, journey_id ON chapters
FOR EACH ROW EXECUTE FUNCTION lifeos_check_chapter_arc_journey();
--> statement-breakpoint
CREATE OR REPLACE FUNCTION lifeos_check_signal_concept_owner() RETURNS trigger
LANGUAGE plpgsql AS $$
DECLARE concept_owner uuid;
BEGIN
  SELECT owner_player_id INTO concept_owner FROM concepts WHERE id=NEW.concept_id;
  IF concept_owner IS NOT NULL AND concept_owner<>NEW.player_id THEN
    RAISE EXCEPTION 'knowledge signal player must own its private concept' USING ERRCODE='23503';
  END IF;
  RETURN NEW;
END; $$;
--> statement-breakpoint
CREATE TRIGGER knowledge_signals_concept_owner_guard
BEFORE INSERT OR UPDATE OF player_id, concept_id ON knowledge_signals
FOR EACH ROW EXECUTE FUNCTION lifeos_check_signal_concept_owner();
--> statement-breakpoint
CREATE OR REPLACE FUNCTION lifeos_check_concept_owner_change() RETURNS trigger
LANGUAGE plpgsql AS $$
BEGIN
  IF NEW.owner_player_id IS NOT NULL AND EXISTS (
    SELECT 1 FROM knowledge_signals s WHERE s.concept_id=NEW.id AND s.player_id<>NEW.owner_player_id
  ) THEN
    RAISE EXCEPTION 'private concept already has another player’s knowledge signals' USING ERRCODE='23503';
  END IF;
  RETURN NEW;
END; $$;
--> statement-breakpoint
CREATE TRIGGER concepts_signal_owner_guard
BEFORE UPDATE OF owner_player_id ON concepts
FOR EACH ROW EXECUTE FUNCTION lifeos_check_concept_owner_change();
--> statement-breakpoint
CREATE OR REPLACE FUNCTION lifeos_check_quest_player() RETURNS trigger
LANGUAGE plpgsql AS $$
BEGIN
  IF NEW.quest_id IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM quests q WHERE q.id=NEW.quest_id AND q.player_id=NEW.player_id
  ) THEN
    RAISE EXCEPTION 'quest-linked record must belong to the same player as its quest' USING ERRCODE='23503';
  END IF;
  RETURN NEW;
END; $$;
--> statement-breakpoint
CREATE TRIGGER xp_ledger_quest_owner_guard
BEFORE INSERT OR UPDATE OF quest_id, player_id ON xp_ledger
FOR EACH ROW EXECUTE FUNCTION lifeos_check_quest_player();
--> statement-breakpoint
CREATE TRIGGER assessments_quest_owner_guard
BEFORE INSERT OR UPDATE OF quest_id, player_id ON assessments
FOR EACH ROW EXECUTE FUNCTION lifeos_check_quest_player();
--> statement-breakpoint
CREATE OR REPLACE FUNCTION lifeos_check_memory_conversation_player() RETURNS trigger
LANGUAGE plpgsql AS $$
BEGIN
  IF NEW.source_conversation_id IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM conversations c WHERE c.id=NEW.source_conversation_id AND c.player_id=NEW.player_id
  ) THEN
    RAISE EXCEPTION 'memory source conversation must belong to the same player' USING ERRCODE='23503';
  END IF;
  RETURN NEW;
END; $$;
--> statement-breakpoint
CREATE TRIGGER memories_source_owner_guard
BEFORE INSERT OR UPDATE OF source_conversation_id, player_id ON memories
FOR EACH ROW EXECUTE FUNCTION lifeos_check_memory_conversation_player();
