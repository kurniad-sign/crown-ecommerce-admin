export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center bg-primary-50">
      {children}
    </div>
  );
}
