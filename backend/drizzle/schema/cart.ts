import { check, integer, pgTable, uuid } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { products } from './products';
import { users } from './users';

export const cart = pgTable(
  'cart',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    userId: uuid('user_id')
      .references(() => users.id)
      .notNull(),

    productId: uuid('product_id')
      .references(() => products.id)
      .notNull(),

    quantity: integer('quantity').notNull().default(1),

    totalPrice: integer('total_amount').notNull(),
  },
  (table) => {
    return {
      minQuantity: check('min_quantity', sql`${table.quantity} > 0`),
      minPrice: check('min_price', sql`${table.totalPrice} >= 0`),
    };
  }
);
