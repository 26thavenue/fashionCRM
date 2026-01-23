'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  Package,
  CheckSquare,
  Calendar,
  CalendarClock,
  History,
  CalendarRange,
  LogOut,
  X
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const DASHBOARD_BASE = '/dashboard'

const Sidebar = ({ onClose }: { onClose?: () => void }) => {
  const pathname = usePathname()
  const router = useRouter()
  const { logout } = useAuth()

  const mainItems = [
    { icon: LayoutDashboard, label: 'Overview', href: '' },
    { icon: ShoppingCart, label: 'Orders', href: '/orders' },
    { icon: Users, label: 'Clients', href: '/clients' },
    { icon: Package, label: 'Inventory', href: '/inventory' },
    { icon: CheckSquare, label: 'Tasks', href: '/tasks' },
    { icon: Calendar, label: 'Calendar', href: '/calendar' },
  ]

  const workItems = [
    { icon: CalendarClock, label: 'Today', href: '/today' },
    { icon: History, label: 'Yesterday', href: '/yesterday' },
    { icon: CalendarRange, label: 'This Week', href: '/week' },
  ]

  const isActiveRoute = (href: string) => {
    const fullPath = `${DASHBOARD_BASE}${href}`
    if (href === '') return pathname === DASHBOARD_BASE
    return pathname === fullPath || pathname.startsWith(`${fullPath}/`)
  }

  const SidebarItem = ({
    icon: Icon,
    label,
    href,
  }: {
    icon: any
    label: string
    href: string
  }) => {
    const active = isActiveRoute(href)

    return (
      <li>
        <Link
          href={`${DASHBOARD_BASE}${href}`}
          onClick={onClose}
          className={`
            group flex items-center gap-2.5 px-2.5 py-1 min-h-[30px]
            text-sm font-medium rounded-md transition-colors
            ${active
              ? 'bg-zinc-300/60 text-zinc-900'
              : 'text-zinc-500 hover:bg-zinc-100/40 hover:text-zinc-900'
            }
          `}
        >
          <Icon
            size={18}
            strokeWidth={2}
            className={`flex-shrink-0 ${active
                ? 'text-zinc-900'
                : 'text-zinc-400 group-hover:text-zinc-600'
              }`}
          />
          <span>{label}</span>
        </Link>
      </li>
    )
  }

  return (
    <aside className="w-60 h-screen bg-[#F7F7F5] border-r border-zinc-200 flex flex-col overflow-hidden">

      {/* HEADER */}
      <div className="px-4 py-3 flex items-center justify-between gap-2 border-b border-zinc-200/50">

        <div className="flex items-center gap-2 min-w-0">
          <div className="w-5 h-5 bg-purple-600 rounded text-[12px] text-white flex items-center justify-center font-bold flex-shrink-0">
            T
          </div>

          <h1 className="text-sm font-medium text-zinc-700 truncate">
            Thalia&apos;s Workspace
          </h1>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-md hover:bg-zinc-200/50 transition-colors"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* NAV */}
      <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-6">

        <ul className="space-y-[1px]">
          {mainItems.map((item) => (
            <SidebarItem key={item.label} {...item} />
          ))}
        </ul>

        <div>
          <h3 className="px-2 text-xs font-semibold text-zinc-400 mb-1 uppercase tracking-wider">
            Work
          </h3>
          <ul className="space-y-[1px]">
            {workItems.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </ul>
        </div>

      </nav>

      {/* FOOTER */}
      <div className="px-4 py-4 border-t border-zinc-200/50">
        <button
          onClick={() => {
            logout()
            router.push('/auth/login')
          }}
          className="w-full flex items-center gap-2.5 px-2.5 py-1 min-h-[30px]
                     text-sm font-medium text-zinc-500 rounded-md
                     hover:bg-red-100/50 hover:text-red-700 transition-colors"
        >
          <LogOut size={18} className="text-zinc-400 flex-shrink-0" />
          <span>Logout</span>
        </button>
      </div>

    </aside>
  )
}

export default Sidebar
