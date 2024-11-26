import { Suspense } from 'react';

import { Heading, Text } from '~/components/atom';
import { TableSkeleton } from '~/components/molecul/TableSkeleton';

export default function ColorsPage() {
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
        Button
      </div>
      <Suspense fallback={<TableSkeleton />}>Table</Suspense>
    </div>
  );
}
