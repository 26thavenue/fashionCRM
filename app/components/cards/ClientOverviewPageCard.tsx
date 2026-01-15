
'use client'

import React from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface Client {
  id: string
  name: string
  email: string
  phone?: string
  status?: 'Active' | 'Inactive'
  joinDate?: string
}

interface ClientListCardProps {
  clients?: Client[]
}

const defaultClients: Client[] = [
  {
    id: 'CLI-001',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 234 567 8900',
    status: 'Active',
    joinDate: '2023-06-15',
  },
  {
    id: 'CLI-002',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1 234 567 8901',
    status: 'Active',
    joinDate: '2023-08-20',
  },
  {
    id: 'CLI-003',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    phone: '+1 234 567 8902',
    status: 'Active',
    joinDate: '2023-10-12',
  },
  {
    id: 'CLI-004',
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    phone: '+1 234 567 8903',
    status: 'Active',
    joinDate: '2023-11-05',
  },
  {
    id: 'CLI-005',
    name: 'Emma Davis',
    email: 'emma@example.com',
    phone: '+1 234 567 8904',
    status: 'Active',
    joinDate: '2023-12-18',
  },
]

const ClientOverviewPageCard: React.FC<ClientListCardProps> = ({ clients = defaultClients }) => {
  const firstFive = clients.slice(0, 5)

  const getInitial = (name: string) => {
    return name.charAt(0).toUpperCase()
  }

  const getAvatarColor = (name: string) => {
    const colors = [
      'bg-zinc-500'
    ]
    const index = name.charCodeAt(0) % colors.length
    return colors[index]
  }

  return (
    <div className="bg-[#e6e5de] rounded-lg shadow-card border border-zinc-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[#1a1a1a]">View Clients</h3>
        <Link
          href="/dashboard/clients"
          className="text-sm text-zinc-600 hover:text-zinc-900 flex items-center gap-1"
        >
          View All
          <ChevronRight size={16} />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            {/* <tr className="border-b border-zinc-200">
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700">Avatar</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700">Name</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700">Email</th>
            </tr> */}
          </thead>
          <tbody>
            {firstFive.map((client) => (
              <tr
                key={client.id}
                className="border-b border-zinc-100 hover:bg-zinc-50 transition-colors"
              >
                <td className="py-3 px-4">
                  <div
                    className={`w-8 h-8 ${getAvatarColor(
                      client.name
                    )} rounded-full flex items-center justify-center text-white font-semibold text-xs`}
                  >
                    {getInitial(client.name)}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <Link
                    href={`/dashboard/clients/${client.id}`}
                    className="text-sm font-medium text-[#1a1a1a] hover:text-zinc-700"
                  >
                    {client.name}
                  </Link>
                </td>
                <td className="py-3 px-4">
                  <p className="text-xs text-zinc-600">{client.email}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default ClientOverviewPageCard
