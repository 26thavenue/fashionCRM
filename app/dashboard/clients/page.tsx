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
import { Client } from '@/lib/types'

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
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(false)

  // TODO: Fetch clients from service when available
  // useEffect(() => {
  //   const fetchClients = async () => {
  //     try {
  //       setLoading(true)
  //       const response = await getClients()
  //       if (response.error) {
  //         // Handle error
  //       } else {
  //         setClients(response.data || [])
  //       }
  //     } finally {
  //       setLoading(false)
  //     }
  //   }
  //   fetchClients()
  // }, [])

  const filteredClients = filterStatus === 'All' 
    ? clients 
    : clients.filter(client => (client.email ? 'Active' : 'Inactive') === filterStatus)

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900">Clients</h1>
        <p className="text-zinc-500 mt-2">View and manage your client database</p>
      </div>

      {/* Action Bar */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => openModal('createClient')}
          className="flex items-center gap-2 cursor-pointer bg-zinc-900 text-white px-4 py-2 rounded-lg hover:bg-zinc-800 transition-colors font-medium"
        >
          <Plus size={20} />
          Create Client
        </button>
        <div className="flex items-center gap-2 bg-white border border-zinc-200 px-4 py-2 rounded-lg">
          <Filter size={20} className="text-zinc-600" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-transparent border-none outline-none text-zinc-700 font-medium"
          >
            <option>All</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-zinc-100 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-zinc-50 border-b border-zinc-200">
              <TableHead className="font-semibold text-zinc-700">ID</TableHead>
              <TableHead className="font-semibold text-zinc-700">Name</TableHead>
              <TableHead className="font-semibold text-zinc-700">Email</TableHead>
              <TableHead className="font-semibold text-zinc-700">Phone</TableHead>
              <TableHead className="font-semibold text-zinc-700">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-zinc-500">
                  Loading clients...
                </TableCell>
              </TableRow>
            ) : clients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-zinc-500">
                  No clients found
                </TableCell>
              </TableRow>
            ) : (
              filteredClients.map((client) => (
                <TableRow key={client.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <TableCell className="font-medium text-gray-900">{client.id}</TableCell>
                  <TableCell className="text-gray-700">{client.name}</TableCell>
                  <TableCell className="text-gray-600">{client.email || 'N/A'}</TableCell>
                  <TableCell className="text-gray-600">{client.phone_number || 'N/A'}</TableCell>
                  <TableCell>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(client.email ? 'Active' : 'Inactive')}`}>
                      {client.email ? 'Active' : 'Inactive'}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <CreateClientModal />
    </div>
  )
}
