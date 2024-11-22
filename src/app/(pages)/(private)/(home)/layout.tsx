import { Metadata } from 'next';

import { MainLayout } from '~/components/layouts';

export const metadata: Metadata = {
  title: 'Yout stores | Crown',
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MainLayout>{children}</MainLayout>;
}
