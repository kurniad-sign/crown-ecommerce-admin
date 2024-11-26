import { Metadata } from 'next';
import { Suspense } from 'react';

import { Heading, Text } from '~/components/atom';
import { TableSkeleton } from '~/components/molecul/TableSkeleton';

import { ButtonCreateColor } from '~/features/colors/components/ButttonCreateColor';
import { TableDataColor } from '~/features/colors/components/TableDataColor';

interface ColorsPageProps {
  params: { storeId: string };
}

export const metadata: Metadata = {
  title: 'Colors | Crown',
};

export default function ColorsPage({ params: { storeId } }: ColorsPageProps) {
  return (
    <div className="py-5">
      <div className="flex items-end justify-between">
        <div className="space-y-1">
          <Heading component="h2" variant="title-4">
            Colors
          </Heading>
          <Text size="small" className="text-gray-600">
            Manage color for your product store.
          </Text>
        </div>
        <ButtonCreateColor />
      </div>
      <Suspense fallback={<TableSkeleton />}>
        <TableDataColor storeId={storeId} />
      </Suspense>
    </div>
  );
}
