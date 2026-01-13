'use client'

import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

interface InventoryData {
  name: string
  quantity: number
}

interface InventoryBarChartProps {
  data?: InventoryData[]
}

const defaultData: InventoryData[] = [
  { name: 'Silk', quantity: 450 },
  { name: 'Cotton', quantity: 380 },
  { name: 'Lace', quantity: 290 },
  { name: 'Polyester', quantity: 220 },
  { name: 'Wool Blend', quantity: 160 },
]

const InventoryBarChart: React.FC<InventoryBarChartProps> = ({ data = defaultData }) => {
  return (
    <div className="bg-white rounded-lg shadow-bordered  max-w-[800px]  p-6 border border-gray-200">
      <h3 className="text-xl font-semibold text-[#1a1a1a] mb-4">Top 5 Inventory Items</h3>
      <ResponsiveContainer width="100%" height={300} >
        <BarChart
          data={data}
          layout="vertical"
        //   margin={{ top: 5, right: 10, left: 120, bottom: 5 }}
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
