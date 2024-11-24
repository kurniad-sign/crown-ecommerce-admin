import { honoClient } from '~/lib/hono/client';
import { CategorySchema } from '~/lib/validations/categories';

type AddCategory = {
  params: { storeId: string },
  payload: CategorySchema
}

export async function addCategory({ params, payload }: AddCategory) {
  return await honoClient.api[':storeId'].category.$post({
    param: { storeId: params.storeId },
    json: payload
  })
}
