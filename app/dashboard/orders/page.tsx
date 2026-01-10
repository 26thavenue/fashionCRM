'use client'

import { useState } from 'react'
import { Plus, Filter } from 'lucide-react'
import { Order } from '@/lib/types'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table'
import { getStatusColor } from '@/lib/utils'
import { useModal } from '@/app/context/ModalContext'
import CreateOrderModal from '@/app/components/modals/CreateOrderModal'



const ordersData: Order[] = [
  {
    id: 'ORD-001',
    customer: 'John Doe',
    amount: 1200,
    status: 'Completed',
    date: '2024-01-10',
  },
  {
    id: 'ORD-002',
    customer: 'Jane Smith',
    amount: 850,
    status: 'Pending',
    date: '2024-01-09',
  },
  {
    id: 'ORD-003',
    customer: 'Mike Johnson',
    amount: 2100,
    status: 'Completed',
    date: '2024-01-08',
  },
  {
    id: 'ORD-004',
    customer: 'Sarah Williams',
    amount: 650,
    status: 'Cancelled',
    date: '2024-01-07',
  },
  {
    id: 'ORD-005',
    customer: 'David Brown',
    amount: 1800,
    status: 'Completed',
    date: '2024-01-06',
  },
]


export default function OrdersPage() {
  const { openModal } = useModal()
  const [filterStatus, setFilterStatus] = useState<string>('All')

  const filteredOrders = filterStatus === 'All' 
    ? ordersData 
    : ordersData.filter(order => order.status === filterStatus)

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
        <p className="text-gray-500 mt-2">Manage and track all customer orders</p>
      </div>

      {/* Action Bar */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => openModal('createOrder')}
          className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors font-medium"
        >
          <Plus size={20} />
          Create Order
        </button>
        <div className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg">
          <Filter size={20} className="text-gray-600" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-transparent border-none outline-none text-gray-700 font-medium"
          >
            <option>All</option>
            <option>Completed</option>
            <option>Pending</option>
            <option>Cancelled</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 border-b border-gray-200">
              <TableHead className="font-semibold text-gray-700">Order ID</TableHead>
              <TableHead className="font-semibold text-gray-700">Customer</TableHead>
              <TableHead className="font-semibold text-gray-700">Email Address</TableHead>
              <TableHead className="font-semibold text-gray-700">Amount</TableHead>
              <TableHead className="font-semibold text-gray-700">Status</TableHead>
              <TableHead className="font-semibold text-gray-700">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                <TableCell className="font-medium text-gray-900">{order.id}</TableCell>
                <TableCell className="text-gray-700">{order.customer}</TableCell>
                <TableCell className="text-gray-700">{order.emailAddress || 'order@null.com'}</TableCell>
                <TableCell className="text-gray-900 font-semibold">${order.amount}</TableCell>
                <TableCell>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </TableCell>
                <TableCell className="text-gray-600">{order.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <CreateOrderModal />
    </div>
  )
}
