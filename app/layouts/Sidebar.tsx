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
  Settings,
  CalendarClock, 
  History,      
  CalendarRange,
  LogOut
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const DASHBOARD_BASE = '/dashboard'

const Sidebar = () => {
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
    { icon: CalendarClock, label: 'Today', href: '/work/today' },
    { icon: History, label: 'Yesterday', href: '/work/yesterday' },
    { icon: CalendarRange, label: 'This Week', href: '/work/week' },
  ]

  const isActiveRoute = (href: string) => {
    const fullPath = `${DASHBOARD_BASE}${href}`
    if (href === '') return pathname === DASHBOARD_BASE
    return pathname === fullPath || pathname.startsWith(`${fullPath}/`)
  }

  const SidebarItem = ({ icon: Icon, label, href }: { icon: any, label: string, href: string }) => {
    const active = isActiveRoute(href)
    return (
      <li>
        <Link
          href={`${DASHBOARD_BASE}${href}`}
          className={`
            group flex text-primary items-center gap-2.5 px-2.5 py-1 min-h-7.5 text-sm font-medium rounded-md transition-colors duration-200 ease-in-out
            ${active
              ? 'bg-zinc-300/60 text-zinc-900'
              : 'text-zinc-500 hover:bg-zinc-100/40 hover:text-zinc-900'
            }
          `}
        >
          <Icon
            size={18}
            strokeWidth={2}
            className={`transition-colors ${active ? 'text-zinc-900' : 'text-zinc-400 group-hover:text-zinc-600'}`}
          />
          {label}
        </Link>
      </li>
    )
  }

  return (
    <aside className="w-60 fixed top-0 left-0 bg-[#F7F7F5] h-screen border-r border-zinc-200 flex flex-col ">
      
      {/* HEADER */}
      <div className="px-4 py-3 mb-2 hover:bg-zinc-200/50 cursor-pointer transition-colors duration-200">
        <div className="flex items-center gap-2">
           <div className="w-5 h-5 bg-purple-600 rounded text-[12px] text-white flex items-center justify-center font-bold">
             T
           </div>
           <h1 className="text-sm font-medium text-zinc-700 truncate">
            Thalia's Workspace
           </h1>
        </div>
      </div>

      {/* SCROLLABLE NAV AREA */}
      <nav className="flex-1 overflow-y-auto px-2 space-y-6">
        
        {/* SECTION 1: Main Navigation */}
        <div>
            <ul className="space-y-[1px]">
                {mainItems.map((item) => (
                    <SidebarItem key={item.label} {...item} />
                ))}
            </ul>
        </div>

        {/* SECTION 2: Work (Time Based) */}
        <div>
            {/* Notion Style Section Header */}
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

      {/* BOTTOM: Settings & Logout */}
      <div className="px-2 py-4 border-t border-zinc-200/50 mt-auto space-y-2">
           <Link href={`${DASHBOARD_BASE}/settings`} className="flex items-center gap-2.5 px-2.5 py-1 min-h-[30px] text-sm font-medium text-zinc-500 rounded-md hover:bg-zinc-200/40 hover:text-zinc-900 transition-colors">
              <Settings size={18} className="text-zinc-400"/>
              Settings
           </Link>
           <button 
             onClick={() => {
               logout()
               router.push('/login')
             }}
             className="w-full flex items-center gap-2.5 px-2.5 py-1 min-h-[30px] text-sm font-medium text-zinc-500 rounded-md hover:bg-red-100/50 hover:text-red-700 transition-colors cursor-pointer"
           >
              <LogOut size={18} className="text-zinc-400"/>
              Logout
           </button>
      </div>
    </aside>
  )
}

export default Sidebar