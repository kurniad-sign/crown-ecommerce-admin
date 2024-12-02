import { zValidator } from '@hono/zod-validator';
import { eq } from 'drizzle-orm';
import { createFactory } from 'hono/factory';
import * as HttpStatusCodes from 'stoker/http-status-codes';
import { z } from 'zod';

import { db } from '~/lib/drizzle';
import { insertStoreSchema, stores } from '~/lib/drizzle/schemas/stores';
import { createSupabaseServerClient } from '~/lib/supabase/server';
import { uniqueId } from '~/lib/unique-id';

const paramSchema = z.object({
  id: z.string().min(1),
});

const factory = createFactory();

export const getStore = factory.createHandlers(
  async (context) => {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (!user || error) {
      return context.json(
        { message: 'User not found' },
        HttpStatusCodes.NOT_FOUND
      );
    }

    const storesData = await db.query.stores.findMany({
      where: ({ userId }, { eq }) => eq(userId, user.id),
      orderBy: ({ createdAt }, { desc }) => [desc(createdAt)],
    });

    return context.json(
      storesData,
      HttpStatusCodes.OK
    );
  }
);

export const insertStore = factory.createHandlers(
  zValidator('json', insertStoreSchema),
  async (context) => {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (!user || error) {
      return context.json(
        { message: 'User not found' },
        HttpStatusCodes.NOT_FOUND
      );
    }

    const body = context.req.valid('json');

    const [insertedStore] = await db
      .insert(stores)
      .values({
        name: body.name,
        storeId: !body.storeId ? uniqueId() : body.storeId,
        userId: user.id,
      })
      .returning();

    return context.json(
      {
        data: insertedStore,
        message: 'Store created successfully',
      },
      HttpStatusCodes.OK
    );
  }
);

export const deleteStore = factory.createHandlers(
  zValidator('param', paramSchema),
  async (context) => {
    const supabase = await createSupabaseServerClient();

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (!user || error) {
      return context.json(
        { message: 'User not found' },
        HttpStatusCodes.NOT_FOUND
      );
    }
    const param = context.req.valid('param');

    const [deletedStore] = await db
      .delete(stores)
      .where(eq(stores.id, param.id))
      .returning({ id: stores.id });

    if (!deletedStore.id) {
      return context.json(
        { message: 'Id not found' },
        HttpStatusCodes.NOT_FOUND
      );
    }

    return context.body(null, HttpStatusCodes.NO_CONTENT);
  }
);
