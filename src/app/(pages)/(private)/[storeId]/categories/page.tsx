import { Heading, Text } from '~/components/atom';

import { CategoryCreateButton } from '~/features/categories/components/CategoryCreateButton';
import { TableCategories } from '~/features/categories/components/TableCategories';
import { TableDataCategories } from '~/features/categories/components/TableData';

export default function CategoryPage({ params }: { params: {storeId: string} }) {
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
      <TableDataCategories storeId={params.storeId} />
    </div>
  );
}
