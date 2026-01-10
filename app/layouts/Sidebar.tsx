'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  Package,
  CheckSquare,
  Calendar,
} from 'lucide-react'

const DASHBOARD_BASE = '/dashboard'

const Sidebar = () => {
  const pathname = usePathname()

  const menuItems = [
    { icon: LayoutDashboard, label: 'Overview', href: '' },
    { icon: ShoppingCart, label: 'Orders', href: '/orders' },
    { icon: Users, label: 'Clients', href: '/clients' },
    { icon: Package, label: 'Inventory', href: '/inventory' },
    { icon: CheckSquare, label: 'Tasks', href: '/tasks' },
    { icon: Calendar, label: 'Calendar', href: '/calendar' },
  ]

const isActiveRoute = (href: string) => {
  const fullPath = `${DASHBOARD_BASE}${href}`

  // Overview → exact match only
  if (href === '') {
    return pathname === DASHBOARD_BASE
  }

  // Others → match nested routes
  return pathname === fullPath || pathname.startsWith(`${fullPath}/`)
}



  return (
    <aside className="w-64 fixed top-0 left-0 bg-gray-50 h-screen   border-r border-gray-200">
      <div className="px-6 py-6 border-b border-gray-200">
        <h1 className="text-lg font-semibold">
          Thalia's Workspace
        </h1>
      </div>

      <nav className="px-4 py-6">
        <ul className="space-y-4">
          {menuItems.map(({ icon: Icon, label, href }) => {
            const active = isActiveRoute(href)  

            return (
              <li key={label}>
                <Link
                  href={`${DASHBOARD_BASE}${href}`}
                  className={`flex items-center gap-3  px-4 py-3 rounded-lg text-sm font-medium transition
                    ${
                      active
                        ? 'bg-gray-200 text-gray-900'
                        : 'text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  <Icon
                    size={20}
                    className={active ? 'text-gray-900' : 'text-gray-500'}
                  />
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
