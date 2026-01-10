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
import CreateClientModal from '@/app/components/modals/CreateClientModal'

interface Client {
  id: string
  name: string
  email: string
  phone: string
  status: 'Active' | 'Inactive'
  joinDate: string
}

const clientsData: Client[] = [
  {
    id: 'CLI-001',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 234 567 8900',
    status: 'Active',
    joinDate: '2023-06-15',
  },
  {
    id: 'CLI-002',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1 234 567 8901',
    status: 'Active',
    joinDate: '2023-08-20',
  },
  {
    id: 'CLI-003',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    phone: '+1 234 567 8902',
    status: 'Active',
    joinDate: '2023-10-12',
  },
  {
    id: 'CLI-004',
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    phone: '+1 234 567 8903',
    status: 'Inactive',
    joinDate: '2023-04-05',
  },
  {
    id: 'CLI-005',
    name: 'David Brown',
    email: 'david@example.com',
    phone: '+1 234 567 8904',
    status: 'Active',
    joinDate: '2023-11-22',
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Active':
      return 'bg-green-100 text-green-800'
    case 'Inactive':
      return 'bg-gray-100 text-gray-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export default function ClientsPage() {
  const { openModal } = useModal()
  const [filterStatus, setFilterStatus] = useState<string>('All')

  const filteredClients = filterStatus === 'All' 
    ? clientsData 
    : clientsData.filter(client => client.status === filterStatus)

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
        <p className="text-gray-500 mt-2">View and manage your client database</p>
      </div>

      {/* Action Bar */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => openModal('createClient')}
          className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors font-medium"
        >
          <Plus size={20} />
          Create Client
        </button>
        <div className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg">
          <Filter size={20} className="text-gray-600" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-transparent border-none outline-none text-gray-700 font-medium"
          >
            <option>All</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 border-b border-gray-200">
              <TableHead className="font-semibold text-gray-700">ID</TableHead>
              <TableHead className="font-semibold text-gray-700">Name</TableHead>
              <TableHead className="font-semibold text-gray-700">Email</TableHead>
              <TableHead className="font-semibold text-gray-700">Phone</TableHead>
              <TableHead className="font-semibold text-gray-700">Status</TableHead>
              <TableHead className="font-semibold text-gray-700">Join Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClients.map((client) => (
              <TableRow key={client.id} className="border-b border-gray-100 hover:bg-gray-50">
                <TableCell className="font-medium text-gray-900">{client.id}</TableCell>
                <TableCell className="text-gray-700">{client.name}</TableCell>
                <TableCell className="text-gray-600">{client.email}</TableCell>
                <TableCell className="text-gray-600">{client.phone}</TableCell>
                <TableCell>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(client.status)}`}>
                    {client.status}
                  </span>
                </TableCell>
                <TableCell className="text-gray-600">{client.joinDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <CreateClientModal />
    </div>
  )
}
