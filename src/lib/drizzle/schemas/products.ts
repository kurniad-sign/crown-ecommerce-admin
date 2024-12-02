import { relations, sql } from 'drizzle-orm';
import { integer, numeric, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';



import { categoriesSchema } from './categories';
import { productVariantSchema } from './product-variants';
import { stores } from './stores';


export const productSchema = pgTable('products', {
  id: uuid('id')
    .default(sql`uuid_generate_v4()`)
    .primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  description: text('description'),
  categoryId: uuid('category_id')
    .default(sql`uuid_generate_v4()`)
    .references(() => categoriesSchema.id)
    .notNull(),
  storeId: uuid('store_id')
    .default(sql`uuid_generate_v4()`)
    .references(() => stores.id),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  stock: integer('stock').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const productRelations = relations(productSchema, ({ one, many }) => ({
  category: one(categoriesSchema, {
    fields: [productSchema.categoryId],
    references: [categoriesSchema.id],
  }),
  store: one(stores, {
    fields: [productSchema.storeId],
    references: [stores.id],
  }),
  variants: many(productVariantSchema, {
    relationName: 'ProductToVariant',
  }),
}));