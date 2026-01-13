// app/dashboard/layout.tsx
import type { ReactNode } from 'react';
import Sidebar from '../layouts/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex h-screen relative ">
    <Sidebar/>

      <main className=" ml-64">
        {children}
      </main>
    </div>
  );
}
