'use client'

import { useEffect, useState } from 'react'
import DataCard from '@/app/components/DataCard'
import OrdersAreaChart from '@/app/components/charts/OrdersAreaChart'
import { ShoppingCart, Users, Package, TrendingUp, CheckSquare } from 'lucide-react'
import ClientOverviewPageCard from '../components/cards/ClientOverviewPageCard'
import { getTasks } from '@/lib/services/task'
import { getOrders } from '@/lib/services/order'
import { getInventory } from '@/lib/services/inventory'
import type { TaskItem, OrderItem, InventoryItem } from '@/lib/types'

const DashboardPage = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([])
  const [orders, setOrders] = useState<OrderItem[]>([])
  const [inventory, setInventory] = useState<InventoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        // Fetch all data in parallel
        const [tasksResponse, ordersResponse, inventoryResponse] = await Promise.all([
          getTasks(),
          getOrders(),
          getInventory(),
        ])

        if (tasksResponse.error) throw tasksResponse.error
        if (ordersResponse.error) throw ordersResponse.error
        if (inventoryResponse.error) throw inventoryResponse.error

        setTasks(tasksResponse.data || [])
        setOrders(ordersResponse.data || [])
        setInventory(inventoryResponse.data || [])
        setError(null)
      } catch (err: any) {
        setError(err.message || 'Failed to fetch dashboard data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-zinc-500">Loading dashboard...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <p className="text-red-500">Error: {error}</p>
      </div>
    )
  }

  // Calculate stats
  const totalOrders = orders.length
  const totalClients = new Set(orders.map(o => o.client_id)).size
  const totalInventoryItems = inventory.reduce((sum, item) => sum + (item.quantity || 0), 0)
  const totalTasks = tasks.length
  const completedTasks = tasks.filter(t => t.status === 'Completed').length
  const pendingTasks = tasks.filter(t => t.status === 'Pending').length
  const totalOrderValue = orders.reduce((sum, o) => sum + (o.amount || 0), 0)

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold text-zinc-900 mb-3 tracking-tight">Dashboard</h1>
      <h2 className="text-zinc-600 text-base mb-8">View insights into your business metrics</h2>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DataCard 
          header="Total Orders"
          value={totalOrders.toLocaleString()}
          icon={ShoppingCart}
          description={`$${totalOrderValue.toLocaleString()} value`}
        />
        <DataCard 
          header="Total Clients"
          value={totalClients.toLocaleString()}
          icon={Users}
          description={`From ${totalOrders} orders`}
        />
        <DataCard 
          header="Inventory Items"
          value={totalInventoryItems.toLocaleString()}
          icon={Package}
          description={`${inventory.length} SKUs`}
        />

        <DataCard 
          header="Tasks"
          value={completedTasks}
          icon={CheckSquare}
          description={`${completedTasks} completed, ${pendingTasks} pending`}
        />
      </div>

      {/* Charts Grid */}
      <div className="flex flex-col gap-6 my-8">
        <div className='flex gap-8'>
           <OrdersAreaChart orders={orders}/>
           <ClientOverviewPageCard clients={orders}/>
        </div>

        {/* <div className='flex gap-8'>
          <InventoryBarChart inventoryData={inventory}/>

           <DeadlineOverview />
        </div> */}
      </div>
    </div>
  )
}

export default DashboardPage
