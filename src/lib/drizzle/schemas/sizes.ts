import { InferSelectModel, relations, sql } from 'drizzle-orm';
import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

import { stores } from './stores';

export const sizeSchema = pgTable('sizes', {
  id: uuid('id')
    .default(sql`uuid_generate_v4()`)
    .primaryKey(),
  name: varchar('name', { length: 50 }).notNull(),
  value: varchar('value', { length: 50 }).notNull(),
  storeId: uuid('store_id')
    .default(sql`uuid_generate_v4()`)
    .references(() => stores.id),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const sizeSchemaRelation = relations(sizeSchema, ({ one }) => ({
  store: one(stores, {
    fields: [sizeSchema.storeId],
    references: [stores.id],
  }),
}));

export type SizeDataType = InferSelectModel<typeof sizeSchema>;
