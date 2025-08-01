ALTER TABLE "ratings" RENAME TO "rating";--> statement-breakpoint
ALTER TABLE "rating" DROP CONSTRAINT "ratings_product_id_products_id_fk";
--> statement-breakpoint
ALTER TABLE "rating" ADD CONSTRAINT "rating_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;