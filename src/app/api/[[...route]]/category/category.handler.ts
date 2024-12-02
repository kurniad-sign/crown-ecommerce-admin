import { zValidator } from '@hono/zod-validator';
import { eq } from 'drizzle-orm';
import { createFactory } from 'hono/factory';
import * as HttpStatusCode from 'stoker/http-status-codes';
import { z } from 'zod';

import { db } from '~/lib/drizzle';
import {
  categoriesSchema,
  insertCategorySchema,
  patchCategorySchema,
} from '~/lib/drizzle/schemas/categories';

const querySchema = z.object({
  storeId: z.string().min(1, { message: 'Store id is required' }),
});

const paramSchema = z.object({
  id: z.string().min(1, { message: 'Category id is required' }),
});

const factory = createFactory();

export const getCategory = factory.createHandlers(
  zValidator('query', querySchema),
  async (context) => {
    try {
      const query = context.req.valid('query');
      const storeById = await db.query.stores.findFirst({
        where: (store, { eq }) => eq(store.id, query.storeId as string),
      });

      if (!storeById) {
        return context.json(
          { message: 'Store not found', statusCode: HttpStatusCode.NOT_FOUND },
          HttpStatusCode.NOT_FOUND
        );
      }

      const categories = await db.query.categories.findMany({
        where: (category, { eq }) =>
          eq(category.storeId, query.storeId as string),
      });

      return context.json({ categories }, HttpStatusCode.OK);
    } catch (error) {
      console.error(error);
      return context.json(
        {
          message: 'Internal Server Error',
          statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
        },
        HttpStatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }
);

export const insertCategory = factory.createHandlers(
  zValidator('query', querySchema),
  zValidator('json', insertCategorySchema),
  async (context) => {
    try {
      const query = context.req.valid('query');
      const body = context.req.valid('json');
      const storeById = await db.query.stores.findFirst({
        where: (store, { eq }) => eq(store.id, query.storeId),
      });

      if (!storeById) {
        return context.json(
          { message: 'Store not found', statusCode: HttpStatusCode.NOT_FOUND },
          HttpStatusCode.NOT_FOUND
        );
      }
      
      const [insertedCategory] = await db
        .insert(categoriesSchema)
        .values({
          name: body.name,
          parentId: body.parentId,
          storeId: storeById.id,
        })
        .returning();

      return context.json(
        {
          data: insertedCategory,
          message: 'Category created successfully',
        },
        HttpStatusCode.OK
      );
    } catch (error) {
      console.error(error);
      return context.json(
        {
          message: 'Internal Server Error',
          statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
        },
        HttpStatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }
);

export const patchCategory = factory.createHandlers(
  zValidator('param', paramSchema),
  zValidator('query', querySchema),
  zValidator('json', patchCategorySchema),
  async (context) => {
    try {
      const body = context.req.valid('json');
      const param = context.req.valid('param');
      const query = context.req.valid('query');

      const storeById = await db.query.stores.findFirst({
        where: (store, { eq }) => eq(store.id, query.storeId),
      });

      if (!storeById) {
        return context.json(
          { message: 'Store not found', statusCode: HttpStatusCode.NOT_FOUND },
          HttpStatusCode.NOT_FOUND
        );
      }

      const [updatedCategory] = await db
        .update(categoriesSchema)
        .set(body)
        .where(eq(categoriesSchema.id, param.id))
        .returning();

      return context.json(
        {
          data: updatedCategory,
          message: 'Category updated successfully',
        },
        HttpStatusCode.OK
      );
    } catch (error) {
      console.error(error);
      return context.json(
        {
          message: 'Internal Server Error',
          statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
        },
        HttpStatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }
);

export const removeCategory = factory.createHandlers(
  zValidator('param', paramSchema),
  async (context) => {
    try {
      const params = context.req.valid('param');

      const [deletedCategory] = await db
        .delete(categoriesSchema)
        .where(eq(categoriesSchema.id, params.id))
        .returning({ id: categoriesSchema.id });

      if (!deletedCategory) {
        return context.json(
          {
            message: 'Id nof found',
          },
          HttpStatusCode.NOT_FOUND
        );
      }

      return context.body(null, HttpStatusCode.NO_CONTENT);
    } catch (error) {
      console.error(error);
      return context.json(
        {
          message: 'Internal Server Error',
          statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
        },
        HttpStatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }
);
