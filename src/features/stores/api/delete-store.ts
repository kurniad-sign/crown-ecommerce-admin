import { useMutation } from '@tanstack/react-query';

import { api } from '~/lib/api-client';
import { getQueryClient, type MutationConfig } from '~/lib/react-query';

import { getStoreQueryOptions } from './get-store';

export const deleteStore = (id: string) => {
  return api.delete(`/stores/${id}`);
};

type UseDeleteStoreOptions = {
  mutationConfig?: MutationConfig<typeof deleteStore>;
};

export const useDeleteStore = ({ mutationConfig }: UseDeleteStoreOptions) => {
  const queryClient = getQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getStoreQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: deleteStore,
  });
};
