'use client';

import { NextUIProvider } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

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
