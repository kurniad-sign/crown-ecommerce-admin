import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '~/lib/api-client';
import { type StoresDataType } from '~/lib/drizzle/schemas/stores';
import { type QueryConfig } from '~/lib/react-query';

export const getStore = () => {
  return api.get<StoresDataType[]>('/stores');
};

export const getStoreQueryOptions = () => {
  return queryOptions({
    queryKey: ['get-stores'],
    queryFn: () => getStore(),
  });
};

type UseStoreOptions = {
  queryConfig?: QueryConfig<typeof getStoreQueryOptions>;
};

export const useStore = ({ queryConfig }: UseStoreOptions = {}) => {
  return useQuery({
    ...getStoreQueryOptions(),
    ...queryConfig,
  });
};
