ALTER TABLE "rating" RENAME TO "ratings";--> statement-breakpoint
ALTER TABLE "ratings" DROP CONSTRAINT "rating_product_id_products_id_fk";
--> statement-breakpoint
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;