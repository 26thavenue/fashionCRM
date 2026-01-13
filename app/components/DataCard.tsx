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
    <div className=" flex flex-col justify-between rounded-lg min-w-[180px] min-h-[150px]  p-3 font-mono bg-[#0d1327]  max-w-[250px] transition-shadow duration-300 ease-in-out ">
      {/* Header and Icon */}
    <div className="flex flex-col items-start gap-1 justify-start ">
        <h3 className=" text-[10px] text-[#E6EDF3] font-medium uppercase">{header}</h3>
        {/* <Icon size={20} className="" /> */}

        <div className="">
          <p className="text-2xl font-bold text-[#e6e5de]">{value}</p>
        </div>
      </div>

      {/* Value */}
      

      {/* Description */}
      {description && (
        <p className="text-[11px] text-[#999999]">{description}</p>
      )}
    </div>
  )
}

export default DataCard
