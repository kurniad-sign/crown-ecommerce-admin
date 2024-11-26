import { InferSelectModel, relations, sql } from 'drizzle-orm';
import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

import { categoriesSchema } from './categories';
import { colorSchema } from './colors';
import { productSchema } from './products';
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
  categories: many(categoriesSchema, {
    relationName: 'StoreToCategory',
  }),
  sizes: many(sizeSchema, {
    relationName: 'StoreToSize',
  }),
  colors: many(colorSchema, {
    relationName: 'StoreToColor',
  }),
  product: many(productSchema, {
    relationName: 'StoreToProduct',
  }),
}));

export type StoresDataType = InferSelectModel<typeof stores>;
