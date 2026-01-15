'use client'

import React, { useState } from 'react'
import Modal from '../Modal'
import { useModal } from '@/app/context/ModalContext'
import { Upload, X } from 'lucide-react'

const CreateOrderModal = () => {
  const { isOpen, modalType, closeModal } = useModal()
  const [formData, setFormData] = useState({
    customerNumber: '',
    customerName: '',
    amountPaid: '',
    totalAmount: '',
    dueDate: '',
    dressInspo: [] as string[],
  })

  const [fileInputKey, setFileInputKey] = useState(0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Creating order:', formData)
    closeModal()
    setFormData({
      customerNumber: '',
      customerName: '',
      amountPaid: '',
      totalAmount: '',
      dueDate: '',
      dressInspo: [],
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && formData.dressInspo.length < 5) {
      Array.from(files).forEach((file) => {
        if (formData.dressInspo.length < 5) {
          const reader = new FileReader()
          reader.onload = (event) => {
            const result = event.target?.result as string
            setFormData((prev) => ({
              ...prev,
              dressInspo: [...prev.dressInspo, result],
            }))
          }
          reader.readAsDataURL(file)
        }
      })
    }
    setFileInputKey((prev) => prev + 1)
  }

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      dressInspo: prev.dressInspo.filter((_, i) => i !== index),
    }))
  }

  return (
    <Modal isOpen={isOpen && modalType === 'createOrder'} onClose={closeModal} title="Create New Order">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Customer Number & Name - Flexed */}
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block text-md text-[#1a1a1a] mb-1">Customer Number</label>
            <input
              type="text"
              name="customerNumber"
              value={formData.customerNumber}
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
              name="customerName"
              value={formData.customerName}
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
              name="amountPaid"
              value={formData.amountPaid}
              onChange={handleChange}
              placeholder="Enter amount paid"
              className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-400"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block text-md text-[#1a1a1a] mb-1">Total Amount</label>
            <input
              type="number"
              name="totalAmount"
              value={formData.totalAmount}
              onChange={handleChange}
              placeholder="Enter total amount"
              className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-400"
              required
            />
          </div>
        </div>

        {/* Dress Inspo - Image Upload */}
        <div>
          <label className="block text-md text-[#1a1a1a] mb-2">Dress Inspo (Pick up to 5 pictures)</label>
          <div className="mb-3">
            <label className="flex items-center justify-center gap-2 px-3 py-2 border-2 border-dashed border-zinc-300 rounded-lg cursor-pointer hover:border-zinc-400 transition-colors">
              <Upload size={18} className="text-zinc-600" />
              <span className="text-sm text-zinc-600">Click to upload images</span>
              <input
                key={fileInputKey}
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                disabled={formData.dressInspo.length >= 5}
                className="hidden"
              />
            </label>
            <p className="text-xs text-zinc-500 mt-1">
              {formData.dressInspo.length}/5 images selected
            </p>
          </div>

          {/* Image Preview Grid */}
          {formData.dressInspo.length > 0 && (
            <div className="grid grid-cols-5 gap-2">
              {formData.dressInspo.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image}
                    alt={`Dress inspo ${index + 1}`}
                    className="w-full h-20 object-cover rounded-lg border border-zinc-200"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-500 cursor-pointer text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Due Date */}
        <div>
          <label className="block text-md text-[#1a1a1a] mb-1">Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-400"
            required
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="flex-1 cursor-pointer bg-primary text-white py-2.5 rounded-lg hover:bg-zinc-800 transition-colors font-medium"
          >
            Create Order
          </button>
          {/* <button
            type="button"
            onClick={closeModal}
            className="flex-1 cursor-pointer bg-zinc-200 text-zinc-800 py-2 rounded-lg hover:bg-zinc-300 transition-colors font-medium"
          >
            Cancel
          </button> */}
        </div>
      </form>
    </Modal>
  )
}

export default CreateOrderModal
