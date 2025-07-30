ALTER TABLE "cart" DROP CONSTRAINT "min_quantity";--> statement-breakpoint
ALTER TABLE "cart" DROP COLUMN "quantity";--> statement-breakpoint
ALTER TABLE "cart" ADD CONSTRAINT "min_quantity" CHECK ( > 0);