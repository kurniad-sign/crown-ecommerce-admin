import { honoClient } from '~/lib/hono/client';
import { SizeValidationSchema } from '~/lib/validations/size';

interface AddSizeMethod {
  payload: SizeValidationSchema;
  query: { storeId: string };
}

interface UpdateSizeMethod {
  id: string;
  payload: SizeValidationSchema;
  query: { storeId: string };
}

export async function addSize({ payload, query }: AddSizeMethod) {
  const request = await honoClient.api.size.$post({
    json: payload,
    query: { storeId: query.storeId },
  });

  return await request.json();
}

export async function updateSize({ id, payload, query }: UpdateSizeMethod) {
  const request = await honoClient.api.size[':id'].$patch({
    json: payload,
    param: { id },
    query: { storeId: query.storeId },
  });

  return await request.json();
}

export async function deleteSize(id: string) {
  const request = await honoClient.api.size[':id'].$delete({
    param: { id },
  });

  return await request.json();
}
