'use client'

import type { ReactNode } from 'react'
import { useState } from 'react'
import Sidebar from '../layouts/Sidebar'
import { ProtectedLayout } from '../components/ProtectedLayout'
import { Menu } from 'lucide-react'

export default function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <ProtectedLayout>
      <div className="flex h-screen relative overflow-hidden bg-white">

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/20 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`
            fixed inset-y-0 left-0 z-40
            transform transition-transform duration-300 ease-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            lg:relative lg:translate-x-0 lg:z-auto
          `}
        >
          <Sidebar onClose={() => setSidebarOpen(false)} />
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">

          {/* Mobile Top Bar */}
          <div className="lg:hidden border-b border-zinc-200 px-4 py-3 flex items-center gap-3 bg-white">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md hover:bg-zinc-100 transition-colors"
            >
              <Menu size={20} />
            </button>

            <span className="text-sm font-medium text-zinc-700">
              Dashboard
            </span>
          </div>

          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>

      </div>
    </ProtectedLayout>
  )
}
