import { Metadata } from 'next';

import AppLayout from '~/components/layouts/app-layout';

export const metadata: Metadata = {
  title: 'Dashboard | Crown',
};

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <AppLayout>{children}</AppLayout>;
}
