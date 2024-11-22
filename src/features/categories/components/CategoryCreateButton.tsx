'use client';

import { Button } from '@nextui-org/button';
import { Plus } from 'lucide-react';

export function CategoryCreateButton() {
  return (
    <>
      <Button
        color="primary"
        className="font-medium"
        startContent={<Plus size={16} strokeWidth={2.5} />}
      >
        Add Category
      </Button>
    </>
  );
}
