'use client'

import React, { useState } from 'react'
import { CheckCircle2, Clock, ShoppingBag, AlertCircle, TrendingUp, CheckSquare, } from 'lucide-react'
import DataCard from '@/app/components/DataCard'

interface Task {
  id: string
  title: string
  priority: 'high' | 'medium' | 'low'
  status: 'pending' | 'in-progress' | 'completed'
  dueTime: string
}

interface Order {
  id: string
  orderNumber: string
  client: string
  status: 'pending' | 'confirmed' | 'shipped'
  amount: number
  receivedDate?: string
  dueDate?: string
}

const TodayPage: React.FC = () => {
  const [orderTab, setOrderTab] = useState<'due' | 'received'>('due')
  // Sample data for today
  const tasksToday: Task[] = [
    {
      id: '1',
      title: 'Review new client proposals',
      priority: 'high',
      status: 'in-progress',
      dueTime: '2:00 PM',
    },
    {
      id: '2',
      title: 'Update inventory stock levels',
      priority: 'medium',
      status: 'pending',
      dueTime: '4:00 PM',
    },
    {
      id: '3',
      title: 'Confirm order shipments',
      priority: 'high',
      status: 'pending',
      dueTime: '3:00 PM',
    },
    {
      id: '4',
      title: 'Process returns',
      priority: 'low',
      status: 'completed',
      dueTime: '1:00 PM',
    },
  ]

  const ordersReceivedToday: Order[] = [
    {
      id: '1',
      orderNumber: 'ORD-2026-001',
      client: 'Sarah Fashion Co.',
      status: 'pending',
      amount: 2500,
      receivedDate: '2026-01-16 09:30 AM',
    },
    {
      id: '2',
      orderNumber: 'ORD-2026-002',
      client: 'Metropolitan Boutique',
      status: 'confirmed',
      amount: 3200,
      receivedDate: '2026-01-16 11:45 AM',
    },
    {
      id: '3',
      orderNumber: 'ORD-2026-003',
      client: 'Vintage Collections Ltd.',
      status: 'pending',
      amount: 1800,
      receivedDate: '2026-01-16 02:15 PM',
    },
  ]

  const ordersDueToday: Order[] = [
    {
      id: '1',
      orderNumber: 'ORD-2026-0012',
      client: 'Elite Fashion Hub',
      status: 'shipped',
      amount: 4500,
      dueDate: '2026-01-16 05:00 PM',
    },
    {
      id: '2',
      orderNumber: 'ORD-2026-0013',
      client: 'Downtown Style Studio',
      status: 'confirmed',
      amount: 2100,
      dueDate: '2026-01-16 06:30 PM',
    },
  ]

  const getTaskStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 size={16} className="text-green-600" />
      case 'in-progress':
        return <Clock size={16} className="text-blue-600" />
      default:
        return <AlertCircle size={16} className="text-yellow-600" />
    }
  }

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50'
      case 'in-progress':
        return 'bg-blue-50'
      default:
        return 'bg-yellow-50'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-4 border-l-red-500'
      case 'medium':
        return 'border-l-4 border-l-yellow-500'
      default:
        return 'border-l-4 border-l-green-500'
    }
  }

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case 'shipped':
        return 'bg-green-100 text-green-800'
      case 'confirmed':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-yellow-100 text-yellow-800'
    }
  }

  const completedTasks = tasksToday.filter((t) => t.status === 'completed').length
  const totalOrders = ordersReceivedToday.length + ordersDueToday.length

  return (
    <div className="p-6 bg-secondary min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-800 mb-2">This Week's Overview</h1>
        <p className="text-zinc-600">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <DataCard
          header="Tasks Today"
          value={tasksToday.length}
          icon={CheckCircle2}
          description={`${completedTasks} completed`}
        />
        <DataCard
          header="Orders Received"
          value={ordersReceivedToday.length}
          icon={ShoppingBag}
          description={`Total: $${ordersReceivedToday.reduce((sum, o) => sum + o.amount, 0).toLocaleString()}`}
        />
        <DataCard
          header="Orders Due"
          value={ordersDueToday.length}
          icon={TrendingUp}
          description={`Total: $${ordersDueToday.reduce((sum, o) => sum + o.amount, 0).toLocaleString()}`}
        />
        <DataCard
          header="Total Orders"
          value={totalOrders}
          icon={ShoppingBag}
          description={`$${(ordersReceivedToday.reduce((sum, o) => sum + o.amount, 0) + ordersDueToday.reduce((sum, o) => sum + o.amount, 0)).toLocaleString()} value`}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid w-full gap-6">
        {/* Tasks Section */}
        <div>
          <div className=" py-6">
            <div className="flex items-center gap-2 mb-4">
                <CheckSquare className='w-6 h-6 text-zinc-700'/>
              <h2 className="text-2xl font-semibold text-[#1a1a1a]">
                 Tasks</h2>
            </div>

            <div className="space-y-2">
              {tasksToday.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-zinc-500">No tasks scheduled</p>
                </div>
              ) : (
                tasksToday.map((task, index) => (
                  <div
                    key={task.id}
                    className="flex items-center gap-3 p-4 bg-secondary border border-zinc-200 rounded-lg hover:shadow-md transition-all"
                  >
                    {/* Number Circle */}
                    <div className="flex-shrink-0 w-8 h-8 bg-zinc-800 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                      {index + 1}
                    </div>

                    {/* Task Details */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {getTaskStatusIcon(task.status)}
                        <h3 className="text-sm font-medium text-[#1a1a1a]">{task.title}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded ${
                            task.priority === 'high'
                              ? 'bg-red-100 text-red-700'
                              : task.priority === 'medium'
                                ? 'bg-yellow-100 text-amber-700'
                                : 'bg-green-100 text-teal-700'
                          }`}
                        >
                          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                        </span>
                        <span
                          className={`text-xs font-medium ${
                            task.status === 'completed'
                              ? 'text-teal-700'
                              : task.status === 'in-progress'
                                ? 'text-blue-700'
                                : 'text-amber-700'
                          }`}
                        >
                          {task.status === 'completed'
                            ? 'Completed'
                            : task.status === 'in-progress'
                              ? 'In Progress'
                              : 'Pending'}
                        </span>
                      </div>
                    </div>

                    {/* Due Time */}
                    <div className="flex-shrink-0 text-right">
                      <span className="text-xs text-zinc-600 font-medium">{task.dueTime}</span>
                    </div>

                    {/* Priority Border */}
                    <div
                      className={`flex-shrink-0 w-1 h-8 rounded-full ${
                        task.priority === 'high'
                          ? 'bg-red-500'
                          : task.priority === 'medium'
                            ? 'bg-yellow-500'
                            : 'bg-green-500'
                      }`}
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Orders Section */}
        <div>
          <div className=" rounded-lg  py-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ShoppingBag  className="text-zinc-700 w-6 h-6" />
                <h2 className="text-2xl font-semibold text-[#1a1a1a]">Orders</h2>
              </div>

              {/* Tab Switch */}
              <div className="flex items-center gap-3 bg-zinc-100 p-1 rounded-lg">
                <button
                  onClick={() => setOrderTab('due')}
                  className={`px-4 py-2 cursor-pointer rounded-sm font-medium text-sm duration-200 ease-in  transition-all ${
                    orderTab === 'due'
                      ? 'bg-zinc-800 text-white'
                      : 'text-zinc-600 hover:text-zinc-800'
                  }`}
                >
                  Due 
                </button>
                <button
                  onClick={() => setOrderTab('received')}
                  className={`px-4 cursor-pointer py-2 rounded-sm font-medium duration-200 ease-in text-sm transition-all ${
                    orderTab === 'received'
                      ? 'bg-zinc-800 text-white'
                      : 'text-zinc-600 hover:text-zinc-800'
                  }`}
                >
                  Received 
                </button>
              </div>
            </div>

            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {orderTab === 'due'
                ? ordersDueToday.length === 0
                  ? (
                    <div className="text-center py-8">
                      <p className="text-zinc-500">No orders due today</p>
                    </div>
                    )
                  : (
                    ordersDueToday.map((order, index) => (
                      <div
                        key={order.id}
                        className={`flex items-center gap-3 p-4 bg-secondary border border-zinc-200 rounded-lg hover:shadow-card ${
                          order.status === 'shipped'
                           
                        }`}
                      >
                        {/* Number Circle */}
                        <div className="flex-shrink-0 w-8 h-8 bg-zinc-800 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                          {index + 1}
                        </div>

                        {/* Order Details */}
                        <div className="flex-1">
                          <h3 className="text-sm font-semibold text-[#1a1a1a]">{order.orderNumber}</h3>
                          <p className="text-xs text-zinc-600">{order.client}</p>
                        </div>

                        {/* Status Badge */}
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getOrderStatusColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>

                        {/* Amount and Time */}
                        <div className="flex-shrink-0 text-right">
                          <p className="text-sm font-semibold text-zinc-800">${order.amount.toLocaleString()}</p>
                          <span className="text-xs text-zinc-600">{order.dueDate?.split(' ').slice(1).join(' ')}</span>
                        </div>
                      </div>
                    ))
                  )
                : ordersReceivedToday.length === 0
                  ? (
                    <div className="text-center py-8">
                      <p className="text-zinc-500">No orders received today</p>
                    </div>
                    )
                  : (
                    ordersReceivedToday.map((order, index) => (
                      <div
                        key={order.id}
                        className="flex items-center gap-3 p-4 bg-secondary border border-zinc-200 rounded-lg hover:shadow-card transition-all"
                      >
                        {/* Number Circle */}
                        <div className="flex-shrink-0 w-8 h-8 bg-zinc-800 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                          {index + 1}
                        </div>

                        {/* Order Details */}
                        <div className="flex-1">
                          <h3 className="text-sm font-semibold text-[#1a1a1a]">{order.orderNumber}</h3>
                          <p className="text-xs text-zinc-600">{order.client}</p>
                        </div>

                        {/* Status Badge */}
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getOrderStatusColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>

                        {/* Amount and Time */}
                        <div className="flex-shrink-0 text-right">
                          <p className="text-sm font-semibold text-zinc-800">${order.amount.toLocaleString()}</p>
                          <span className="text-xs text-zinc-600">{order.receivedDate?.split(' ').slice(1).join(' ')}</span>
                        </div>
                      </div>
                    ))
                  )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TodayPage
