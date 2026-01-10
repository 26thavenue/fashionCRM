export interface Order {
  id: string
  customer: string
  emailAddress?:string
  amount: number
  status: 'Completed' | 'Pending' | 'Cancelled'
  date: string
}


