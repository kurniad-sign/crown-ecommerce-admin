'use client';

import { Button } from '@nextui-org/react';
import { PanelLeftClose } from 'lucide-react';

import { LogoLight } from '~/components/icon';
import { CardUserDropdown } from '~/components/molecul/CardUserDropdown';

import { SidebarMenuItem } from './SidebarMenuItem';

export function Sidebar() {
  return (
    <aside className="relative flex w-72 min-w-[210px] max-w-[420px] shrink-0 border-r border-r-gray-300">
      <div className="flex h-full grow flex-col flex-wrap gap-5 p-4">
        <div className="flex w-full items-center justify-between px-2">
          <LogoLight />
          <Button isIconOnly variant="light" size="sm">
            <PanelLeftClose size={16} strokeWidth={2} />
          </Button>
        </div>
        <SidebarMenuItem />
        <CardUserDropdown />
      </div>
    </aside>
  );
}
