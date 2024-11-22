import { Navbar, NavbarBrand, NavbarContent } from '@nextui-org/navbar';

import { LogoLight } from '~/components/icon';
import { ThemeSwitcher } from '~/components/molecul/ThemeSwitcher';
import { UserDropdown } from '~/components/molecul/UserDropdown';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full w-full flex-col">
      <Navbar isBordered maxWidth="full" height={80}>
        <NavbarBrand>
          <LogoLight />
        </NavbarBrand>
        <NavbarContent as="div" justify="end">
          <ThemeSwitcher />
          <UserDropdown />
        </NavbarContent>
      </Navbar>
      <main className="relative shrink-0 grow bg-gray-100">{children}</main>
    </div>
  );
}
