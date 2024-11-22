export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-primary-50 flex h-dvh w-full flex-col items-center justify-center">
      {children}
    </div>
  );
}
