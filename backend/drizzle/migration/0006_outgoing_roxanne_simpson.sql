ALTER TABLE "cart" DROP CONSTRAINT "min_quantity";--> statement-breakpoint
ALTER TABLE "cart" ADD COLUMN "quantity" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "cart" ADD CONSTRAINT "min_quantity" CHECK ("cart"."quantity" > 0);