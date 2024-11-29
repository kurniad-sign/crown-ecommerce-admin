import { Heading, Text } from '~/components/atom';

import { BreadcrumbProduct } from '~/features/products/components/BreadcrumbProduct';
import { FormProduct } from '~/features/products/components/FormProduct';

interface ProductIdPageProps {
  params: {
    storeId: string;
    productId: string;
  };
}

export default function ProductIdPage({ params }: ProductIdPageProps) {
  console.log(params);
  return (
    <>
      <BreadcrumbProduct />
      <div className="space-y-1 mt-5">
        <Heading component="h2" variant="title-4">
          Create Product
        </Heading>
        <Text size="small" className="text-gray-600">
          Add a new product
        </Text>
      </div>
      <FormProduct />
    </>
  );
}
