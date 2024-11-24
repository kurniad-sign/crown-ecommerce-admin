import { Metadata } from 'next';
import { Suspense } from 'react';

import { Heading, Text } from '~/components/atom';

import { CategoryCreateButton } from '~/features/categories/components/CategoryCreateButton';
import { TableDataCategories } from '~/features/categories/components/TableData';
import { TableSkeleton } from '~/features/categories/components/TableSkeleton';

export const metadata: Metadata = {
  title: 'Categories | Crown',
};

export default function CategoryPage({
  params,
}: {
  params: { storeId: string };
}) {
  return (
    <div className="py-5">
      <div className="flex items-end justify-between">
        <div className="space-y-1">
          <Heading component="h2" variant="title-4">
            Category Page
          </Heading>
          <Text size="small" className="text-gray-600">
            Manage categories for your store product.
          </Text>
        </div>
        <CategoryCreateButton />
      </div>
      <Suspense fallback={<TableSkeleton />}>
        <TableDataCategories storeId={params.storeId} />
      </Suspense>
    </div>
  );
}
