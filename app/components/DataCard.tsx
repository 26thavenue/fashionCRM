import React from 'react'
import { LucideIcon } from 'lucide-react'

interface DataCardProps {
  header: string
  value: string | number
  icon: LucideIcon
  description?: string
}

const DataCard: React.FC<DataCardProps> = ({ header, value, icon: Icon, description }) => {
  return (
    <div className="bg-white rounded-xl px-12 py-8 shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out border border-gray-100">
      {/* Header and Icon */}
    <div className="flex flex-row-reverse items-center gap-2 justify-end mb-4">
        <h3 className="text-gray-600 text-sm font-medium">{header}</h3>
        <Icon size={20} className="text-gray-700" />
        
      </div>

      {/* Value */}
      <div className="mb-2">
        <p className="text-3xl font-bold text-gray-900">{value}</p>
      </div>

      {/* Description */}
      {description && (
        <p className="text-xs text-gray-500">{description}</p>
      )}
    </div>
  )
}

export default DataCard
