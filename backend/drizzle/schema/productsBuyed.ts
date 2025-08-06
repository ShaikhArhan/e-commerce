import { integer, jsonb, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { products } from "./products";

export const productsBuyed = pgTable("products_buyed", {
  id: uuid("id").defaultRandom().primaryKey(),

  productId: uuid("product_id")
    .references(() => products.id)
    .notNull(),

  allUsers: jsonb("all_users").$type<Array<string>>().notNull(),

  totalBuyedQuantity: integer("total_buyed_quantity").notNull().default(1),

  createdAt: timestamp("created_at", {
    mode: "string",
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
});
