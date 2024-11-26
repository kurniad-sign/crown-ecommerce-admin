import { honoClient } from '~/lib/hono/client';
import { ColorValidationSchema } from '~/lib/validations/colors';

interface AddColorMethod {
  payload: ColorValidationSchema;
  query: { storeId: string };
}

interface UpdateColorMethod {
  id: string;
  payload: ColorValidationSchema;
  query: { storeId: string };
}

export async function addColor({ payload, query }: AddColorMethod) {
  const request = await honoClient.api.color.$post({
    json: payload,
    query: { storeId: query.storeId },
  });

  return await request.json();
}

export async function updateColor({ id, payload, query }: UpdateColorMethod) {
  const request = await honoClient.api.color[':id'].$patch({
    json: payload,
    param: { id },
    query: { storeId: query.storeId },
  });

  return await request.json();
}

export async function deleteColor(id: string) {
  const request = await honoClient.api.color[':id'].$delete({
    param: { id },
  });

  return await request.json();
}
