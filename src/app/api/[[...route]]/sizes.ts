import { zValidator } from '@hono/zod-validator';
import { eq } from 'drizzle-orm';
import { Hono } from 'hono';
import { z } from 'zod';

import { db } from '~/lib/drizzle';
import { sizeSchema } from '~/lib/drizzle/schemas/sizes';
import {
  sizeQueryPostValidation,
  sizeValidationSchema,
} from '~/lib/validations/size';

const paramSchema = z.object({
  id: z.string().min(1),
});

const app = new Hono()
  .post(
    '/',
    zValidator('json', sizeValidationSchema),
    zValidator('query', sizeQueryPostValidation),
    async (context) => {
      const query = context.req.valid('query');
      const body = context.req.valid('json');
      const { name, value } = body;

      try {
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
          value,
          createdAt: new Date(),
          updatedAt: new Date(),
          storeId: storeById.id,
        };

        const newSize = await db.insert(sizeSchema).values(payload).returning();

        return context.json(
          {
            data: newSize[0],
            message: 'Size created successful',
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
  .patch(
    '/:id',
    zValidator('json', sizeValidationSchema),
    zValidator('query', sizeQueryPostValidation),
    async (context) => {
      const id = context.req.param('id');
      const query = context.req.valid('query');
      const body = context.req.valid('json');
      const { name, value } = body;

      try {
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
          id,
          name,
          value,
          updatedAt: new Date(),
          storeId: storeById.id,
        };

        const newSize = await db
          .update(sizeSchema)
          .set(payload)
          .where(eq(sizeSchema.id, id))
          .returning();

        return context.json(
          {
            data: newSize[0],
            message: 'Size updated successful',
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
  .delete('/:id', zValidator('param', paramSchema), async (context) => {
    try {
      const param = context.req.valid('param');

      const deletedSize = await db
        .delete(sizeSchema)
        .where(eq(sizeSchema.id, param.id))
        .returning({ id: sizeSchema.id });

      return context.json({
        id: deletedSize[0].id,
        message: 'Size deleted successfull',
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
  });

export default app;
