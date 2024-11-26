import { InferSelectModel, relations, sql } from 'drizzle-orm';
import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

import { stores } from './stores';

export const colorSchema = pgTable('colors', {
  id: uuid('id')
    .default(sql`uuid_generate_v4()`)
    .primaryKey()
    .notNull(),
  name: varchar('name', { length: 50 }).notNull(),
  hexCode: varchar('hex_code', { length: 7 }),
  storeId: uuid('store_id')
    .default(sql`uuid_generate_v4()`)
    .references(() => stores.id),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const colorSchemaRelation = relations(colorSchema, ({ one }) => ({
  store: one(stores, {
    fields: [colorSchema.storeId],
    references: [stores.id],
  }),
}));

export type ColorDataType = InferSelectModel<typeof colorSchema>;
