import {
  integer,
  jsonb,
  numeric,
  pgTable,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { products } from "./products";
import { RatingDetailDto } from "../../dtos/ratingDto";
import { comments } from "./comments";

export const rating = pgTable("rating", {
  id: uuid("id").defaultRandom().primaryKey(),

  productId: uuid("product_id")
    .references(() => products.id)
    .notNull(),

  ratingDetail: jsonb("rating_detail")
    .$type<Array<RatingDetailDto>>()
    .notNull(),

  totalRating: numeric("total_rating").notNull().$type<number>().default(0),

  commentId: uuid("comment_id")
    .references(() => comments.id)
    .notNull(),

  createdAt: timestamp("created_at", {
    mode: "string",
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
});
