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
    <div className=" flex flex-col  justify-between rounded-lg min-w-[180px] min-h-[150px] tracking-tight   p-3 font-geist-mono shadow-border  ">
      {/* Header and Icon */}
    <div className="flex flex-col items-start gap-1 justify-start ">
        <h3 className=" text-[10px] text-[#2F2F2F] font-medium uppercase">{header}</h3>
        {/* <Icon size={20} className="" /> */}

        <div className="">
          <p className="text-2xl font-bold text-[#1a1a1a]">{value}</p>
        </div>
      </div>

      {/* Value */}
      

      {/* Description */}
      {description && (
        <p className="text-[11px] text-[#2F2F2F]">{description}</p>
      )}
    </div>
  )
}

export default DataCard
