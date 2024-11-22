import { honoClient } from '~/lib/hono/client';
import { StoreSchema } from '~/lib/validations/store';

export async function addStore(payload: StoreSchema) {
  return await honoClient.api.stores.$post({
    json: payload,
  });
}

export async function deleteStore(id: string) {
  return await honoClient.api.stores[':id'].$delete({
    param: { id },
  });
}
