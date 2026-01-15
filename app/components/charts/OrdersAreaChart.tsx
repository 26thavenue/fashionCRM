'use client'

import React from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

interface OrderChartData {
  date: string
  orders: number
}

interface OrdersAreaChartProps {
  data?: OrderChartData[]
}

const defaultData: OrderChartData[] = [
  { date: 'Day 1', orders: 45 },
  { date: 'Day 2', orders: 52 },
  { date: 'Day 3', orders: 48 },
  { date: 'Day 4', orders: 61 },
  { date: 'Day 5', orders: 55 },
  { date: 'Day 6', orders: 67 },
  { date: 'Day 7', orders: 72 },
  { date: 'Day 8', orders: 68 },
  { date: 'Day 9', orders: 75 },
  { date: 'Day 10', orders: 82 },
  { date: 'Day 11', orders: 78 },
  { date: 'Day 12', orders: 85 },
  { date: 'Day 13', orders: 90 },
  { date: 'Day 14', orders: 88 },
  { date: 'Day 15', orders: 95 },
  { date: 'Day 16', orders: 92 },
  { date: 'Day 17', orders: 98 },
  { date: 'Day 18', orders: 105 },
  { date: 'Day 19', orders: 102 },
  { date: 'Day 20', orders: 110 },
  { date: 'Day 21', orders: 108 },
  { date: 'Day 22', orders: 115 },
  { date: 'Day 23', orders: 120 },
  { date: 'Day 24', orders: 118 },
  { date: 'Day 25', orders: 125 },
  { date: 'Day 26', orders: 130 },
  { date: 'Day 27', orders: 128 },
  { date: 'Day 28', orders: 135 },
  { date: 'Day 29', orders: 140 },
  { date: 'Day 30', orders: 145 },
]

const OrdersAreaChart: React.FC<OrdersAreaChartProps> = ({ data = defaultData }) => {
  return (
    <div className="bg-[#e6e5de] rounded-lg min-w-180 shadow-bordered p-8 border border-zinc-200">
      <h3 className="text-xl font-semibold text-[#1a1a1a] mb-4">Total Orders </h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} 
        className=' m-0'
        // margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
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
            interval={Math.floor(data.length / 6)}
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
            formatter={(value) => [`${value} orders`, 'Orders']}
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
