import { Metadata } from 'next';
import { Suspense } from 'react';

import { Heading, Text } from '~/components/atom';
import { TableSkeleton } from '~/components/molecul/TableSkeleton';

import { ButtonCreateSize } from '~/features/sizes/components/ButtonCreateSize';
import { TableDataSize } from '~/features/sizes/components/TableDataSize';

interface SizePageProps {
  params: { storeId: string };
}

export const metadata: Metadata = {
  title: 'Sizes | Crown',
};

export default function SizePage({ params }: SizePageProps) {
  return (
    <div className="py-5">
      <div className="flex items-end justify-between">
        <div className="space-y-1">
          <Heading component="h2" variant="title-4">
            Sizes
          </Heading>
          <Text size="small" className="text-gray-600">
            Manage size product for your store.
          </Text>
        </div>
        <ButtonCreateSize />
      </div>
      <Suspense fallback={<TableSkeleton />}>
        <TableDataSize storeId={params.storeId} />
      </Suspense>
    </div>
  );
}
