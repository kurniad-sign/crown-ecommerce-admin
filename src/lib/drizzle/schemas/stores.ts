import { InferSelectModel, relations, sql } from 'drizzle-orm';
import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

import { categoriesSchema } from './categories';

export const stores = pgTable('stores', {
  id: uuid('id')
    .default(sql`uuid_generate_v7()`)
    .defaultRandom()
    .primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  userId: varchar('user_id', { length: 255 }).notNull(),
  storeId: varchar('storeId', { length: 255 }).unique(),
  storeLogoUrl: varchar('store_logo_url', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const storeRelations = relations(stores, ({ many }) => ({
  categories: many(categoriesSchema),
}));

export type StoresDataType = InferSelectModel<typeof stores>;
