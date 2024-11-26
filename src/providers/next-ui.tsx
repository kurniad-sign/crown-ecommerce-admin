'use client';

import { useRouter } from 'next/navigation';
import { NextUIProvider } from '@nextui-org/react';

export default function UIProviders({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  return (
    <NextUIProvider
      disableRipple
      className="h-dvh w-full"
      navigate={router.push}
    >
      {children}
    </NextUIProvider>
  );
}
