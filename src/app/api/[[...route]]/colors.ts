import { zValidator } from '@hono/zod-validator';
import { eq } from 'drizzle-orm';
import { Hono } from 'hono';
import { z } from 'zod';

import { db } from '~/lib/drizzle';
import { colorSchema } from '~/lib/drizzle/schemas/colors';
import {
  colorQueryPostValidation,
  colorValidationSchema,
} from '~/lib/validations/colors';

const paramSchema = z.object({
  id: z.string().min(1),
});

const app = new Hono()
  .post(
    '/',
    zValidator('json', colorValidationSchema),
    zValidator('query', colorQueryPostValidation),
    async (context) => {
      const query = context.req.valid('query');
      const body = context.req.valid('json');
      const { name, hex_code } = body;

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
          hex_code,
          createdAt: new Date(),
          updatedAt: new Date(),
          storeId: storeById.id,
        };

        const newColor = await db
          .insert(colorSchema)
          .values(payload)
          .returning();

        return context.json(
          {
            data: newColor[0],
            message: 'Color created successful',
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
    zValidator('json', colorValidationSchema),
    zValidator('query', colorQueryPostValidation),
    zValidator('param', paramSchema),
    async (context) => {
      const param = context.req.valid('param');
      const query = context.req.valid('query');
      const body = context.req.valid('json');
      const { name, hex_code } = body;
      const { id } = param;

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
          hex_code,
          updatedAt: new Date(),
          storeId: storeById.id,
        };

        const updateColor = await db
          .update(colorSchema)
          .set(payload)
          .where(eq(colorSchema.id, id))
          .returning();

        return context.json(
          {
            data: updateColor[0],
            message: 'Color updated successful',
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

      const deletedColor = await db
        .delete(colorSchema)
        .where(eq(colorSchema.id, param.id))
        .returning({ id: colorSchema.id });

      return context.json({
        id: deletedColor[0].id,
        message: 'Color deleted successfull',
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
