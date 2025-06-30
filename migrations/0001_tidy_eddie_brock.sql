ALTER TABLE "speaker_application" ALTER COLUMN "gender" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "speaker_application" ALTER COLUMN "available_in_beijing" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "speaker_application" ADD COLUMN "email" text NOT NULL;--> statement-breakpoint
ALTER TABLE "speaker_application" ADD COLUMN "rehearsal_availability" text NOT NULL;--> statement-breakpoint
ALTER TABLE "speaker_application" ADD COLUMN "common_belief" text NOT NULL;--> statement-breakpoint
ALTER TABLE "speaker_application" ADD COLUMN "core_idea" text NOT NULL;--> statement-breakpoint
ALTER TABLE "speaker_application" ADD COLUMN "personal_insight" text NOT NULL;--> statement-breakpoint
ALTER TABLE "speaker_application" ADD COLUMN "potential_impact" text NOT NULL;