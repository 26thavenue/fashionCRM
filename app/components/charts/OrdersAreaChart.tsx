'use client'

import React, { useMemo } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import type { OrderItem } from '@/lib/types'

interface OrderChartData {
  date: string
  orders: number
  amount: number
}

interface OrdersAreaChartProps {
  orders?: OrderItem[]
}

const OrdersAreaChart: React.FC<OrdersAreaChartProps> = ({ orders = [] }) => {
  // Process orders data to group by date
  const chartData = useMemo(() => {
    if (orders.length === 0) {
      return Array.from({ length: 30 }, (_, i) => ({
        date: `Day ${i + 1}`,
        orders: Math.floor(Math.random() * 50 + 40),
        amount: Math.floor(Math.random() * 5000 + 2000),
      }))
    }

    // Group orders by date
    const ordersByDate: Record<string, { count: number; amount: number }> = {}

    orders.forEach(order => {
      if (order.due_date) {
        const dateKey = new Date(order.due_date).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        })
        if (!ordersByDate[dateKey]) {
          ordersByDate[dateKey] = { count: 0, amount: 0 }
        }
        ordersByDate[dateKey].count += 1
        ordersByDate[dateKey].amount += order.amount || 0
      }
    })

    // Convert to array and sort by date
    return Object.entries(ordersByDate)
      .map(([date, data]) => ({
        date,
        orders: data.count,
        amount: data.amount,
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(-30) // Last 30 days
  }, [orders])

  return (
    <div className="bg-[#e6e5de] rounded-lg min-w-180 shadow-bordered p-8 border border-zinc-200">
      <h3 className="text-xl font-semibold text-[#1a1a1a] mb-4">Orders Trend</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={chartData} 
        className=' m-0'
        >
          <defs>
            <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6b7280" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#6b7280" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12 }}
            stroke="#9ca3af"
            interval={Math.floor(chartData.length / 6)}
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            stroke="#9ca3af"
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
            formatter={(value, name) => {
              if (name === 'orders') return [`${value} orders`, 'Orders']
              return [`$${value?.toLocaleString()}`, 'Amount']
            }}
          />
          <Area
            type="monotone"
            dataKey="orders"
            stroke="#6b7280"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorOrders)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default OrdersAreaChart
