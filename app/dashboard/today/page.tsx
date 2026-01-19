'use client'

import React, { useState, useEffect } from 'react'
import { CheckCircle2, Clock, ShoppingBag, AlertCircle, TrendingUp } from 'lucide-react'
import DataCard from '@/app/components/DataCard'
import { getTasks } from '@/lib/services/task'
import { getOrders } from '@/lib/services/order'
import { getTodayDate } from '@/lib/utils'
import type { TaskItem, OrderItem } from '@/lib/types'

const TodayPage: React.FC = () => {
  const [orderTab, setOrderTab] = useState<'due' | 'received'>('due')
  const [tasks, setTasks] = useState<TaskItem[]>([])
  const [orders, setOrders] = useState<OrderItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const todayDate = getTodayDate()

        // Fetch all tasks and orders
        const [tasksResponse, ordersResponse] = await Promise.all([
          getTasks(),
          getOrders(),
        ])

        if (tasksResponse.error) throw tasksResponse.error
        if (ordersResponse.error) throw ordersResponse.error

        // Filter tasks for today
        const todayTasks = (tasksResponse.data || []).filter(task => {
          if (!task.due_date) return false
          const taskDate = new Date(task.due_date).toISOString().split('T')[0]
          return taskDate === todayDate
        })

        // Filter orders for today (by due_date and received date)
        const todayOrders = (ordersResponse.data || []).filter(order => {
          if (!order.due_date) return false
          const orderDate = new Date(order.due_date).toISOString().split('T')[0]
          return orderDate === todayDate
        })

        setTasks(todayTasks)
        setOrders(todayOrders)
        setError(null)
      } catch (err: any) {
        setError(err.message || 'Failed to fetch data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const getTaskStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
      case 'completed':
        return <CheckCircle2 size={16} className="text-green-600" />
      case 'In Progress':
      case 'in-progress':
        return <Clock size={16} className="text-blue-600" />
      default:
        return <AlertCircle size={16} className="text-yellow-600" />
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

  const completedTasks = tasks.filter((t) => t.status === 'Completed').length
  const totalAmount = orders.reduce((sum, o) => sum + (o.amount || 0), 0)

  if (loading) {
    return (
      <div className="p-6 bg-secondary min-h-screen flex items-center justify-center">
        <p className="text-zinc-500">Loading today's overview...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 bg-secondary min-h-screen">
        <div className="text-center">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 bg-secondary min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-800 mb-2">Today's Overview</h1>
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
          value={tasks.length}
          icon={CheckCircle2}
          description={`${completedTasks} completed`}
        />
        <DataCard
          header="Orders Today"
          value={orders.length}
          icon={ShoppingBag}
          description={`Total: $${totalAmount.toLocaleString()}`}
        />
        <DataCard
          header="Pending"
          value={tasks.filter(t => t.status === 'Pending').length}
          icon={AlertCircle}
          description="Tasks waiting"
        />
        <DataCard
          header="In Progress"
          value={tasks.filter(t => t.status === 'In Progress').length}
          icon={TrendingUp}
          description="Tasks ongoing"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid w-full gap-6">
        {/* Tasks Section */}
        <div>
          <div className="bg-white rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className='w-6 h-6 text-zinc-700'/>
              <h2 className="text-2xl font-semibold text-zinc-900">Tasks</h2>
            </div>

            <div className="space-y-2">
              {tasks.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-zinc-500">No tasks scheduled for today</p>
                </div>
              ) : (
                tasks.map((task, index) => (
                  <div
                    key={task.id}
                    className="flex items-center gap-3 p-4 bg-zinc-50 border border-zinc-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-zinc-800 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                      {index + 1}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {getTaskStatusIcon(task.status || "default")}
                        <h3 className="text-sm font-medium text-zinc-900">{task.task_name}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded ${
                            task.priority === 'High'
                              ? 'bg-red-100 text-red-700'
                              : task.priority === 'Medium'
                                ? 'bg-yellow-100 text-amber-700'
                                : 'bg-green-100 text-teal-700'
                          }`}
                        >
                          {task.priority || 'Medium'}
                        </span>
                        <span
                          className={`text-xs font-medium ${
                            task.status === 'Completed'
                              ? 'text-teal-700'
                              : task.status === 'In Progress'
                                ? 'text-blue-700'
                                : 'text-amber-700'
                          }`}
                        >
                          {task.status}
                        </span>
                      </div>
                    </div>

                    <div className="flex-shrink-0 text-right">
                      <span className="text-xs text-zinc-600 font-medium">
                        {new Date(task.due_date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    <div
                      className={`flex-shrink-0 w-1 h-8 rounded-full ${
                        task.priority === 'High'
                          ? 'bg-red-500'
                          : task.priority === 'Medium'
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
          <div className="bg-white rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ShoppingBag  className="text-zinc-700 w-6 h-6" />
                <h2 className="text-2xl font-semibold text-zinc-900">Orders</h2>
              </div>
            </div>

            <div className="space-y-2">
              {orders.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-zinc-500">No orders for today</p>
                </div>
              ) : (
                orders.map((order, index) => (
                  <div
                    key={order.id}
                    className="flex items-center gap-3 p-4 bg-zinc-50 border border-zinc-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-zinc-800 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                      {index + 1}
                    </div>

                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-zinc-900">{order.id}</h3>
                      <p className="text-xs text-zinc-600">{order.customer_name}</p>
                    </div>

                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getOrderStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>

                    <div className="flex-shrink-0 text-right">
                      <p className="text-sm font-semibold text-zinc-800">${order.amount.toLocaleString()}</p>
                      <span className="text-xs text-zinc-600">
                        {new Date(order?.due_date ? order.due_date : ""  ).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
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