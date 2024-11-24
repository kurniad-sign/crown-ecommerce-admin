import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';

import { db } from '~/lib/drizzle';
import { categoriesSchema } from '~/lib/drizzle/schemas/categories';
import { createSupabaseServerClient } from '~/lib/supabase/server';
import { categorySchema } from '~/lib/validations/categories';

const app = new Hono().post(
  '/',
  zValidator('json', categorySchema),
  async (context) => {
    const supabase = await createSupabaseServerClient();

    const storeId = context.req.param('storeId');
    const body = context.req.valid('json');
    const { name, parentId } = body;

    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (!user || error) {
        return context.json(
          {
            error,
            message: 'User not found',
            statusCode: 404,
          },
          404
        );
      }

      // Check store by id exist
      const storeById = await db.query.stores.findFirst({
        where: (store, { eq }) => eq(store.id, storeId as string),
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
        storeId,
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
);

export default app;
