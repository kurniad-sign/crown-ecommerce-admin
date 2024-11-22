import { InferSelectModel, relations, sql } from 'drizzle-orm';
import {
  foreignKey,
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
      .notNull()
      .primaryKey(),
    parentId: uuid('id')
      .default(sql`uuid_generate_v7()`)
      .defaultRandom()
      .unique(),
    name: varchar('name', { length: 100 }).notNull(),
    storeId: uuid('store_id')
      .default(sql`uuid_generate_v7()`)
      .defaultRandom()
      .notNull()
      .references(() => stores.id),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => {
    return {
      parentReference: foreignKey({
        columns: [table.parentId],
        foreignColumns: [table.id],
        name: 'custom_fk',
      }),
    };
  }
);

export const categoriesRelations = relations(categoriesSchema, ({ one }) => ({
  stores: one(stores),
}));

export type CategoryDataType = InferSelectModel<typeof categoriesSchema>;
