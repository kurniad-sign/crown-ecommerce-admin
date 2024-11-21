'use client';

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';
import { Moon, Sun } from 'lucide-react';

export function ThemeSwitcher() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly variant="bordered">
          <Moon size={16} strokeWidth={2.5} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Switch Theme">
        <DropdownItem
          key="dark"
          startContent={<Moon size={16} strokeWidth={2.5} />}
        >
          Dark
        </DropdownItem>
        <DropdownItem
          key="light"
          startContent={<Sun size={16} strokeWidth={2.5} />}
        >
          Light
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
