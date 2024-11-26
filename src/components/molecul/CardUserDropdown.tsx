'use client';

import { useRouter } from 'next/navigation';
import {
  Card,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  User,
} from '@nextui-org/react';
import { ChevronsUpDown, LogOut, Settings } from 'lucide-react';

import { createSupabaseBrowserClient } from '~/lib/supabase/client';

import { Text } from '../atom';

export function CardUserDropdown() {
  const router = useRouter();
  async function handleLogout() {
    const supabase = await createSupabaseBrowserClient();

    await supabase.auth.signOut();
    router.replace('/login');
  }

  return (
    <Dropdown placement="top-start">
      <DropdownTrigger>
        <Card
          isPressable
          className="w-full flex-row items-center justify-between bg-background p-2 shadow-none hover:bg-gray-200"
        >
          <User
            name="John Doe"
            description="johndoe@gmail.com"
            avatarProps={{
              src: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
            }}
          />
          <ChevronsUpDown size={16} />
        </Card>
      </DropdownTrigger>
      <DropdownMenu aria-label="User menu">
        <DropdownSection showDivider>
          <DropdownItem key="settings" startContent={<Settings size={16} />}>
            Settings
          </DropdownItem>
        </DropdownSection>
        <DropdownItem
          key="logout"
          color="danger"
          startContent={<LogOut size={16} strokeWidth={2.5} />}
          onPress={handleLogout}
        >
          <Text component="span" weight="medium">
            Logout
          </Text>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
