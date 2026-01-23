'use client'

import React from 'react'
import { X } from 'lucide-react'
import { useModal } from '@/app/context/ModalContext'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-[#000000b3] z-50 flex items-center justify-center p-4">
      <div className="bg-zinc-50 rounded-2xl p-6 sm:p-8 lg:p-12 shadow-card max-w-xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-zinc-200">
          <h2 className="text-xl sm:text-2xl text-[#1a1a1a] tracking-tight pr-4">{title}</h2>
          
          <button
            onClick={onClose}
            className="p-2 cursor-pointer flex items-center justify-center bg-zinc-100 rounded-full shadow-border w-8 h-8 flex-shrink-0"
          >
            <X className="w-5 h-5 text-zinc-700"/>
          </button>
        </div>

        {/* Content */}
        <div className="py-4 sm:py-6">{children}</div>
      </div>
    </div>
  )
}

export default Modal
