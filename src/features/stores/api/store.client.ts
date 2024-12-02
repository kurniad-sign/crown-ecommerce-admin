import { z } from 'zod';

import {
  insertStoreSchema,
} from '~/lib/drizzle/schemas/stores';
import { honoClient } from '~/lib/hono/client';

type InsertStorePayload = z.infer<typeof insertStoreSchema>;

export async function addStore(payload: InsertStorePayload) {
  return await honoClient.api.stores.$post({
    json: payload,
  });
}

export async function deleteStore(id: string) {
  return await honoClient.api.stores[':id'].$delete({
    param: { id },
  });
}
