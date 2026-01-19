'use client'

import React, { useState } from 'react'
import Modal from '../Modal'
import { useModal } from '@/app/context/ModalContext'
import { createInventory } from '@/lib/services/inventory'
import { CreateInventoryInput } from '@/lib/types'

const CreateInventoryModal = () => {
  const { isOpen, modalType, closeModal } = useModal()
  const [formData, setFormData] = useState<CreateInventoryInput>({
    inventory_name: '',
    sku: '',
    quantity: 0,
    unit_price: undefined,
    apparel_type: undefined,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      setLoading(true)
      const response = await createInventory(formData)
      if (response.error) {
        setError(response.error.message || 'Failed to create inventory item')
      } else {
        closeModal()
        setFormData({ inventory_name: '', sku: '', quantity: 0, unit_price: undefined, apparel_type: undefined })
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'quantity' || name === 'unit_price' ? (value ? parseFloat(value) : (name === 'quantity' ? 0 : undefined)) : value,
    }))
  }

  return (
    <Modal
      isOpen={isOpen && modalType === 'createInventory'}
      onClose={closeModal}
      title="Add New Product"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1">Product Name</label>
          <input
            type="text"
            name="inventory_name"
            value={formData.inventory_name}
            onChange={handleChange}
            placeholder="Enter product name"
            className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1">SKU</label>
          <input
            type="text"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            placeholder="Enter SKU"
            className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-400"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="0"
              className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">Price ($)</label>
            <input
              type="number"
              name="unit_price"
              value={formData.unit_price || ''}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-400"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1">Category</label>
          <select
            name="apparel_type"
            value={formData.apparel_type || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-400"
          >
            <option value="">Select category</option>
            <option value="Apparel">Apparel</option>
            <option value="Footwear">Footwear</option>
            <option value="Accessories">Accessories</option>
            <option value="Outerwear">Outerwear</option>
          </select>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 cursor-pointer bg-zinc-900 text-white py-2 rounded-lg hover:bg-zinc-800 transition-colors font-medium disabled:opacity-50"
          >
            {loading ? 'Adding...' : 'Add Product'}
          </button>
          <button
            type="button"
            onClick={closeModal}
            className="flex-1 cursor-pointer bg-zinc-200 text-zinc-800 py-2 rounded-lg hover:bg-zinc-300 transition-colors font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default CreateInventoryModal
