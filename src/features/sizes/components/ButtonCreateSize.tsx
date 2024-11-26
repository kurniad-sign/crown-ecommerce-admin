'use client';

import { useState } from 'react';
import { Button } from '@nextui-org/button';
import { Plus } from 'lucide-react';

import { DrawerFormSize } from './DrawerFormSize';

export function ButtonCreateSize() {
  const [isOpenDrawer, setOpenDrawer] = useState(false);

  const onOpenDrawer = () => {
    setOpenDrawer(true);
  };

  const onCloseDrawer = () => {
    setOpenDrawer(false);
  };

  return (
    <>
      <Button
        color="primary"
        className="font-medium"
        startContent={<Plus size={16} strokeWidth={2.5} />}
        onPress={onOpenDrawer}
      >
        Add Size
      </Button>
      <DrawerFormSize
        isOpenDrawer={isOpenDrawer}
        onCloseDrawer={onCloseDrawer}
      />
    </>
  );
}
