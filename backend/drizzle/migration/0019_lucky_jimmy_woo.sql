ALTER TYPE "public"."order_status_enum" ADD VALUE 'shipped' BEFORE 'cancelled';--> statement-breakpoint
ALTER TYPE "public"."order_status_enum" ADD VALUE 'delivered' BEFORE 'cancelled';