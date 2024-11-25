import { InferSelectModel, relations, sql } from 'drizzle-orm';
import {
  AnyPgColumn,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

import { stores } from './stores';

export const categoriesSchema = pgTable('categories', {
  id: uuid('id')
    .default(sql`uuid_generate_v4()`)
    .primaryKey()
    .notNull(),
  parentId: uuid('parent_id')
    .default(sql`uuid_generate_v4()`)
    .references((): AnyPgColumn => categoriesSchema.id),
  name: varchar('name', { length: 100 }).notNull(),
  storeId: uuid('store_id')
    .default(sql`uuid_generate_v4()`)
    .notNull()
    .references(() => stores.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const categoryRelations = relations(categoriesSchema, ({ one }) => ({
  parent: one(categoriesSchema, {
    fields: [categoriesSchema.parentId],
    references: [categoriesSchema.id],
  }),
}));

export type CategoryDataType = InferSelectModel<typeof categoriesSchema> & {
  parent?: CategoryDataType | null;
};
