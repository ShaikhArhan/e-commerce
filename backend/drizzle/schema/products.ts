import { sql } from 'drizzle-orm';
import {
  check,
  integer,
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { users } from './users';

export const inStockEnum = pgEnum('in_stock_enum', [
  'In Stock',
  'Out of Stock',
  'Pre-order',
  'Backorder',
  'Discontinued',
  'Coming Soon',
  'Made to Order',
  'Store Only',
]);

export const products = pgTable(
  'products',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    vendorId: uuid('vendor_id').notNull().references(() => users.id),

    vendorAddress: varchar('vendor_address', { length: 400 }).notNull(),

    image: text('image').notNull(),

    name: varchar('name', { length: 100 }).notNull(),

    description: varchar('description', { length: 300 }).notNull(),

    price: numeric('price').notNull(),

    discount: numeric('discount').default('0'),

    stockStatus: inStockEnum('stock_status').default('In Stock').notNull(),

    inStock: integer('in_stock').notNull(),

    createdAt: timestamp('product_created_at', {
      mode: 'string',
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
  },
  (table) => {
    return {
      minPrice: check('min_price', sql`${table.price} >= 0`),
      minMaxDiscount: check(
        'min_max_discount',
        sql`${table.discount} >= 0 AND ${table.discount} <= 100`
      ),
      minStock: check('min_stock', sql`${table.inStock} >= 0`),
    };
  }
);
