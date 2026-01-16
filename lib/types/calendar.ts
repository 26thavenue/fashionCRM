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
