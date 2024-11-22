'use client';

import { useRouter } from 'next/navigation';
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from '@nextui-org/react';
import { LogOut } from 'lucide-react';

import { Text } from '~/components/atom';
import { createSupabaseBrowserClient } from '~/lib/supabase/client';

export function UserDropdown() {
  const router = useRouter();

  async function handleLogout() {
    const supabase = await createSupabaseBrowserClient();

    await supabase.auth.signOut();
    router.replace('/login');
  }

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          as="button"
          showFallback
          name="John Doe"
          src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="User menu">
        <DropdownSection showDivider>
          <DropdownItem key="user" className="h-14 gap-1">
            <Text weight="semibold">Signed in as</Text>
            <Text className="text-gray-500">zoey@example.com</Text>
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
