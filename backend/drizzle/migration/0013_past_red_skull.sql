ALTER TABLE "order" DROP CONSTRAINT "order_order_product_id_products_id_fk";
--> statement-breakpoint
ALTER TABLE "order" DROP COLUMN "order_product_id";