'use client'

import React, { useState } from 'react'
import Modal from '../Modal'
import { useModal } from '@/app/context/ModalContext'

const CreateOrderModal = () => {
  const { isOpen, modalType, closeModal } = useModal()
  const [formData, setFormData] = useState({
    customer: '',
    amount: '',
    status: 'Pending',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Creating order:', formData)
    closeModal()
    setFormData({ customer: '', amount: '', status: 'Pending' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <Modal isOpen={isOpen && modalType === 'createOrder'} onClose={closeModal} title="Create New Order">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
          <input
            type="text"
            name="customer"
            value={formData.customer}
            onChange={handleChange}
            placeholder="Enter customer name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Amount ($)</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter amount"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            <option>Pending</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="flex-1 bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            Create Order
          </button>
          <button
            type="button"
            onClick={closeModal}
            className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default CreateOrderModal
