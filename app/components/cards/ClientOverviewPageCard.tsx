'use client'

import React, { useMemo } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import type { OrderItem } from '@/lib/types'

interface Client {
  id: string
  name: string
  email: string
  phone?: string
}

interface ClientListCardProps {
  clients?: OrderItem[]
}

const ClientOverviewPageCard: React.FC<ClientListCardProps> = ({ clients = [] }) => {
  // Extract unique clients from orders
  const uniqueClients = useMemo(() => {
    const clientMap = new Map<string, Client>()
    
    clients.forEach(order => {
      if (order.client_id && !clientMap.has(order.client_id)) {
        clientMap.set(order.client_id, {
          id: order.client_id,
          name: order.customer_name || 'Unknown Client',
          email: '/A',
          phone: order.customer_number || 'N/A',
        })
      }
    })

    return Array.from(clientMap.values()).slice(0, 5)
  }, [clients])

  const getInitial = (name: string) => {
    return name.charAt(0).toUpperCase()
  }

  const getAvatarColor = (name: string) => {
    const colors = [
      'bg-purple-600',
      'bg-blue-600',
      'bg-green-600',
      'bg-red-600',
      'bg-yellow-600',
      'bg-pink-600',
      'bg-indigo-600',
    ]
    const index = name.charCodeAt(0) % colors.length
    return colors[index]
  }

  if (uniqueClients.length === 0) {
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
        <div className="text-center py-8">
          <p className="text-zinc-500">No clients yet</p>
        </div>
      </div>
    )
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
          <tbody>
            {uniqueClients.map((client) => (
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
