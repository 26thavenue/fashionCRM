'use client'

import React from 'react'
import { Calendar, AlertCircle, CheckCircle, Clock } from 'lucide-react'

interface Deadline {
  id: string
  title: string
  type: 'order' | 'inventory'
  dueDate: string
  status: 'overdue' | 'due-soon' | 'upcoming'
  priority: 'high' | 'medium' | 'low'
}

interface DeadlineOverviewProps {
  deadlines?: Deadline[]
}

const defaultDeadlines: Deadline[] = [
  {
    id: 'ORD-001',
    title: 'Order #1234 - Silk Dress Delivery',
    type: 'order',
    dueDate: '2026-01-15',
    status: 'due-soon',
    priority: 'high',
  },
  {
    id: 'INV-001',
    title: 'Inventory Restock - Cotton Fabric',
    type: 'inventory',
    dueDate: '2026-01-18',
    status: 'upcoming',
    priority: 'medium',
  },
  {
    id: 'ORD-002',
    title: 'Order #1235 - Lace Collection',
    type: 'order',
    dueDate: '2026-01-20',
    status: 'upcoming',
    priority: 'medium',
  },

]

const DeadlineOverview: React.FC<DeadlineOverviewProps> = ({ deadlines = defaultDeadlines }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'overdue':
        return 'bg-red-100 text-red-800'
      case 'due-soon':
        return 'bg-yellow-100 text-yellow-800'
      case 'upcoming':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-zinc-100 text-zinc-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'overdue':
        return <AlertCircle size={16} />
      case 'due-soon':
        return <Clock size={16} />
      case 'upcoming':
        return <CheckCircle size={16} />
      default:
        return <Calendar size={16} />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-4 border-l-red-500'
      case 'medium':
        return 'border-l-4 border-l-yellow-500'
      case 'low':
        return 'border-l-4 border-l-green-500'
      default:
        return 'border-l-4 border-l-zinc-500'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const sortedDeadlines = [...deadlines].sort((a, b) => {
    const dateA = new Date(a.dueDate).getTime()
    const dateB = new Date(b.dueDate).getTime()
    return dateA - dateB
  })

  return (
    <div className="bg-[#e6e5de] rounded-lg shadow-card border min-w-150 border-zinc-200 p-6 max-w-150">
      <div className="flex items-center gap-2 mb-4">
        <Calendar size={20} className="text-zinc-700" />
        <h3 className="text-xl font-semibold text-[#1a1a1a]">Upcoming Deadlines</h3>
      </div>

      <div className="space-y-3 max-h-[500px] overflow-y-auto">
        {sortedDeadlines.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-zinc-500">No deadlines scheduled</p>
          </div>
        ) : (
          sortedDeadlines.map((deadline) => (
            <div
              key={deadline.id}
              className={`p-3 border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors ${getPriorityColor(
                deadline.priority
              )}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        deadline.status
                      )}`}
                    >
                      {getStatusIcon(deadline.status)}
                      {deadline.status.replace('-', ' ').charAt(0).toUpperCase() +
                        deadline.status.slice(1).replace('-', ' ')}
                    </span>
                    <span className="text-xs text-zinc-500 font-medium">
                      {deadline.type === 'order' ? '📦 Order' : '📊 Inventory'}
                    </span>
                  </div>
                  <h4 className="text-sm font-medium text-[#1a1a1a] mb-1">{deadline.title}</h4>
                  <div className="flex items-center gap-1 text-xs text-zinc-600">
                    <Calendar size={14} />
                    <span>{formatDate(deadline.dueDate)}</span>
                  </div>
                </div>
                <div
                  className={`w-2 h-2 rounded-full flex-shrink-0 mt-1 ${
                    deadline.priority === 'high'
                      ? 'bg-red-500'
                      : deadline.priority === 'medium'
                        ? 'bg-yellow-500'
                        : 'bg-green-500'
                  }`}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default DeadlineOverview
