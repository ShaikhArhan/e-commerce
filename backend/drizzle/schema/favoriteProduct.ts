import { pgTable, uuid } from 'drizzle-orm/pg-core';
import { users } from './users';
import { products } from './products';

export const favoriteProduct = pgTable('favorite_product', {
  id: uuid('id').defaultRandom().primaryKey(),

  userId: uuid('user_id')
    .notNull()
    .references(() => users.id),

  productId: uuid('product_id')
    .notNull()
    .references(() => products.id),
});
