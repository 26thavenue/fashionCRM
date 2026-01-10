'use client'

import React, { useState } from 'react'
import Modal from '../Modal'
import { useModal } from '@/app/context/ModalContext'

const CreateClientModal = () => {
  const { isOpen, modalType, closeModal } = useModal()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    status: 'Active',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Creating client:', formData)
    closeModal()
    setFormData({ name: '', email: '', phone: '', status: 'Active' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <Modal isOpen={isOpen && modalType === 'createClient'} onClose={closeModal} title="Create New Client">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter client name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
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
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="flex-1 bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            Create Client
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

export default CreateClientModal
