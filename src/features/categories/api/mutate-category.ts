import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '~/lib/api-client';
import {
  insertCategorySchema,
  patchCategorySchema,
  type CategoryDataType,
} from '~/lib/drizzle/schemas/categories';
import { MutationConfig } from '~/lib/react-query';

import { type GetCategoryParams, getCategoryQueryOptions } from './get-category';

export type InsertCategoryPayload = z.infer<typeof insertCategorySchema>;
export type PatchCategoryPayload = z.infer<typeof patchCategorySchema>;

interface MutateConfig {
  initialData?: CategoryDataType;
  payload?: InsertCategoryPayload | PatchCategoryPayload;
}

export interface MutateCategoryResponse {
  data: CategoryDataType;
  message: string;
}

export const mutateCategory = ({ initialData, payload }: MutateConfig) => {
  return !initialData
    ? api.post<MutateCategoryResponse>('/category', payload)
    : api.patch<MutateCategoryResponse>(`/category/${initialData.id}`, payload);
};

type UseMutateCategoryOptions = {
  apiConfig: {
    params: GetCategoryParams;
  };
  mutationConfig?: MutationConfig<typeof mutateCategory>;
};

export const useMutateCategory = ({
  apiConfig: { params },
  mutationConfig,
}: UseMutateCategoryOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getCategoryQueryOptions(params).queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: mutateCategory,
  });
};
