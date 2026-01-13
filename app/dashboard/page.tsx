import DataCard from '@/app/components/DataCard'
import OrdersAreaChart from '@/app/components/charts/OrdersAreaChart'
import InventoryBarChart from '@/app/components/charts/InventoryBarChart'
import { ShoppingCart, Users, Package, TrendingUp,CheckSquare } from 'lucide-react'

const page = () => {
  return (
    <div className=" p-6 font-sans"> 
      <h1 className="text-3xl font-semibold text-[#1a1a1a] mb-3"> Dashboard </h1>
      <h2 className="text-gray-500 text-base mb-8">View Insights into how your 30 day period has turned out</h2>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <DataCard 
          header="Total Orders"
          value="1,234"
          icon={ShoppingCart}
          description="Last 30 days"
        />
        <DataCard 
          header="Total Clients"
          value="856"
          icon={Users}
          description="Last 30 days"
        />
        <DataCard 
          header="Inventory"
          value="3,420"
          icon={Package}
          description="Last 30 days"
        />

        <DataCard 
          header="Tasks"
          value="3"
          icon={CheckSquare}
          description="Last 30 days"
        />
      </div>

      {/* Charts Grid */}
      <div className="flex flex-col gap-6 my-16">
        <OrdersAreaChart />
        <InventoryBarChart />
      </div>
    </div>
  )
}

export default page
