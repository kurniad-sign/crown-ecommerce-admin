import { Suspense } from 'react';

import { Heading } from '~/components/atom';

import { StoreList } from '~/features/stores/components/StoreList';
import { StoreSkeleton } from '~/features/stores/components/StoreSkeleton';

export default function Home() {
  return (
    <div className="mt-10 max-w-6xl px-6 lg:mx-auto lg:p-0">
      <Heading component="h1" variant="title-3">
        Your Store
      </Heading>
      <Suspense fallback={<StoreSkeleton />}>
        <StoreList />
      </Suspense>
    </div>
  );
}
