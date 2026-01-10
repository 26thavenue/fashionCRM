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
import CreateTaskModal from '@/app/components/modals/CreateTaskModal'

interface Task {
  id: string
  title: string
  assignee: string
  priority: 'High' | 'Medium' | 'Low'
  status: 'Completed' | 'In Progress' | 'Pending'
  dueDate: string
}

const tasksData: Task[] = [
  {
    id: 'TSK-001',
    title: 'Design new product collection',
    assignee: 'Emily Davis',
    priority: 'High',
    status: 'In Progress',
    dueDate: '2024-01-15',
  },
  {
    id: 'TSK-002',
    title: 'Update inventory system',
    assignee: 'John Doe',
    priority: 'Medium',
    status: 'Completed',
    dueDate: '2024-01-10',
  },
  {
    id: 'TSK-003',
    title: 'Process customer refunds',
    assignee: 'Sarah Williams',
    priority: 'High',
    status: 'In Progress',
    dueDate: '2024-01-12',
  },
  {
    id: 'TSK-004',
    title: 'Review marketing campaign',
    assignee: 'Mike Johnson',
    priority: 'Medium',
    status: 'Pending',
    dueDate: '2024-01-18',
  },
  {
    id: 'TSK-005',
    title: 'Send monthly report',
    assignee: 'Jane Smith',
    priority: 'Low',
    status: 'Pending',
    dueDate: '2024-01-20',
  },
]

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'High':
      return 'bg-red-100 text-red-800'
    case 'Medium':
      return 'bg-yellow-100 text-yellow-800'
    case 'Low':
      return 'bg-green-100 text-green-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Completed':
      return 'bg-green-100 text-green-800'
    case 'In Progress':
      return 'bg-blue-100 text-blue-800'
    case 'Pending':
      return 'bg-gray-100 text-gray-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export default function TasksPage() {
  const { openModal } = useModal()
  const [filterStatus, setFilterStatus] = useState<string>('All')

  const filteredTasks = filterStatus === 'All' 
    ? tasksData 
    : tasksData.filter(task => task.status === filterStatus)

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
        <p className="text-gray-500 mt-2">Track and manage all team tasks</p>
      </div>

      {/* Action Bar */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => openModal('createTask')}
          className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors font-medium"
        >
          <Plus size={20} />
          Create Task
        </button>
        <div className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg">
          <Filter size={20} className="text-gray-600" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-transparent border-none outline-none text-gray-700 font-medium"
          >
            <option>All</option>
            <option>Completed</option>
            <option>In Progress</option>
            <option>Pending</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 border-b border-gray-200">
              <TableHead className="font-semibold text-gray-700">Task ID</TableHead>
              <TableHead className="font-semibold text-gray-700">Title</TableHead>
              <TableHead className="font-semibold text-gray-700">Assignee</TableHead>
              <TableHead className="font-semibold text-gray-700">Priority</TableHead>
              <TableHead className="font-semibold text-gray-700">Status</TableHead>
              <TableHead className="font-semibold text-gray-700">Due Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTasks.map((task) => (
              <TableRow key={task.id} className="border-b border-gray-100 hover:bg-gray-50">
                <TableCell className="font-medium text-gray-900">{task.id}</TableCell>
                <TableCell className="text-gray-700">{task.title}</TableCell>
                <TableCell className="text-gray-600">{task.assignee}</TableCell>
                <TableCell>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                </TableCell>
                <TableCell>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(task.status)}`}>
                    {task.status}
                  </span>
                </TableCell>
                <TableCell className="text-gray-600">{task.dueDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <CreateTaskModal />
    </div>
  )
}
