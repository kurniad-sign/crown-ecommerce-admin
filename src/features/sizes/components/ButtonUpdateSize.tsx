'use client';

import { useState } from 'react';
import { Button } from '@nextui-org/button';
import { Tooltip } from '@nextui-org/tooltip';
import { Edit } from 'lucide-react';

import { type SizeDataType } from '~/lib/drizzle/schemas/sizes';
import { DrawerFormSize } from './DrawerFormSize';

interface ButtonUpdateSizeProps {
  size: SizeDataType;
}

export function ButtonUpdateSize(props: ButtonUpdateSizeProps) {
  const { size } = props;
  const [isOpenDrawer, setOpenDrawer] = useState(false);

  const onOpenDrawer = () => {
    setOpenDrawer(true);
  };

  const onCloseDrawer = () => {
    setOpenDrawer(false);
  };

  return (
    <>
      <Tooltip content="Edit size">
        <Button isIconOnly size="sm" variant="light" onPress={onOpenDrawer}>
          <Edit size={12} />
        </Button>
      </Tooltip>
      <DrawerFormSize
        isOpenDrawer={isOpenDrawer}
        onCloseDrawer={onCloseDrawer}
        initialData={size}
      />
    </>
  );
}
