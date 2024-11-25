import { zValidator } from '@hono/zod-validator';
import { eq } from 'drizzle-orm';
import { Hono } from 'hono';
import { z } from 'zod';

import { db } from '~/lib/drizzle';
import { categoriesSchema } from '~/lib/drizzle/schemas/categories';
import { categorySchema } from '~/lib/validations/categories';

const app = new Hono()
  .get(
    '/',
    zValidator(
      'query',
      z.object({
        storeId: z.string(),
      })
    ),
    async (context) => {
      try {
        const query = context.req.valid('query');

        // Check store by id exist
        const storeById = await db.query.stores.findFirst({
          where: (store, { eq }) => eq(store.id, query.storeId as string),
        });

        if (!storeById) {
          return context.json(
            {
              message: 'Store not found',
              statusCode: 404,
            },
            404
          );
        }

        const categories = await db.query.categories.findMany({
          where: (category, { eq }) =>
            eq(category.storeId, query.storeId as string),
        });

        return context.json({
          data: categories,
          statusCode: 200,
        });
      } catch (error) {
        console.error(error);
        return context.json(
          {
            error: error,
            message: 'Internal Server Error',
            statusCode: 500,
          },
          500
        );
      }
    }
  )
  .post(
    '/',
    zValidator('json', categorySchema),
    zValidator(
      'query',
      z.object({
        storeId: z.string(),
      })
    ),
    async (context) => {
      const query = context.req.valid('query');
      const body = context.req.valid('json');
      const { name, parentId } = body;

      try {
        // Check store by id exist
        const storeById = await db.query.stores.findFirst({
          where: (store, { eq }) => eq(store.id, query.storeId as string),
        });

        if (!storeById) {
          return context.json(
            {
              message: 'Store not found',
              statusCode: 404,
            },
            404
          );
        }

        const payload = {
          name,
          parentId: parentId || null,
          createdAt: new Date(),
          updatedAt: new Date(),
          storeId: storeById.id,
        };

        const newCategory = await db
          .insert(categoriesSchema)
          .values(payload)
          .returning();

        return context.json(
          {
            data: newCategory[0],
            message: 'Category created successfully',
            statusCode: 200,
          },
          200
        );
      } catch (error) {
        console.error(error);
        return context.json(
          {
            error: error,
            message: 'Internal Server Error',
            statusCode: 500,
          },
          500
        );
      }
    }
  )
  .patch(
    '/:id',
    zValidator('json', categorySchema),
    zValidator(
      'query',
      z.object({
        storeId: z.string(),
      })
    ),
    async (context) => {
      const id = context.req.param('id');
      const query = context.req.valid('query');
      const body = context.req.valid('json');
      const { name, parentId } = body;

      try {
        // Check store by id exist
        const storeById = await db.query.stores.findFirst({
          where: (store, { eq }) => eq(store.id, query.storeId as string),
        });

        if (!storeById) {
          return context.json(
            {
              message: 'Store not found',
              statusCode: 404,
            },
            404
          );
        }

        const updateCategory = await db
          .update(categoriesSchema)
          .set({
            id,
            name,
            parentId: parentId || null,
            updatedAt: new Date(),
            storeId: storeById.id,
          })
          .where(eq(categoriesSchema.id, id))
          .returning();

        return context.json(
          {
            data: updateCategory[0],
            message: 'Category updated successfully',
            statusCode: 200,
          },
          200
        );
      } catch (error) {
        return context.json(
          {
            error: error,
            message: 'Internal Server Error',
            statusCode: 500,
          },
          500
        );
      }
    }
  )
  .delete(
    '/:id',
    zValidator(
      'param',
      z.object({
        id: z.string(),
      })
    ),
    async (context) => {
      try {
        const params = context.req.valid('param');

        const deletedCategory = await db
          .delete(categoriesSchema)
          .where(eq(categoriesSchema.id, params.id))
          .returning({ id: categoriesSchema.id });

        return context.json({
          id: deletedCategory[0].id,
          message: 'Category successfuly deleted',
          statusCode: 201,
        });
      } catch (error) {
        console.error(error);
        return context.json(
          {
            error: error,
            message: 'Internal Server Error',
            statusCode: 500,
          },
          500
        );
      }
    }
  );
export default app;
