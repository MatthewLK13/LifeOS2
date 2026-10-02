CREATE UNIQUE INDEX "knowledge_signals_source_unique"
ON "knowledge_signals" ("player_id", "concept_id", "source_id", "signal_type")
WHERE "source_id" IS NOT NULL;
