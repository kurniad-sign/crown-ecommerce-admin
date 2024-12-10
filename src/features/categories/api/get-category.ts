import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '~/lib/api-client';
import { type CategoryDataType } from '~/lib/drizzle/schemas/categories';
import { type QueryConfig } from '~/lib/react-query';

export interface GetCategoryParams {
  storeId?: string;
}

export const getCategory = (params: GetCategoryParams = {}) => {
  return api.get<CategoryDataType[]>('/category', {
    params,
  });
};

export const getCategoryQueryOptions = (params: GetCategoryParams) => {
  return queryOptions({
    queryKey: params.storeId ? ['get-category', params.storeId] : ['get-category'],
    queryFn: () => getCategory(params),
  });
};

type UseCategoryOptions = {
  apiConfig: {
    params: GetCategoryParams;
  };
  queryConfig?: QueryConfig<typeof getCategoryQueryOptions>;
};

export const useCategory = ({ queryConfig, apiConfig }: UseCategoryOptions) => {
  return useQuery({
    ...getCategoryQueryOptions(apiConfig.params),
    ...queryConfig,
  });
};
