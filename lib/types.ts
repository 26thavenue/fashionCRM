// ============================================
// LEGACY UI TYPES (Keep for UI Components)
// ============================================

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

export interface Task {
  id: number;
  type: 'deadline' | 'order';
  title: string;
  time: string;
}

export interface TaskMap {
  [key: string]: Task[];
}

export interface SelectedDate {
  day: number;
  month: number;
  year: number;
  dateKey: string;
  tasks: Task[];
}

// ============================================
// INVENTORY SERVICE TYPES
// ============================================

export interface InventoryItem {
  id: string;
  inventory_name: string;
  sku: string;
  quantity: number;
  unit_price?: number;
  apparel_type?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateInventoryInput {
  inventory_name: string;
  sku: string;
  quantity: number;
  unit_price?: number;
  apparel_type?: string;
}

export interface UpdateInventoryInput {
  quantity?: number;
  unit_price?: number;
  reorder_level?: number;
  inventory_name?: string;
  sku?: string;
  apparel_type?: string;
}

export interface InventoryResponse {
  data: InventoryItem[] | null;
  error: any;
}

export interface InventorySingleResponse {
  data: InventoryItem | null;
  error: any;
}

// ============================================
// ORDER SERVICE TYPES
// ============================================

export interface Client {
  id: string;
  name: string;
  phone_number: string;
  email?: string;
  created_at?: string;
}

export interface OrderItem {
  id: string;
  client_id: string;
  customer_number?: string;
  customer_name?: string;
  status: 'Completed' | 'Pending' | 'Cancelled';
  amount: number;
  amount_paid?: number;
  due_date?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateOrderInput {
  customer_number: string;
  customer_name: string;
  status?: 'Completed' | 'Pending' | 'Cancelled';
  amount: number;
  amount_paid?: number;
  due_date?: string;
  description?: string;
}

export interface UpdateOrderInput {
  status?: 'Completed' | 'Pending' | 'Cancelled';
  amount_paid?: number;
  due_date?: string;
  description?: string;
}

export interface OrderResponse {
  data: OrderItem[] | null;
  error: any;
}

export interface OrderSingleResponse {
  data: OrderItem | null;
  error: any;
}

// ============================================
// TASK SERVICE TYPES
// ============================================

export interface TaskItem {
  id: string;
  task_name: string;
  due_date: string;
  priority?: 'Low' | 'Medium' | 'High';
  description?: string;
  status?: 'Pending' | 'Completed' | 'In Progress';
  completed_at?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface CreateTaskInput {
  task_name: string;
  due_date: string;
  priority?: 'Low' | 'Medium' | 'High';
  description?: string;
}

export interface UpdateTaskInput {
  task_name?: string;
  status?: 'Pending' | 'Completed' | 'In Progress';
  priority?: 'Low' | 'Medium' | 'High';
  completed_at?: string | null;
  due_date?: string;
  description?: string;
}

export interface TaskResponse {
  data: TaskItem[] | null;
  error: any;
}

export interface TaskSingleResponse {
  data: TaskItem | null;
  error: any;
}

// ============================================
// CALENDAR SERVICE TYPES
// ============================================

export interface CalendarItem {
  id: string;
  title: string;
  due_date: string;
  type: 'task' | 'order';
  status?: string;
  priority?: string;
  created_at?: string;
}

export interface GetCalendarItemsByDateInput {
  date: string;
}

export interface GetCalendarItemsByMonthInput {
  year: number;
  month: number;
}

export interface CalendarResponse {
  data: CalendarItem[] | null;
  error: any;
}

export interface OrdersByMonthResponse {
  data: any[] | null;
  error: any;
}