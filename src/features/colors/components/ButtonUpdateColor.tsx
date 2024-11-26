'use client';

import { useState } from 'react';
import { Button } from '@nextui-org/button';
import { Tooltip } from '@nextui-org/tooltip';
import { Edit } from 'lucide-react';

import { type ColorDataType } from '~/lib/drizzle/schemas/colors';

import { DrawerFormColor } from './DrawerFormColor';

interface ButtonUpdateColorProps {
  color: ColorDataType;
}

export function ButtonUpdateColor(props: ButtonUpdateColorProps) {
  const { color } = props;
  const [isOpenDrawer, setOpenDrawer] = useState(false);

  const onOpenDrawer = () => {
    setOpenDrawer(true);
  };

  const onCloseDrawer = () => {
    setOpenDrawer(false);
  };

  return (
    <>
      <Tooltip content="Edit color">
        <Button isIconOnly size="sm" variant="light" onPress={onOpenDrawer}>
          <Edit size={12} />
        </Button>
      </Tooltip>
      <DrawerFormColor
        isOpenDrawer={isOpenDrawer}
        onCloseDrawer={onCloseDrawer}
        initialData={color}
      />
    </>
  );
}
