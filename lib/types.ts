export interface Order {
  id: string
  customerNumber?: string
  customer: string
  emailAddress?:string
  amount: number
  amountPaid?: number
  status: 'Completed' | 'Pending' | 'Cancelled'
  date: string
  dueDate?: string
}


