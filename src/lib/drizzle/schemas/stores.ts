import { InferSelectModel, relations, sql } from 'drizzle-orm';
import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

import { sizeSchema } from './sizes';

export const stores = pgTable('stores', {
  id: uuid('id')
    .default(sql`uuid_generate_v4()`)
    .primaryKey()
    .notNull(),
  name: varchar('name', { length: 100 }).notNull(),
  userId: varchar('user_id', { length: 255 }).notNull(),
  storeId: varchar('unique_store', { length: 50 }),
  storeLogoUrl: varchar('store_logo_url', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const storeRelation = relations(stores, ({ many }) => ({
  sizes: many(sizeSchema, {
    relationName: 'StoreToSize',
  }),
}));

export type StoresDataType = InferSelectModel<typeof stores>;
