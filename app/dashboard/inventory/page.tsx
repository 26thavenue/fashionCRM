'use client'

import { useState } from 'react'
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

interface InventoryItem {
  id: string
  name: string
  sku: string
  quantity: number
  category: string
  price: number
}

const inventoryData: InventoryItem[] = [
  {
    id: 'INV-001',
    name: 'Classic T-Shirt',
    sku: 'TS-001',
    quantity: 245,
    category: 'Apparel',
    price: 29.99,
  },
  {
    id: 'INV-002',
    name: 'Denim Jeans',
    sku: 'DJ-002',
    quantity: 156,
    category: 'Apparel',
    price: 79.99,
  },
  {
    id: 'INV-003',
    name: 'Summer Dress',
    sku: 'SD-003',
    quantity: 89,
    category: 'Apparel',
    price: 49.99,
  },
  {
    id: 'INV-004',
    name: 'Winter Coat',
    sku: 'WC-004',
    quantity: 45,
    category: 'Outerwear',
    price: 149.99,
  },
  {
    id: 'INV-005',
    name: 'Casual Sneakers',
    sku: 'SN-005',
    quantity: 203,
    category: 'Footwear',
    price: 89.99,
  },
]

const getStockColor = (quantity: number) => {
  if (quantity > 200) return 'text-green-700 font-semibold'
  if (quantity > 100) return 'text-yellow-700 font-semibold'
  return 'text-red-700 font-semibold'
}

export default function InventoryPage() {
  const { openModal } = useModal()
  const [filterCategory, setFilterCategory] = useState<string>('All')

  const filteredInventory = filterCategory === 'All' 
    ? inventoryData 
    : inventoryData.filter(item => item.category === filterCategory)

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Inventory</h1>
        <p className="text-gray-500 mt-2">Manage your product inventory and stock levels</p>
      </div>

      {/* Action Bar */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => openModal('createInventory')}
          className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors font-medium"
        >
          <Plus size={20} />
          Add Product
        </button>
        <div className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg">
          <Filter size={20} className="text-gray-600" />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-transparent border-none outline-none text-gray-700 font-medium"
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
            {filteredInventory.map((item) => (
              <TableRow key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                <TableCell className="font-medium text-gray-900">{item.id}</TableCell>
                <TableCell className="text-gray-700">{item.name}</TableCell>
                <TableCell className="text-gray-600">{item.sku}</TableCell>
                <TableCell className={getStockColor(item.quantity)}>{item.quantity}</TableCell>
                <TableCell className="text-gray-600">{item.category}</TableCell>
                <TableCell className="text-gray-900 font-semibold">${item.price.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <CreateInventoryModal />
    </div>
  )
}
