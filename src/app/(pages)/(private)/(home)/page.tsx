import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { Heading } from '~/components/atom';

import { StoreList } from '~/features/stores/components/StoreList';
import { getStore } from '~/features/stores/api/get-store';
import { getQueryClient } from '~/lib/react-query';

export default async function Home() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['get-stores'],
    queryFn: getStore,
  });

  return (
    <div className="mt-10 max-w-6xl px-6 lg:mx-auto lg:p-0">
      <Heading component="h1" variant="title-3">
        Your Store
      </Heading>
      {/* <Suspense fallback={<StoreSkeleton />}> */}
      <HydrationBoundary state={dehydrate(queryClient)}>       
        <StoreList />
      </HydrationBoundary>
      {/* </Suspense> */}
    </div>
  );
}
