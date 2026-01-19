'use client'

import React, { useState } from 'react'
import Modal from '../Modal'
import { useModal } from '@/app/context/ModalContext'
import { Upload, X } from 'lucide-react'
import { createOrder } from '@/lib/services/order'
import { CreateOrderInput } from '@/lib/types'

const CreateOrderModal = () => {
  const { isOpen, modalType, closeModal } = useModal()
  const [formData, setFormData] = useState<CreateOrderInput>({
    customer_number: '',
    customer_name: '',
    status: 'Pending',
    amount: 0,
    amount_paid: undefined,
    due_date: undefined,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fileInputKey, setFileInputKey] = useState(0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      setLoading(true)
      const response = await createOrder(formData)
      if (response.error) {
        setError(response.error.message || 'Failed to create order')
      } else {
        closeModal()
        setFormData({ customer_number: '', customer_name: '', status: 'Pending', amount: 0, amount_paid: undefined, due_date: undefined })
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
      [name]: name === 'amount' || name === 'amount_paid' ? (value ? parseFloat(value) : (name === 'amount' ? 0 : undefined)) : value,
    }))
  }

  return (
    <Modal isOpen={isOpen && modalType === 'createOrder'} onClose={closeModal} title="Create New Order">
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Customer Number & Name - Flexed */}
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block text-md text-[#1a1a1a] mb-1">Customer Number</label>
            <input
              type="text"
              name="customer_number"
              value={formData.customer_number}
              onChange={handleChange}
              placeholder="e.g., 0803344.."
              className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-zinc-400"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block text-md text-[#1a1a1a] mb-1">Customer Name</label>
            <input
              type="text"
              name="customer_name"
              value={formData.customer_name}
              onChange={handleChange}
              placeholder="Enter customer name"
              className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-400"
              required
            />
          </div>
        </div>

        {/* Amount Paid & Total Amount - Flexed */}
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block text-md text-[#1a1a1a] mb-1">Amount Paid</label>
            <input
              type="number"
              name="amount_paid"
              value={formData.amount_paid || ''}
              onChange={handleChange}
              placeholder="Enter amount paid"
              className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-400"
            />
          </div>
          <div className="flex-1">
            <label className="block text-md text-[#1a1a1a] mb-1">Total Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter total amount"
              className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-400"
              required
            />
          </div>
        </div>

        {/* Due Date */}
        <div>
          <label className="block text-md text-[#1a1a1a] mb-1">Due Date</label>
          <input
            type="date"
            name="due_date"
            value={formData.due_date || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-400"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-md text-[#1a1a1a] mb-1">Status</label>
          <select
            name="status"
            value={formData.status || 'Pending'}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-400"
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 cursor-pointer bg-primary text-white py-2.5 rounded-lg hover:bg-zinc-800 transition-colors font-medium disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Order'}
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default CreateOrderModal
