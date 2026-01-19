'use client'

import React, { useMemo } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import type { InventoryItem } from '@/lib/types'

interface InventoryData {
  name: string
  quantity: number
}

interface InventoryBarChartProps {
  inventoryData?: InventoryItem[]
}

const InventoryBarChart: React.FC<InventoryBarChartProps> = ({ inventoryData = [] }) => {
  // Process inventory data to get top 5 items
  const chartData = useMemo(() => {
    if (inventoryData.length === 0) {
      return [
        { name: 'Silk', quantity: 450 },
        { name: 'Cotton', quantity: 380 },
        { name: 'Lace', quantity: 290 },
        { name: 'Polyester', quantity: 220 },
        { name: 'Wool Blend', quantity: 160 },
      ]
    }

    // Sort by quantity and take top 5
    return inventoryData
      .map(item => ({
        name: item.inventory_name || 'Unknown',
        quantity: item.quantity || 0,
      }))
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5)
  }, [inventoryData])

  return (
    <div className="bg-[#e6e5de] rounded-lg min-w-150 shadow-bordered  max-w-150  p-6 border border-zinc-200">
      <h3 className="text-xl font-semibold text-[#1a1a1a] mb-4">Top 5 Inventory Items</h3>
      <ResponsiveContainer width="100%" height={300} >
        <BarChart
          data={chartData}
          layout="vertical"
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            type="number" 
            tick={{ fontSize: 12 }}
            stroke="#9ca3af"
          />
          <YAxis 
            dataKey="name" 
            type="category" 
            tick={{ fontSize: 12 }}
            stroke="#9ca3af"
            width={110}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
            formatter={(value) => [`${value} units`, 'Quantity']}
          />
          <Bar
            dataKey="quantity"
            fill="#6b7280"
            radius={[0, 8, 8, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default InventoryBarChart
