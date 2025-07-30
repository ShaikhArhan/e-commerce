import { pgEnum, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const userRoleEnum = pgEnum('user_role', ['user', 'admin', 'vendor']);

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),

  fullname: varchar('fullname', { length: 100 }).notNull(),

  email: varchar('email', { length: 100 }).unique().notNull(),

  password: varchar('password', { length: 100 }).notNull(),

  country: varchar('country', { length: 100 }).notNull(),

  phoneNumber: varchar('phone_number', { length: 20 }),

  address: varchar('address', { length: 400 }),

  role: userRoleEnum('role').default('user').notNull(),

  createdAt: timestamp('created_at', {
    mode: 'string',
    withTimezone: true,
  }).defaultNow(),
});
