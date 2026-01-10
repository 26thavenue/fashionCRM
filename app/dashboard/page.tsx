import DataCard from '@/app/components/DataCard'
import { ShoppingCart, Users, Package, TrendingUp,CheckSquare } from 'lucide-react'

const page = () => {
  return (
    <div className=" py-16 px-6"> 
      <h1 className="text-3xl font-semibold text-gray-700 mb-8">Welcome Temitayo 😊 </h1>
      {/* <h2 className="text-gray-500 text-lg mb-8">Insights into</h2> */}

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <DataCard 
          header="Total Orders"
          value="1,234"
          icon={ShoppingCart}
          description="↑ 12% from last month"
        />
        <DataCard 
          header="Total Clients"
          value="856"
          icon={Users}
          description="↑ 8% from last month"
        />
        <DataCard 
          header="Inventory"
          value="3,420"
          icon={Package}
          description="↓ 3% from last month"
        />
        <DataCard 
          header="Revenue"
          value="$45,231"
          icon={TrendingUp}
          description="↑ 24% from last month"
        />

        <DataCard 
          header="Tasks"
          value="3"
          icon={CheckSquare}
          description="↓ 3% from last month"
        />
      </div>
    </div>
  )
}

export default page
