ALTER TABLE "order" DROP CONSTRAINT "order_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "order" DROP CONSTRAINT "order_product_id_products_id_fk";
--> statement-breakpoint
ALTER TABLE "order" DROP COLUMN "id";--> statement-breakpoint
ALTER TABLE "order" DROP COLUMN "user_id";--> statement-breakpoint
ALTER TABLE "order" DROP COLUMN "product_id";--> statement-breakpoint
ALTER TABLE "order" DROP COLUMN "order_address";--> statement-breakpoint
ALTER TABLE "order" DROP COLUMN "payment_method";--> statement-breakpoint
ALTER TABLE "order" DROP COLUMN "order_status";--> statement-breakpoint
ALTER TABLE "order" DROP COLUMN "order_created_at";