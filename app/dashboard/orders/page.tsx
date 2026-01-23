'use client'

import { useState, useEffect } from 'react'
import { Plus, Filter, MoreVertical } from 'lucide-react'
import { OrderItem } from '@/lib/types'
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
import { getOrders, updateOrder } from '@/lib/services/order'

export default function OrdersPage() {
  const { openModal } = useModal()
  const [filterStatus, setFilterStatus] = useState<string>('All')
  const [orders, setOrders] = useState<OrderItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingOrder, setEditingOrder] = useState<OrderItem | null>(null)
  const [showEditModal, setShowEditModal] = useState(false)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true)
        const response = await getOrders()
        if (response.error) {
          setError(response.error.message || 'Failed to fetch orders')
        } else {
          setOrders(response.data || [])
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  const filteredOrders = filterStatus === 'All' 
    ? orders 
    : orders.filter(order => order.status === filterStatus)

  const handleEditOrder = (order: OrderItem) => {
    setEditingOrder(order)
    setShowEditModal(true)
  }

  const handleSaveEdit = async () => {
    if (editingOrder) {
      try {
        const response = await updateOrder(editingOrder.id, {
          status: editingOrder.status,
          amount_paid: editingOrder.amount_paid,
          due_date: editingOrder.due_date,
        })
        if (response.error) {
          setError(response.error.message || 'Failed to update order')
        } else {
          const updatedData = response.data || []
          setOrders(orders.map(o => o.id === editingOrder.id ? updatedData[0] : o))
          setShowEditModal(false)
          setEditingOrder(null)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      }
    }
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900">Orders</h1>
        <p className="text-zinc-500 text-sm sm:text-base mt-2">Manage and track all customer orders</p>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <button
          onClick={() => openModal('createOrder')}
          className="flex items-center justify-center sm:justify-start gap-2 cursor-pointer bg-zinc-900 text-white px-4 py-2 rounded-lg hover:bg-zinc-800 transition-colors font-medium text-sm"
        >
          <Plus size={20} />
          Create Order
        </button>
        <div className="flex items-center gap-2 bg-white border border-zinc-200 px-4 py-2 rounded-lg">
          <Filter size={20} className="text-zinc-600 flex-shrink-0" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-transparent border-none outline-none text-zinc-700 font-medium text-sm"
          >
            <option>All</option>
            <option>Completed</option>
            <option>Pending</option>
            <option>Cancelled</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-zinc-50 border-b border-zinc-200">
              <TableHead className="font-semibold text-zinc-700">Order ID</TableHead>
              <TableHead className="font-semibold text-zinc-700">Customer</TableHead>
              <TableHead className="font-semibold text-zinc-700">Client Number</TableHead>
              <TableHead className="font-semibold text-zinc-700">Amount</TableHead>
              <TableHead className="font-semibold text-zinc-700">Amount Paid</TableHead>
              <TableHead className="font-semibold text-zinc-700">Status</TableHead>
              <TableHead className="font-semibold text-zinc-700">Due Date</TableHead>
              <TableHead className="font-semibold text-zinc-700">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-zinc-500">
                  Loading orders...
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-red-500">
                  Error: {error}
                </TableCell>
              </TableRow>
            ) : filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-zinc-500">
                  No orders found
                </TableCell>
              </TableRow>
            ) : (
              filteredOrders.map((order) => (
                <TableRow key={order.id} className="border-b border-zinc-100 hover:bg-zinc-50">
                  <TableCell className="font-medium text-zinc-900">{order.id}</TableCell>
                  <TableCell className="text-zinc-700">{order.customer_name || 'N/A'}</TableCell>
                  <TableCell className="text-zinc-700 font-medium">{order.client_id || 'N/A'}</TableCell>
                  <TableCell className="text-zinc-900 font-semibold">${order.amount}</TableCell>
                  <TableCell className="text-zinc-700">${order.amount_paid || 0}</TableCell>
                  <TableCell>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-zinc-600">{order.due_date || 'N/A'}</TableCell>
                  <TableCell>
                    <button
                      onClick={() => handleEditOrder(order)}
                      className="inline-flex items-center justify-center w-8 h-8 rounded-lg cursor-pointer hover:bg-zinc-200 transition-colors text-zinc-600 hover:text-zinc-900"
                    >
                      <MoreVertical size={18} />
                    </button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit Order Modal */}
      {showEditModal && editingOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-semibold text-[#1a1a1a] mb-4">Edit Order</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#1a1a1a] mb-1">Amount Paid</label>
                <input
                  type="number"
                  value={editingOrder.amount_paid || 0}
                  onChange={(e) => setEditingOrder({ ...editingOrder, amount_paid: parseFloat(e.target.value) })}
                  className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1a1a1a] mb-1">Status</label>
                <select
                  value={editingOrder.status}
                  onChange={(e) => setEditingOrder({ ...editingOrder, status: e.target.value as any })}
                  className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-400"
                >
                  <option>Pending</option>
                  <option>Completed</option>
                  <option>Cancelled</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSaveEdit}
                  className="flex-1 cursor-pointer bg-zinc-900 text-white py-2 rounded-lg hover:bg-zinc-800 transition-colors font-medium"
                >
                  Save
                </button>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 cursor-pointer bg-zinc-200 text-zinc-800 py-2 rounded-lg hover:bg-zinc-300 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <CreateOrderModal />
    </div>
  )
}
