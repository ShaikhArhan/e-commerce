import {
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { users } from './users';
import { products } from './products';

export const paymentMethodEnum = pgEnum('payment_method_enum', [
  'credit_card',
  'paypal',
  'bank_transfer',
  'cash_on_delivery',
  'gift_card',
  'apple_pay',
  'google_pay',
  'other',
]);

export const orderStatusEnum = pgEnum('order_status_enum', [
  'pending',
  'completed',
  'shipped',
  'delivered',
  'cancelled',
]);

export const order = pgTable('order', {
  id: uuid('id').defaultRandom().primaryKey(),

  userId: uuid('user_id')
    .notNull()
    .references(() => users.id),

  orderProductDetail: jsonb('order_product_detail')
    .$type<
      Array<{
        productId: string;
        product: {
          image: string;
          name: string;
          description: string;
          price: string;
          discount: string;
          stockStatus: string;
          inStock: number;
        };
        quantity: number;
        totalPrice: number;
      }>
    >()
    .notNull(),

  totalOrderProduct: integer('total_order_product').notNull().default(0),

  orderAddress: varchar('order_address', { length: 400 }).notNull(),

  paymentMethod: paymentMethodEnum('payment_method').notNull(),

  orderStatus: orderStatusEnum('order_status').default('pending').notNull(),

  orderCreatedAt: timestamp('order_created_at', {
    mode: 'string',
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
});
