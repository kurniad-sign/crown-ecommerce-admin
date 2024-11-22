import { Header } from './Header';
import { Sidebar } from './Sidebar';

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex h-full w-full">
      <Sidebar />
      <section className="relative z-[1] flex min-h-[380px] grow flex-col">
        <Header />
        <main className="relative h-full bg-gray-100 px-6 py-4">
          {children}
        </main>
      </section>
    </div>
  );
}
