import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '~/lib/api-client';
import {
  insertStoreSchema,
  type StoresDataType,
} from '~/lib/drizzle/schemas/stores';
import { MutationConfig } from '~/lib/react-query';

import { getStoreQueryOptions } from './get-store';

type InsertStorePayload = z.infer<typeof insertStoreSchema>;

export interface CreateStoreResponse {
  data: StoresDataType;
  message: string;
}

export const createStore = (payload: InsertStorePayload) => {
  return api.post<CreateStoreResponse>('/stores', payload);
};

type UseCreateStoreOptions = {
  mutationConfig?: MutationConfig<typeof createStore>;
};

export const useCreateStore = ({
  mutationConfig,
}: UseCreateStoreOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getStoreQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createStore,
  });
};
