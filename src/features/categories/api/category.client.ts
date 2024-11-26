import { InferResponseType } from 'hono';

import { honoClient } from '~/lib/hono/client';
import { CategorySchema } from '~/lib/validations/categories';

type AddCategory = {
  params: { storeId: string };
  payload: CategorySchema;
};

type GetCategoryResponse = InferResponseType<
  typeof honoClient.api.category.$get
>;

type PostCategoryResponse = InferResponseType<
  typeof honoClient.api.category.$post
>;

export type { GetCategoryResponse, PostCategoryResponse };

export async function getCategories(query: { storeId: string }) {
  const response = await honoClient.api.category.$get({
    query: { storeId: query.storeId },
  });

  if (!response.ok) {
    throw new Error('Error when fetching categories');
  }

  return await response.json();
}

export async function addCategory({ params, payload }: AddCategory) {
  return await honoClient.api.category.$post({
    query: { storeId: params.storeId },
    json: payload,
  });
}

export async function updateCategory(
  id: string,
  query: { storeId: string },
  payload: CategorySchema
) {
  return await honoClient.api.category[':id'].$patch({
    param: { id },
    query: { storeId: query.storeId },
    json: payload,
  });
}

export async function deleteCategory(id: string) {
  return await honoClient.api.category[':id'].$delete({
    param: { id },
  });
}
