CREATE TYPE "public"."order_status_enum" AS ENUM('pending', 'completed', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."payment_method_enum" AS ENUM('credit_card', 'paypal', 'bank_transfer', 'cash_on_delivery', 'gift_card', 'apple_pay', 'google_pay', 'other');--> statement-breakpoint
CREATE TYPE "public"."in_stock_enum" AS ENUM('In Stock', 'Out of Stock', 'Pre-order', 'Backorder', 'Discontinued', 'Coming Soon', 'Made to Order', 'Store Only');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('user', 'admin', 'vendor');--> statement-breakpoint
CREATE TABLE "cart" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"product_id" uuid NOT NULL,
	"quantity" integer NOT NULL,
	"total_amount" integer NOT NULL,
	CONSTRAINT "min_quantity" CHECK ("cart"."quantity" > 0),
	CONSTRAINT "min_price" CHECK ("cart"."total_amount" >= 0)
);
--> statement-breakpoint
CREATE TABLE "favorite_product" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"product_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "order" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"order_product_details" text NOT NULL,
	"order_address" varchar(400),
	"order_created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"payment_method" "payment_method_enum" NOT NULL,
	"order_status" "order_status_enum" DEFAULT 'pending' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"vendor_id" uuid NOT NULL,
	"vendor_address" varchar(400) NOT NULL,
	"image" text NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" varchar(300) NOT NULL,
	"price" numeric NOT NULL,
	"discount" numeric DEFAULT '0',
	"stock_status" "in_stock_enum" DEFAULT 'In Stock' NOT NULL,
	"in_stock" integer NOT NULL,
	"product_created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "min_price" CHECK ("products"."price" >= 0),
	CONSTRAINT "min_max_discount" CHECK ("products"."discount" >= 0 AND "products"."discount" <= 100),
	CONSTRAINT "min_stock" CHECK ("products"."in_stock" >= 0)
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"fullname" varchar(100) NOT NULL,
	"email" varchar(100) NOT NULL,
	"password" varchar(100) NOT NULL,
	"country" varchar(100) NOT NULL,
	"phone_number" varchar(20),
	"address" varchar(400),
	"role" "user_role" DEFAULT 'user' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "cart" ADD CONSTRAINT "cart_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cart" ADD CONSTRAINT "cart_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "favorite_product" ADD CONSTRAINT "favorite_product_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "favorite_product" ADD CONSTRAINT "favorite_product_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order" ADD CONSTRAINT "order_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_vendor_id_users_id_fk" FOREIGN KEY ("vendor_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;