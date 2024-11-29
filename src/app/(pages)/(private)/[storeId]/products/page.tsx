import { Metadata } from 'next';
import { Suspense } from 'react';
import { Button } from '@nextui-org/button';
import { Plus } from 'lucide-react';
import { Link } from 'nextjs13-progress';

import { Heading, Text } from '~/components/atom';
import { TableSkeleton } from '~/components/molecul/TableSkeleton';

interface ProductPageProps {
  params: { storeId: string };
}

export const metadata: Metadata = {
  title: 'Product | Crown',
};

export default function ProductPage({ params }: ProductPageProps) {
  console.log(params.storeId);
  return (
    <>
      <div className="flex items-end justify-between">
        <div className="space-y-1">
          <Heading component="h2" variant="title-4">
            Products
          </Heading>
          <Text size="small" className="text-gray-600">
            Manage products for your store
          </Text>
        </div>
        <Button
          as={Link}
          color="primary"
          className="font-medium"
          startContent={<Plus size={16} strokeWidth={2.5} />}
          href={`/${params.storeId}/products/create`}
        >
          Add Product
        </Button>
      </div>
      <Suspense fallback={<TableSkeleton />}>Table Product</Suspense>
    </>
  );
}
