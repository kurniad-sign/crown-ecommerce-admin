import { relations, sql } from 'drizzle-orm';
import { integer, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';



import { colorSchema } from './colors';
import { productSchema } from './products';
import { sizeSchema } from './sizes';


export const productVariantSchema = pgTable('product_variants', {
  id: uuid('id')
    .default(sql`uuid_generate_v4()`)
    .primaryKey(),
  sizeId: uuid('size_id')
    .default(sql`uuid_generate_v4()`)
    .references(() => sizeSchema.id)
    .notNull(),
  colorId: uuid('color_id')
    .default(sql`uuid_generate_v4()`)
    .references(() => colorSchema.id)
    .notNull(),
  productId: uuid('product_id')
    .default(sql`uuid_generate_v4()`)
    .references(() => productSchema.id)
    .notNull(),
  stock: integer('stock').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const productVariantRelations = relations(
  productVariantSchema,
  ({ one }) => ({
    size: one(sizeSchema, {
      fields: [productVariantSchema.sizeId],
      references: [sizeSchema.id],
    }),
    color: one(colorSchema, {
      fields: [productVariantSchema.colorId],
      references: [colorSchema.id],
    }),
    product: one(productSchema, {
      fields: [productVariantSchema.productId],
      references: [productSchema.id],
    }),
  })
);