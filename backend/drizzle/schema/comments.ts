import { jsonb, pgTable, uuid } from "drizzle-orm/pg-core";
import { products } from "./products";
import { ProductCommentsDto } from "../../dtos/commentDto";

export const comments = pgTable("comments", {
  id: uuid("id").defaultRandom().primaryKey(),

  productId: uuid("product_id")
    .references(() => products.id)
    .notNull(),

  productComments: jsonb("product_comments")
    .$type<Array<ProductCommentsDto>>()
    .notNull(),
});
