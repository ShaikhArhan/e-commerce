ALTER TABLE "order" ADD COLUMN "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL;--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "user_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "order_product_detail" jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "order_address" varchar(400) NOT NULL;--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "payment_method" "payment_method_enum" NOT NULL;--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "order_status" "order_status_enum" DEFAULT 'pending' NOT NULL;--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "order_created_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "order" ADD CONSTRAINT "order_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;