'use client';

import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/breadcrumbs';
import { Button } from '@nextui-org/button';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'nextjs13-progress';

import { Text } from '~/components/atom';

export function BreadcrumbProduct() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2">
        <Button isIconOnly size="sm" variant="flat" onPress={handleBack}>
          <ChevronLeft size={14} strokeWidth={2} />
        </Button>
        <Text component="span" size="small">Go Back</Text>
      </div>
      <Breadcrumbs variant="solid">
        <BreadcrumbItem>Product</BreadcrumbItem>
        <BreadcrumbItem>Create</BreadcrumbItem>
      </Breadcrumbs>
    </div>
  );
}
