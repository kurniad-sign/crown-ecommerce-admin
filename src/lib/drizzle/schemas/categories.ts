import { InferSelectModel, relations, sql } from 'drizzle-orm';
import { AnyPgColumn, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';



import { stores } from './stores';
import { productSchema } from './products';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';


export const categoriesSchema = pgTable('categories', {
  id: uuid('id')
    .default(sql`uuid_generate_v4()`)
    .primaryKey(),
  parentId: uuid('parent_id')
    .default(sql`uuid_generate_v4()`)
    .references((): AnyPgColumn => categoriesSchema.id),
  name: varchar('name', { length: 100 }).notNull(),
  storeId: uuid('store_id')
    .default(sql`uuid_generate_v4()`)
    .references(() => stores.id),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().$onUpdate(() => new Date()),
});

export const categoryRelations = relations(categoriesSchema, ({ one, many }) => ({
  parent: one(categoriesSchema, {
    fields: [categoriesSchema.parentId],
    references: [categoriesSchema.id],
  }),
  products: many(productSchema, {
    relationName: 'CategoryToProduct'
  }),
}));

export const selectCategorySchema = createSelectSchema(categoriesSchema)
export const insertCategorySchema = createInsertSchema(categoriesSchema, {
  name: z.string().min(1, { message: 'Category name is required' }),
}).pick({
  name: true,
  parentId: true,
  
})
export const patchCategorySchema = insertCategorySchema.partial()

export type CategoryDataType = InferSelectModel<typeof categoriesSchema> & {
  parent?: CategoryDataType | null;
};