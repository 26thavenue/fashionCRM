// app/dashboard/layout.tsx
'use client'

import type { ReactNode } from 'react';
import Sidebar from '../layouts/Sidebar';
import { ProtectedLayout } from '../components/ProtectedLayout';
import { useAuth } from '../context/AuthContext';

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { logout } = useAuth();

  return (
    <ProtectedLayout>
      <div className="flex h-screen relative ">
        <Sidebar/>

        <main className=" ml-60 ">
          {children}
        </main>
      </div>
    </ProtectedLayout>
  );
}
