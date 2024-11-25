'use client';

import { useState } from 'react';
import { Button } from '@nextui-org/button';
import { Tooltip } from '@nextui-org/tooltip';
import { Edit } from 'lucide-react';

import { DrawerFormCategory } from './DrawerFormCategory';
import { type TableCategory } from './TableCategories';

interface CategoryUpdateButtonProps {
  category: TableCategory;
}

export function CategoryUpdateButton(props: CategoryUpdateButtonProps) {
  const { category } = props;
  const [isOpenDrawer, setOpenDrawer] = useState(false);

  const onOpenDrawer = () => {
    setOpenDrawer(true);
  };

  const onCloseDrawer = () => {
    setOpenDrawer(false);
  };

  return (
    <>
      <Tooltip content="Edit category">
        <Button isIconOnly size="sm" variant="light" onPress={onOpenDrawer}>
          <Edit size={12} />
        </Button>
      </Tooltip>
      <DrawerFormCategory
        isOpenDrawer={isOpenDrawer}
        onCloseDrawer={onCloseDrawer}
        initialData={category}
      />
    </>
  );
}
