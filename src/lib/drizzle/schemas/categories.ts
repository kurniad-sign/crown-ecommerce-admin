import { InferSelectModel, relations, sql } from 'drizzle-orm';
import {
  AnyPgColumn,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

import { stores } from './stores';

export const categoriesSchema = pgTable(
  'categories',
  {
    id: uuid('id')
      .default(sql`uuid_generate_v7()`)
      .defaultRandom()
      .primaryKey()
      .notNull(),
    parentId: uuid('parent_id')
      .default(sql`uuid_generate_v7()`)
      .defaultRandom()
      .unique()
      .references((): AnyPgColumn => categoriesSchema.id),
    name: varchar('name', { length: 100 }).notNull(),
    storeId: uuid('store_id')
      .default(sql`uuid_generate_v7()`)
      .defaultRandom()
      .notNull()
      .references(() => stores.id),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  }
  // (table) => {
  //   return {
  //     parentReference: foreignKey({
  //       columns: [table.parentId],
  //       foreignColumns: [table.id],
  //       name: 'custom_parent_category',
  //     }),
  //   };
  // }
);

export const categoriesRelations = relations(categoriesSchema, ({ one }) => ({
  stores: one(stores),
}));

export type CategoryDataType = InferSelectModel<typeof categoriesSchema>;
