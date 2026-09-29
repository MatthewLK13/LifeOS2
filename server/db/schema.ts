import {sql} from 'drizzle-orm';
import {boolean,check,date,foreignKey,index,integer,jsonb,numeric,pgEnum,pgTable,text,timestamp,unique,uniqueIndex,uuid,bigint,primaryKey} from 'drizzle-orm/pg-core';

const createdAt=()=>timestamp('created_at',{withTimezone:true}).notNull().defaultNow();
const updatedAt=()=>timestamp('updated_at',{withTimezone:true}).notNull().defaultNow();
const metadata=()=>jsonb('metadata').$type<Record<string,unknown>>().notNull().default({});
export const playerRole=pgEnum('player_role',['GUEST','USER','ADMIN','DEMO']);
export const playerStatus=pgEnum('player_status',['ACTIVE','DISABLED']);
export const journeyStatus=pgEnum('journey_status',['ACTIVE','COMPLETED','ARCHIVED']);
export const questType=pgEnum('quest_type',['LEARN','PRACTICE','ASSESSMENT','PROJECT']);
export const assessmentSubtype=pgEnum('assessment_subtype',['QUIZ','CODE_REVIEW','WRITTEN']);
export const questStatus=pgEnum('quest_status',['AVAILABLE','IN_PROGRESS','COMPLETED','SKIPPED']);
export const questSource=pgEnum('quest_source',['TEMPLATE','AI','HYBRID']);
export const proposalType=pgEnum('proposal_type',['CREATE','MODIFY','PACING']);
export const proposalStatus=pgEnum('proposal_status',['PENDING','ACCEPTED','REJECTED','EXPIRED']);
export const catalogSource=pgEnum('catalog_source',['SEED','AI_DYNAMIC']);
export const knowledgeLevel=pgEnum('knowledge_level',['UNSEEN','DISCOVERED','EXPLORING','UNDERSTANDING','APPLYING','MASTERED']);
export const signalSource=pgEnum('signal_source',['CHAT','QUIZ','WRITTEN','CODE_REVIEW','QUEST_REFLECTION']);
export const signalType=pgEnum('signal_type',['DISCOVERY','EXPLORATION','UNDERSTANDING','APPLICATION']);
export const conversationStatus=pgEnum('conversation_status',['ACTIVE','CLOSED']);
export const messageRole=pgEnum('message_role',['USER','ASSISTANT','SYSTEM']);
export const messageStatus=pgEnum('message_status',['COMPLETE','FAILED']);
export const memoryStatus=pgEnum('memory_status',['PENDING','CONFIRMED','DISMISSED']);
export const assessmentVerdict=pgEnum('assessment_verdict',['NEEDS_WORK','GOOD','STRONG']);
export const itemCategory=pgEnum('item_category',['AVATAR','FRAME','TITLE','GRIMOIRE_SKIN','COMPANION_COSMETIC']);
export const notificationStatus=pgEnum('notification_status',['PENDING','SENT','FAILED','SKIPPED']);
export const aiPurpose=pgEnum('ai_purpose',['COMPANION','ROADMAP','ASSESSMENT','KNOWLEDGE_ANALYSIS','SUMMARY','MEMORY','CONCEPT_MATCH']);

export const players=pgTable('players',{
 id:uuid('id').primaryKey().defaultRandom(),codeDigest:text('code_digest').notNull().unique(),role:playerRole('role').notNull().default('GUEST'),isDemo:boolean('is_demo').notNull().default(false),status:playerStatus('status').notNull().default('ACTIVE'),createdAt:createdAt(),lastActiveAt:timestamp('last_active_at',{withTimezone:true}).notNull().defaultNow()
},t=>[index('players_last_active_at_idx').on(t.lastActiveAt)]);
export const inventoryItems=pgTable('inventory_items',{
 id:uuid('id').primaryKey().defaultRandom(),key:text('key').notNull().unique(),category:itemCategory('category').notNull(),name:text('name').notNull(),description:text('description'),rarity:text('rarity'),priceCoins:integer('price_coins').notNull().default(0),assetKey:text('asset_key').notNull(),active:boolean('active').notNull().default(true),createdAt:createdAt()
},t=>[check('inventory_items_price_nonnegative',sql`${t.priceCoins} >= 0`)]);
export const profiles=pgTable('profiles',{
 playerId:uuid('player_id').primaryKey().references(()=>players.id,{onDelete:'cascade'}),displayName:text('display_name').notNull(),xp:integer('xp').notNull().default(0),coins:integer('coins').notNull().default(0),dailyXp:integer('daily_xp').notNull().default(0),dailyXpDate:date('daily_xp_date').notNull(),streak:integer('streak').notNull().default(0),longestStreak:integer('longest_streak').notNull().default(0),lastQuestCompletedDate:date('last_quest_completed_date'),timezone:text('timezone').notNull().default('Asia/Ho_Chi_Minh'),avatarItemId:uuid('avatar_item_id').references(()=>inventoryItems.id,{onDelete:'set null'}),frameItemId:uuid('frame_item_id').references(()=>inventoryItems.id,{onDelete:'set null'}),titleItemId:uuid('title_item_id').references(()=>inventoryItems.id,{onDelete:'set null'}),grimoireSkinItemId:uuid('grimoire_skin_item_id').references(()=>inventoryItems.id,{onDelete:'set null'}),companionCosmeticItemId:uuid('companion_cosmetic_item_id').references(()=>inventoryItems.id,{onDelete:'set null'}),preferences:jsonb('preferences').$type<Record<string,unknown>>().notNull().default({}),createdAt:createdAt(),updatedAt:updatedAt()
},t=>[check('profiles_nonnegative_progress',sql`${t.xp} >= 0 AND ${t.coins} >= 0 AND ${t.dailyXp} BETWEEN 0 AND 120 AND ${t.streak} >= 0 AND ${t.longestStreak} >= ${t.streak}`)]);
export const journeys=pgTable('journeys',{
 id:uuid('id').primaryKey().defaultRandom(),playerId:uuid('player_id').notNull().references(()=>players.id,{onDelete:'cascade'}),title:text('title').notNull(),goal:text('goal').notNull(),status:journeyStatus('status').notNull().default('ACTIVE'),version:integer('version').notNull().default(1),minutesPerDay:integer('minutes_per_day').notNull(),experienceLevel:text('experience_level'),templateKey:text('template_key'),createdAt:createdAt(),completedAt:timestamp('completed_at',{withTimezone:true}),archivedAt:timestamp('archived_at',{withTimezone:true})
},t=>[unique('journeys_id_player_id_unique').on(t.id,t.playerId),index('journeys_player_status_idx').on(t.playerId,t.status),check('journeys_version_positive',sql`${t.version} > 0`),check('journeys_minutes_range',sql`${t.minutesPerDay} BETWEEN 15 AND 120`)]);
export const journeyArcs=pgTable('journey_arcs',{
 id:uuid('id').primaryKey().defaultRandom(),journeyId:uuid('journey_id').notNull().references(()=>journeys.id,{onDelete:'cascade'}),title:text('title').notNull(),summary:text('summary'),orderIndex:integer('order_index').notNull(),createdAt:createdAt()
},t=>[unique('journey_arcs_journey_order_unique').on(t.journeyId,t.orderIndex)]);
export const chapters=pgTable('chapters',{
 id:uuid('id').primaryKey().defaultRandom(),journeyId:uuid('journey_id').notNull().references(()=>journeys.id,{onDelete:'cascade'}),arcId:uuid('arc_id').references(()=>journeyArcs.id,{onDelete:'set null'}),title:text('title').notNull(),summary:text('summary'),orderIndex:integer('order_index').notNull(),lane:text('lane'),metadata:metadata(),createdAt:createdAt()
},t=>[unique('chapters_id_journey_unique').on(t.id,t.journeyId),unique('chapters_journey_order_unique').on(t.journeyId,t.orderIndex)]);
export const quests=pgTable('quests',{
 id:uuid('id').primaryKey().defaultRandom(),journeyId:uuid('journey_id').notNull(),playerId:uuid('player_id').notNull(),chapterId:uuid('chapter_id').notNull(),type:questType('type').notNull(),assessmentSubtype:assessmentSubtype('assessment_subtype'),title:text('title').notNull(),description:text('description'),topic:text('topic'),prompt:text('prompt'),difficulty:text('difficulty'),xpReward:integer('xp_reward').notNull(),minutes:integer('minutes').notNull(),status:questStatus('status').notNull().default('AVAILABLE'),orderIndex:integer('order_index').notNull(),source:questSource('source').notNull().default('TEMPLATE'),metadata:metadata(),startedAt:timestamp('started_at',{withTimezone:true}),completedAt:timestamp('completed_at',{withTimezone:true}),skippedAt:timestamp('skipped_at',{withTimezone:true}),createdAt:createdAt(),updatedAt:updatedAt()
},t=>[foreignKey({name:'quests_journey_player_fk',columns:[t.journeyId,t.playerId],foreignColumns:[journeys.id,journeys.playerId]}).onDelete('cascade'),foreignKey({name:'quests_chapter_journey_fk',columns:[t.chapterId,t.journeyId],foreignColumns:[chapters.id,chapters.journeyId]}).onDelete('cascade'),unique('quests_id_journey_unique').on(t.id,t.journeyId),unique('quests_id_player_unique').on(t.id,t.playerId),unique('quests_journey_order_unique').on(t.journeyId,t.orderIndex),check('quests_reward_minutes_nonnegative',sql`${t.xpReward} >= 0 AND ${t.minutes} > 0`),check('quests_completion_timestamp',sql`(${t.status} <> 'COMPLETED' OR ${t.completedAt} IS NOT NULL)`)]);
export const questSteps=pgTable('quest_steps',{
 id:uuid('id').primaryKey().defaultRandom(),questId:uuid('quest_id').notNull().references(()=>quests.id,{onDelete:'cascade'}),orderIndex:integer('order_index').notNull(),content:text('content').notNull(),completed:boolean('completed').notNull().default(false),completedAt:timestamp('completed_at',{withTimezone:true})
},t=>[unique('quest_steps_quest_order_unique').on(t.questId,t.orderIndex)]);
export const questNotes=pgTable('quest_notes',{
 questId:uuid('quest_id').primaryKey(),playerId:uuid('player_id').notNull().references(()=>players.id,{onDelete:'cascade'}),content:text('content').notNull().default(''),updatedAt:updatedAt()
},t=>[foreignKey({name:'quest_notes_quest_player_fk',columns:[t.questId,t.playerId],foreignColumns:[quests.id,quests.playerId]}).onDelete('cascade'),check('quest_notes_content_limit',sql`octet_length(${t.content}) <= 20000`)]);
export const xpLedger=pgTable('xp_ledger',{
 id:uuid('id').primaryKey().defaultRandom(),playerId:uuid('player_id').notNull().references(()=>players.id,{onDelete:'cascade'}),questId:uuid('quest_id').references(()=>quests.id,{onDelete:'set null'}),source:text('source').notNull(),amount:integer('amount').notNull(),localDate:date('local_date').notNull(),createdAt:createdAt()
},t=>[index('xp_ledger_player_date_idx').on(t.playerId,t.localDate),check('xp_ledger_amount_nonnegative',sql`${t.amount} >= 0`)]);
export const roadmapProposals=pgTable('roadmap_proposals',{
 id:uuid('id').primaryKey().defaultRandom(),playerId:uuid('player_id').notNull().references(()=>players.id,{onDelete:'cascade'}),journeyId:uuid('journey_id').notNull(),baseVersion:integer('base_version').notNull(),type:proposalType('type').notNull(),status:proposalStatus('status').notNull().default('PENDING'),reason:text('reason'),patchJson:jsonb('patch_json').$type<Record<string,unknown>>().notNull(),previewJson:jsonb('preview_json').$type<Record<string,unknown>>().notNull(),createdAt:createdAt(),decidedAt:timestamp('decided_at',{withTimezone:true})
},t=>[foreignKey({name:'roadmap_proposals_journey_player_fk',columns:[t.journeyId,t.playerId],foreignColumns:[journeys.id,journeys.playerId]}).onDelete('cascade'),index('roadmap_proposals_player_status_idx').on(t.playerId,t.status)]);
export const roadmapRevisions=pgTable('roadmap_revisions',{
 id:uuid('id').primaryKey().defaultRandom(),journeyId:uuid('journey_id').notNull().references(()=>journeys.id,{onDelete:'cascade'}),versionFrom:integer('version_from').notNull(),versionTo:integer('version_to').notNull(),reason:text('reason'),diffJson:jsonb('diff_json').$type<Record<string,unknown>>().notNull(),createdAt:createdAt()
},t=>[unique('roadmap_revisions_version_unique').on(t.journeyId,t.versionTo),check('roadmap_revisions_forward',sql`${t.versionTo} > ${t.versionFrom}`)]);
export const domains=pgTable('domains',{
 id:uuid('id').primaryKey().defaultRandom(),ownerPlayerId:uuid('owner_player_id').references(()=>players.id,{onDelete:'cascade'}),key:text('key'),name:text('name').notNull(),normalizedName:text('normalized_name').notNull(),description:text('description'),source:catalogSource('source').notNull().default('SEED'),iconKey:text('icon_key'),colorKey:text('color_key'),createdAt:createdAt()
},t=>[uniqueIndex('domains_global_name_unique').on(t.normalizedName).where(sql`${t.ownerPlayerId} IS NULL`),uniqueIndex('domains_player_name_unique').on(t.ownerPlayerId,t.normalizedName).where(sql`${t.ownerPlayerId} IS NOT NULL`),uniqueIndex('domains_global_key_unique').on(t.key).where(sql`${t.ownerPlayerId} IS NULL AND ${t.key} IS NOT NULL`)]);
export const concepts=pgTable('concepts',{
 id:uuid('id').primaryKey().defaultRandom(),domainId:uuid('domain_id').notNull().references(()=>domains.id,{onDelete:'cascade'}),ownerPlayerId:uuid('owner_player_id').references(()=>players.id,{onDelete:'cascade'}),key:text('key'),name:text('name').notNull(),normalizedName:text('normalized_name').notNull(),description:text('description'),source:catalogSource('source').notNull().default('SEED'),createdAt:createdAt()
},t=>[uniqueIndex('concepts_global_name_unique').on(t.domainId,t.normalizedName).where(sql`${t.ownerPlayerId} IS NULL`),uniqueIndex('concepts_player_name_unique').on(t.ownerPlayerId,t.domainId,t.normalizedName).where(sql`${t.ownerPlayerId} IS NOT NULL`),uniqueIndex('concepts_global_key_unique').on(t.key).where(sql`${t.ownerPlayerId} IS NULL AND ${t.key} IS NOT NULL`)]);
export const conceptProgress=pgTable('concept_progress',{
 playerId:uuid('player_id').notNull().references(()=>players.id,{onDelete:'cascade'}),conceptId:uuid('concept_id').notNull().references(()=>concepts.id,{onDelete:'cascade'}),level:knowledgeLevel('level').notNull().default('UNSEEN'),signalCounts:jsonb('signal_counts').$type<Record<string,number>>().notNull().default({}),firstSeenAt:timestamp('first_seen_at',{withTimezone:true}),updatedAt:updatedAt(),masteredAt:timestamp('mastered_at',{withTimezone:true})
},t=>[primaryKey({columns:[t.playerId,t.conceptId]})]);
export const knowledgeSignals=pgTable('knowledge_signals',{
 id:uuid('id').primaryKey().defaultRandom(),playerId:uuid('player_id').notNull().references(()=>players.id,{onDelete:'cascade'}),conceptId:uuid('concept_id').notNull().references(()=>concepts.id,{onDelete:'cascade'}),conversationId:uuid('conversation_id'),sourceType:signalSource('source_type').notNull(),sourceId:uuid('source_id'),signalType:signalType('signal_type').notNull(),confidence:numeric('confidence',{precision:4,scale:3}).notNull(),createdAt:createdAt()
},t=>[index('knowledge_signals_player_concept_idx').on(t.playerId,t.conceptId),uniqueIndex('knowledge_signals_source_unique').on(t.playerId,t.conceptId,t.sourceId,t.signalType).where(sql`${t.sourceId} IS NOT NULL`),check('knowledge_signals_confidence_range',sql`${t.confidence} BETWEEN 0 AND 1`)]);
export const conversations=pgTable('conversations',{
 id:uuid('id').primaryKey().defaultRandom(),playerId:uuid('player_id').notNull().references(()=>players.id,{onDelete:'cascade'}),title:text('title'),status:conversationStatus('status').notNull().default('ACTIVE'),startedAt:timestamp('started_at',{withTimezone:true}).notNull().defaultNow(),lastMessageAt:timestamp('last_message_at',{withTimezone:true}).notNull().defaultNow(),closedAt:timestamp('closed_at',{withTimezone:true}),summarizedAt:timestamp('summarized_at',{withTimezone:true})
},t=>[unique('conversations_id_player_unique').on(t.id,t.playerId),index('conversations_player_last_message_idx').on(t.playerId,t.lastMessageAt)]);
export const messages=pgTable('messages',{
 id:uuid('id').primaryKey().defaultRandom(),conversationId:uuid('conversation_id').notNull().references(()=>conversations.id,{onDelete:'cascade'}),role:messageRole('role').notNull(),content:text('content').notNull(),status:messageStatus('status').notNull().default('COMPLETE'),inputTokens:integer('input_tokens'),outputTokens:integer('output_tokens'),createdAt:createdAt()
},t=>[index('messages_conversation_created_idx').on(t.conversationId,t.createdAt)]);
export const conversationSummaries=pgTable('conversation_summaries',{
 id:uuid('id').primaryKey().defaultRandom(),conversationId:uuid('conversation_id').notNull(),playerId:uuid('player_id').notNull().references(()=>players.id,{onDelete:'cascade'}),summary:text('summary').notNull(),keyTopics:jsonb('key_topics').$type<string[]>().notNull().default([]),createdAt:createdAt()
},t=>[foreignKey({name:'conversation_summaries_conversation_player_fk',columns:[t.conversationId,t.playerId],foreignColumns:[conversations.id,conversations.playerId]}).onDelete('cascade'),unique('conversation_summaries_conversation_unique').on(t.conversationId),index('conversation_summaries_player_created_idx').on(t.playerId,t.createdAt)]);
export const memories=pgTable('memories',{
 id:uuid('id').primaryKey().defaultRandom(),playerId:uuid('player_id').notNull().references(()=>players.id,{onDelete:'cascade'}),text:text('text').notNull(),status:memoryStatus('status').notNull().default('PENDING'),sourceConversationId:uuid('source_conversation_id').references(()=>conversations.id,{onDelete:'set null'}),createdAt:createdAt(),decidedAt:timestamp('decided_at',{withTimezone:true})
},t=>[index('memories_player_status_idx').on(t.playerId,t.status)]);
export const assessments=pgTable('assessments',{
 id:uuid('id').primaryKey().defaultRandom(),playerId:uuid('player_id').notNull().references(()=>players.id,{onDelete:'cascade'}),questId:uuid('quest_id').references(()=>quests.id,{onDelete:'set null'}),subtype:assessmentSubtype('subtype').notNull(),prompt:text('prompt').notNull(),contentJson:jsonb('content_json').$type<Record<string,unknown>>().notNull(),templateKey:text('template_key'),createdAt:createdAt()
},t=>[unique('assessments_id_player_unique').on(t.id,t.playerId),check('assessments_prompt_limit',sql`octet_length(${t.prompt}) <= 204800`)]);
export const assessmentAttempts=pgTable('assessment_attempts',{
 id:uuid('id').primaryKey().defaultRandom(),assessmentId:uuid('assessment_id').notNull(),playerId:uuid('player_id').notNull().references(()=>players.id,{onDelete:'cascade'}),answerText:text('answer_text').notNull(),verdict:assessmentVerdict('verdict').notNull(),feedback:text('feedback').notNull(),structuredResult:jsonb('structured_result').$type<Record<string,unknown>>().notNull().default({}),createdAt:createdAt()
},t=>[foreignKey({name:'assessment_attempts_assessment_player_fk',columns:[t.assessmentId,t.playerId],foreignColumns:[assessments.id,assessments.playerId]}).onDelete('cascade'),check('assessment_attempt_answer_limit',sql`octet_length(${t.answerText}) <= 204800`)]);
export const achievements=pgTable('achievements',{
 id:uuid('id').primaryKey().defaultRandom(),key:text('key').notNull().unique(),name:text('name').notNull(),description:text('description').notNull(),ruleKey:text('rule_key').notNull(),rewardCoins:integer('reward_coins').notNull().default(0),iconAssetKey:text('icon_asset_key'),active:boolean('active').notNull().default(true)
},t=>[check('achievements_reward_nonnegative',sql`${t.rewardCoins} >= 0`)]);
export const playerAchievements=pgTable('player_achievements',{
 playerId:uuid('player_id').notNull().references(()=>players.id,{onDelete:'cascade'}),achievementId:uuid('achievement_id').notNull().references(()=>achievements.id,{onDelete:'restrict'}),unlockedAt:timestamp('unlocked_at',{withTimezone:true}).notNull().defaultNow()
},t=>[primaryKey({columns:[t.playerId,t.achievementId]})]);
export const milestones=pgTable('milestones',{
 id:uuid('id').primaryKey().defaultRandom(),key:text('key').notNull().unique(),category:text('category').notNull(),threshold:integer('threshold').notNull(),name:text('name').notNull(),description:text('description').notNull(),rewardCoins:integer('reward_coins').notNull().default(0),active:boolean('active').notNull().default(true)
},t=>[check('milestones_threshold_positive',sql`${t.threshold} > 0`),check('milestones_reward_nonnegative',sql`${t.rewardCoins} >= 0`)]);
export const playerMilestones=pgTable('player_milestones',{
 playerId:uuid('player_id').notNull().references(()=>players.id,{onDelete:'cascade'}),milestoneId:uuid('milestone_id').notNull().references(()=>milestones.id,{onDelete:'restrict'}),reachedAt:timestamp('reached_at',{withTimezone:true}).notNull().defaultNow()
},t=>[primaryKey({columns:[t.playerId,t.milestoneId]})]);
export const playerInventory=pgTable('player_inventory',{
 playerId:uuid('player_id').notNull().references(()=>players.id,{onDelete:'cascade'}),itemId:uuid('item_id').notNull().references(()=>inventoryItems.id,{onDelete:'restrict'}),unlockedAt:timestamp('unlocked_at',{withTimezone:true}).notNull().defaultNow()
},t=>[primaryKey({columns:[t.playerId,t.itemId]})]);
export const coinLedger=pgTable('coin_ledger',{
 id:uuid('id').primaryKey().defaultRandom(),playerId:uuid('player_id').notNull().references(()=>players.id,{onDelete:'cascade'}),source:text('source').notNull(),amount:integer('amount').notNull(),referenceKey:text('reference_key'),createdAt:createdAt()
},t=>[uniqueIndex('coin_ledger_source_once_idx').on(t.playerId,t.source,t.referenceKey).where(sql`${t.referenceKey} IS NOT NULL`),check('coin_ledger_amount_nonzero',sql`${t.amount} <> 0`)]);
export const pushSubscriptions=pgTable('push_subscriptions',{
 id:uuid('id').primaryKey().defaultRandom(),playerId:uuid('player_id').notNull().references(()=>players.id,{onDelete:'cascade'}),endpoint:text('endpoint').notNull().unique(),p256dh:text('p256dh').notNull(),auth:text('auth').notNull(),createdAt:createdAt(),lastSuccessAt:timestamp('last_success_at',{withTimezone:true}),disabledAt:timestamp('disabled_at',{withTimezone:true})
});
export const notifications=pgTable('notifications',{
 id:uuid('id').primaryKey().defaultRandom(),playerId:uuid('player_id').notNull().references(()=>players.id,{onDelete:'cascade'}),type:text('type').notNull(),localDate:date('local_date').notNull(),status:notificationStatus('status').notNull().default('PENDING'),payloadJson:jsonb('payload_json').$type<Record<string,unknown>>().notNull(),createdAt:createdAt(),sentAt:timestamp('sent_at',{withTimezone:true}),error:text('error')
},t=>[unique('notifications_player_type_date_unique').on(t.playerId,t.type,t.localDate)]);
export const aiUsage=pgTable('ai_usage',{
 id:uuid('id').primaryKey().defaultRandom(),playerId:uuid('player_id').references(()=>players.id,{onDelete:'set null'}),provider:text('provider').notNull(),model:text('model').notNull(),purpose:aiPurpose('purpose').notNull(),inputTokens:integer('input_tokens').notNull().default(0),outputTokens:integer('output_tokens').notNull().default(0),estimatedCostMicros:bigint('estimated_cost_micros',{mode:'number'}).notNull().default(0),createdAt:createdAt()
},t=>[index('ai_usage_created_player_idx').on(t.createdAt,t.playerId),check('ai_usage_nonnegative',sql`${t.inputTokens} >= 0 AND ${t.outputTokens} >= 0 AND ${t.estimatedCostMicros} >= 0`)]);
export const journeyTemplates=pgTable('journey_templates',{
 id:uuid('id').primaryKey().defaultRandom(),key:text('key').notNull().unique(),name:text('name').notNull(),description:text('description').notNull(),catalogVersion:integer('catalog_version').notNull(),curriculum:jsonb('curriculum').$type<Record<string,unknown>[]>().notNull(),updatedAt:updatedAt()
});
export const restoreAttempts=pgTable('restore_attempts',{
 bucketKey:text('bucket_key').primaryKey(),windowStartedAt:timestamp('window_started_at',{withTimezone:true}).notNull(),attempts:integer('attempts').notNull().default(0),updatedAt:updatedAt()
},t=>[check('restore_attempts_nonnegative',sql`${t.attempts} >= 0`),index('restore_attempts_updated_at_idx').on(t.updatedAt)]);
