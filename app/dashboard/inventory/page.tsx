'use client'

import { useState, useEffect } from 'react'
import { Plus, Filter } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table'
import { useModal } from '@/app/context/ModalContext'
import CreateInventoryModal from '@/app/components/modals/CreateInventoryModal'
import { InventoryItem } from '@/lib/types'
import { getInventory } from '@/lib/services/inventory'

const getStockColor = (quantity: number) => {
  if (quantity > 200) return 'text-green-700 font-semibold'
  if (quantity > 100) return 'text-yellow-700 font-semibold'
  return 'text-red-700 font-semibold'
}

export default function InventoryPage() {
  const { openModal } = useModal()
  const [filterCategory, setFilterCategory] = useState<string>('All')
  const [inventory, setInventory] = useState<InventoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        setLoading(true)
        const response = await getInventory()
        if (response.error) {
          setError(response.error.message || 'Failed to fetch inventory')
        } else {
          setInventory(response.data || [])
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchInventory()
  }, [])

  const filteredInventory = filterCategory === 'All' 
    ? inventory 
    : inventory.filter(item => item.apparel_type === filterCategory)

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900">Inventory</h1>
        <p className="text-zinc-500 mt-2">Manage your product inventory and stock levels</p>
      </div>

      {/* Action Bar */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => openModal('createInventory')}
          className="flex items-center gap-2 cursor-pointer bg-zinc-900 text-white px-4 py-2 rounded-lg hover:bg-zinc-800 transition-colors font-medium"
        >
          <Plus size={20} />
          Add Product
        </button>
        <div className="flex items-center gap-2 bg-white border border-zinc-200 px-4 py-2 rounded-lg">
          <Filter size={20} className="text-zinc-600" />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-transparent border-none outline-none text-zinc-700 font-medium"
          >
            <option>All</option>
            <option>Apparel</option>
            <option>Footwear</option>
            <option>Accessories</option>
            <option>Outerwear</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 border-b border-gray-200">
              <TableHead className="font-semibold text-gray-700">ID</TableHead>
              <TableHead className="font-semibold text-gray-700">Product Name</TableHead>
              <TableHead className="font-semibold text-gray-700">SKU</TableHead>
              <TableHead className="font-semibold text-gray-700">Quantity</TableHead>
              <TableHead className="font-semibold text-gray-700">Category</TableHead>
              <TableHead className="font-semibold text-gray-700">Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-zinc-500">
                  Loading inventory...
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-red-500">
                  Error: {error}
                </TableCell>
              </TableRow>
            ) : filteredInventory.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-zinc-500">
                  No inventory items found
                </TableCell>
              </TableRow>
            ) : (
              filteredInventory.map((item) => (
                <TableRow key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <TableCell className="font-medium text-gray-900">{item.id}</TableCell>
                  <TableCell className="text-gray-700">{item.inventory_name}</TableCell>
                  <TableCell className="text-gray-600">{item.sku}</TableCell>
                  <TableCell className={getStockColor(item.quantity)}>{item.quantity}</TableCell>
                  <TableCell className="text-gray-600">{item.apparel_type || 'N/A'}</TableCell>
                  <TableCell className="text-gray-900 font-semibold">${(item.unit_price || 0).toFixed(2)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <CreateInventoryModal />
    </div>
  )
}
