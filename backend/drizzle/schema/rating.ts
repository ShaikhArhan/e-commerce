import { integer, jsonb, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';
import { products } from './products';
import { RatingDetailDto } from '../../dtos/ratingDto';

export const rating = pgTable('rating', {
  id: uuid('id').defaultRandom().primaryKey(),

  productId: uuid('product_id')
    .references(() => products.id)
    .notNull(),

  ratingDetail: jsonb('rating_detail')
    .$type<Array<RatingDetailDto>>()
    .notNull(),

  totalRating: integer('rating').notNull().default(0),

  createdAt: timestamp('created_at', {
    mode: 'string',
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
});
