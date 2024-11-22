'use client';

import { Button } from '@nextui-org/button';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/dropdown';
import { Navbar, NavbarContent } from '@nextui-org/navbar';
import { Moon, Sun } from 'lucide-react';

import { SearchInput } from '~/components/molecul/SearchInput';

export function Header() {
  return (
    <Navbar
      position="static"
      height={80}
      maxWidth="xl"
      className="border-b border-b-gray-300"
    >
      <NavbarContent justify="start" className="max-w-[300px]">
        <SearchInput />
      </NavbarContent>
      <NavbarContent justify="end">
        <Dropdown>
          <DropdownTrigger>
            <Button isIconOnly variant="bordered">
              <Moon size={16} strokeWidth={2.5} />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Switch Theme">
            <DropdownItem
              key="Dark"
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
      </NavbarContent>
    </Navbar>
  );
}
