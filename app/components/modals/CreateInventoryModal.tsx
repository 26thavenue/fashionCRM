'use client'

import React, { useState } from 'react'
import Modal from '../Modal'
import { useModal } from '@/app/context/ModalContext'

const CreateInventoryModal = () => {
  const { isOpen, modalType, closeModal } = useModal()
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    quantity: '',
    category: '',
    price: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Creating inventory item:', formData)
    closeModal()
    setFormData({ name: '', sku: '', quantity: '', category: '', price: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <Modal
      isOpen={isOpen && modalType === 'createInventory'}
      onClose={closeModal}
      title="Add New Product"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
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
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-400"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-400"
            required
          >
            <option value="">Select category</option>
            <option>Apparel</option>
            <option>Footwear</option>
            <option>Accessories</option>
            <option>Outerwear</option>
          </select>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="flex-1 cursor-pointer bg-zinc-900 text-white py-2 rounded-lg hover:bg-zinc-800 transition-colors font-medium"
          >
            Add Product
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
